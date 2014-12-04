'use strict';

/**
 * @ngdoc overview
 * @name hoqiiApp
 * @description
 * # hoqiiApp
 *
 * Main module of the application.
 */
angular
  .module('hoqiiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:id', {
        templateUrl: 'views/router.html',
        controller: 'routerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name hoqiiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hoqiiApp
 */
angular.module('hoqiiApp')
  .controller('MainCtrl', ["$scope", "$animate", "$window", function ($scope, $animate, $window) {
    $animate.enabled(false);
    $scope.slide = {
    	'interval': 5000,
    	'slides': [
    		{
    			'image': 'images/bg1.jpg',
    			'text': 'title',
    			'title': 'MIP[ed]',
    			'description': 'MIP[ed] adalah platform yang terintegrasi untuk membuat aplikasi.',
    			'faClass': 'icon-iconmonstr-brick',
                'link': '#mip-ed'
    		},
    		{
    			'image': 'images/bg2.jpg',
    			'text': 'title',
    			'title': 'MIP[ion]',
    			'description': 'MIP[ion] adalah platform integrasi terpadu yang dapat mengintegrasikan sistem apapun dari / ke sistem apapun.',
    			'faClass': 'icon-iconmonstr-sitemap',
                'link': '#mip-ion'
    		},
    		{
    			'image': 'images/bg3.jpg',
    			'text': 'title',
    			'title': 'MIP[iot]',
    			'description': 'Android Platform, Stand Alone, Cloud Based.',
    			'faClass': 'icon-iconmonstr-tablet',
                'link': '#mip-iot'
    		},
            {
                'image': 'images/bg4.jpg',
                'text': 'title',
                'title': 'MIP[db]',
                'description': 'Big Data Platform, Hadoop Based Platform, Graph Based Platform(Neo4j).',
                'faClass': 'icon-iconmonstr-cloud',
                'link': '#mip-db'
            },
            {
                'image': 'images/bg5.jpg',
                'text': 'title',
                'title': 'MIP[id]',
                'description': 'Layanan terpadu yang terdiri dari DISC, Resume Builder dan OAuth2.',
                'faClass': 'icon-iconmonstr-idcard',
                'link': '#mip-id'
            }
    	]
    };

    $scope.slides = $scope.slide.slides;

    $scope.slide.labelStyle = {
    	'padding-top': $window.innerHeight/3
    };

    $scope.slide.getStyle = function(index) {
    	return {
    		'height': $window.innerHeight,
    		'background-image': 'url(' + $scope.slide.slides[index].image + ')',
    		'background-position': '50%',
            'background-size': 'cover'
    	};
    };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name hoqiiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the hoqiiApp
 */
angular.module('hoqiiApp')
  .controller('AboutCtrl', ["$scope", function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name hoqiiApp.directive:dynamicTopNav
 * @description
 * # dynamicTopNav
 */
angular.module('hoqiiApp')
  .directive('dynamicTopNav', ["$window", "$location", function ($window, $location) {
    return {
      link: function postLink(scope) {
        var wd = angular.element($window);

        wd.bind('scroll', function() {
          if ($location.path() === '/' || $location.path() === 'index.html') {
            var distanceY = wd.scrollTop(), shrinkOn = $window.innerHeight;
            scope.logoTransparent = distanceY <= shrinkOn - 100;
          } else {
            scope.logoTransparent = false;
          }
          
          scope.$apply();
        });
      }
    };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name hoqiiApp.controller:TopnavCtrl
 * @description
 * # TopnavCtrl
 * Controller of the hoqiiApp
 */
angular.module('hoqiiApp').controller('topNavCtrl', ["$scope", "topNavService", "$location", function ($scope, topNavService, $location) {
	$scope.logoTransparent = true;

	$scope.$on('$routeChangeStart', function() {
		$scope.isNotIndex = $location.path() !== '/' && $location.path() !== 'index.html';

		if ($scope.isNotIndex) {
			$scope.logoTransparent = false;
		} else {
			$scope.logoTransparent = true;
		}
	});

	topNavService.getMenus().success(function(data) {
		$scope.menus = data;
	});
}]);

'use strict';

/**
 * @ngdoc service
 * @name hoqiiApp.topNavService
 * @description
 * # topNavService
 * Factory in the hoqiiApp.
 */
angular.module('hoqiiApp')
  .factory('topNavService', ["$http", function ($http) {
    // Public API here
    return {
      getMenus: function () {
        return $http.get('scripts/contents/topnav.json');
      }
    };
  }]);

'use strict';

/**
 * @ngdoc service
 * @name hoqiiApp.footerService
 * @description
 * # footerService
 * Factory in the hoqiiApp.
 */
angular.module('hoqiiApp')
  .factory('footerService', ["$http", function ($http) {
    // Service logic
    return {
      getMenus: function () {
        return $http.get('scripts/contents/footer.json');
      }
    };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name hoqiiApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the hoqiiApp
 */
angular.module('hoqiiApp')
  .controller('footerCtrl', ["$scope", "footerService", function ($scope, footerService) {
    footerService.getMenus().success(function(data) {
    	$scope.menus = data;
    });
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name hoqiiApp.directive:scrollTo
 * @description
 * # scrollTo
 */
angular.module('hoqiiApp').directive('scrollTo', function () {
	return {
		restrict: 'A',
		link: function(scope, elm, attrs) {
			angular.element(elm).bind('click', function() {
				angular.element('body,html').animate({scrollTop: angular.element(attrs.scrollTo).offset().top - 65}, 'slow');
				console.log(angular.element(attrs.scrollTo).offset().top);
			});
		}
	};
});

'use strict';

/**
 * @ngdoc function
 * @name hoqiiApp.controller:RouterCtrl
 * @description
 * # RouterCtrl
 * Controller of the hoqiiApp
 */
angular.module('hoqiiApp')
  .controller('routerCtrl', ["$scope", "$routeParams", function ($scope, $routeParams) {
    $scope.templateUrl = 'views/'+ $routeParams.id + '.html';
  }]);
