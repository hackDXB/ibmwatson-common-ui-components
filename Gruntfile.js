'use strict';
/* jshint node:true */
module.exports = function(grunt) {

  // Load
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  var foundModules = {};

  /**
   * Build a descriptor for a module with the given name, and
   * add it to the config modules array
   * @param String name - the name of the module to find
   */
  function findModule(name) {
    // If the module already exists, bail
    if (foundModules[name]) {
      return;
    }
    foundModules[name] = true;

    function breakup(text, separator) {
      return text.replace(/[A-Z]/g, function(match) {
        return separator + match;
      });
    }

    function ucwords(text) {
      return text.replace(/^([a-z])|\s+([a-z])/g, function($1) {
        return $1.toUpperCase();
      });
    }

    function enquote(str) {
      return '"' + str + '"';
    }

    function stripSrc(str) {
      return str.substring(4);
    }

    var module = {
      name: name,
      moduleName: enquote('<%= pkg.name %>.' + name),
      displayName: ucwords(breakup(name, ' ')),
      srcFiles: grunt.file.expand(['src/' + name + '/*.js', '!src/' + name + '/*.html.js', '!src/' + name + '/*.spec.js']),
      templateFiles: grunt.file.expand('src/' + name + '/*.html'),
      templateJsFiles: grunt.file.expand('src/' + name + '/*.html.js'),
      templateModules: grunt.file.expand('src/' + name + '/*.html').map(stripSrc).map(enquote)
    };

    grunt.config('modules', grunt.config('modules').concat(module));
  }

  function removeUseStrict(src, filepath) {
    return '// Source: ' + filepath + '\n' +
      src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    modules: [], //to be filled in by build task
    dist: 'dist', // The folder to build to,
    declarations: {
      modules: 'angular.module("<%= pkg.name %>", [<%= srcModules %>]);',
      templates: 'angular.module("<%= pkg.name %>.templates", [<%= templateModules %>]);',
      all: 'angular.module("<%= pkg.name %>", ["<%= pkg.name %>.templates", <%= srcModules %>]);'
    },

    // Get rid of the previous build
    clean: {
      dist: ['<%=dist %>',
        'src/**/*.html.js']
    },

    bower: {
      install: {
        options: {
          copy: false,
          verbose: true
        }
      }
    },

    // Compile Javascript into modules
    html2js: {
      dist: {
        options: {
          module: null, // Do not declare a parent module
          base: 'src',
          quoteChar: '\''
        },
        files: [{
          expand: true,
          src: ['src/**/*.html'],
          ext: '.html.js'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      dist: {
        src: ['src/**/*.js',
          '!src/**/*.html.js'
        ]
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    concat: {
      options:{
        process: removeUseStrict
      },
      dist: {
        options: {
          banner: '\'use strict\';\n<%= declarations.all %>\n<%= declarations.templates %>\n'
        },
        src: [], //src filled in by build task
        dest: '<%= dist %>/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        
      },
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: '<%= dist %>/<%= pkg.name %>.min.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          hostname: '*',
          livereload:true,
          base:['.','app']
        }
      }
    },
    watch: {
      options: {
        livereload:true
      },
      app: {
        files: ['app/**/*.html', 'app/**/*.js']
      },
      src: {
        files: ['src/**/*.html', 'src/**/*.js'],
        tasks: ['build']
      }
    }
  });

  grunt.registerTask('build', function() {
    var _ = grunt.util._;

    // Get a list of all the custom components available, and load it into 'modules'
    grunt.file.expand({
      filter: 'isDirectory',
      cwd: '.'
    }, 'src/*').forEach(function(dir) {
      findModule(dir.split('/')[1]);
    });

    var modules = grunt.config('modules');
    grunt.config('srcModules', _.pluck(modules, 'moduleName'));
    grunt.config('templateModules', _.pluck(modules, 'templateModules').filter(function(templates) {
      return templates.length > 0;
    }));

    var srcFiles = _.pluck(modules, 'srcFiles');
    var templateJsFiles = _.pluck(modules, 'templateJsFiles');
    //Set the concat task to concatenate the given src modules
    // grunt.config('concat.dist_modules.src', grunt.config('concat.dist_modules.src')
    //   .concat(srcFiles));
    //Set the concat-with-templates task to concat the given src & tpl modules
    grunt.config('concat.dist.src', grunt.config('concat.dist.src')
      .concat(srcFiles).concat(templateJsFiles));

    grunt.task.run(['concat', 'uglify']);
  });


  // Default task(s).
  grunt.registerTask('default', ['clean', 'bower', 'html2js', 'jshint','karma', 'build']);
  grunt.registerTask('serve', ['clean', 'bower', 'html2js', 'jshint','karma', 'build','connect', 'watch']);
};
