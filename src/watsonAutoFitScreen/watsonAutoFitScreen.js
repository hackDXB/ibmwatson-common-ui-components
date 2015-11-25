'use strict';

/*
This directive will automatically configure the screen sizes such that the entire
body fits to the height of the screen. The 'content' height will be calculated as
the height of the screen minus the height of the header and footer.

There is also an optional 'min-height' attribute for the watson-afs-content
directive that overrides the minHeight of 480px

Example Use:
    <body watson-afs-body>
        <div watson-afs-header></div>
        <div watson-afs-content></div>
        <div watson-afs-footer></div>
    <body>
*/

angular.module('ibmwatson-common-ui-components.watsonAutoFitScreen', [])
  .directive('watsonAfsBody', function() {
    return {
      restrict: 'A',
      controller: function() {
        var heights = {
          header: 0,
          footer: 0
        };
        // components = ( 'header' || 'footer' )
        this.setHeight = function(component, height) {
          heights[component] = height;
        };
        this.getHeight = function(component) {
          return heights[component];
        };
      }
    };
  })
  .directive('watsonAfsHeader', function() {
    function link(scope, element, attrs, watsonAfsBody) {
      watsonAfsBody.setHeight('header', element.outerHeight());
    }
    return {
      restrict: 'A',
      require: '^watsonAfsBody',
      link: link
    };
  })
  .directive('watsonAfsContent', ['$window',
    function($window) {
      function link(scope, element, attrs, watsonAfsBody) {
        element[0].style.overflowY = 'scroll';

        var headerHeight = watsonAfsBody.getHeight('header');
        var footerHeight = watsonAfsBody.getHeight('footer');
        var windowHeight = $window.innerHeight;

        // setting a minimum screen height. do we really need this?
        var minHeight = (Number(attrs.minHeight) || 200) - (headerHeight + footerHeight);

        function sizeBody() {
          var h = windowHeight - (headerHeight + footerHeight);
          h = (h < minHeight ? minHeight : h);
          var hStr = h + 'px';
          element[0].style.height = hStr;
          element[0].style.maxHeight = hStr;
          // let interested parties know that resize has occurred
          scope.$broadcast('contentResized', h);
        }
        sizeBody();
        angular.element($window).bind('resize', function() {
          windowHeight = $window.innerHeight;
          sizeBody();
        });
      }
      return {
        restrict: 'A',
        require: '^watsonAfsBody',
        link: link
      };
    }
  ])
  .directive('watsonAfsFooter', function() {
    function link(scope, element, attrs, watsonAfsBody) {
      watsonAfsBody.setHeight('footer', element.outerHeight());
    }
    return {
      restrict: 'A',
      require: '^watsonAfsBody',
      link: link
    };
  });