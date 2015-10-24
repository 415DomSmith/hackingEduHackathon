var app = angular.module("fistOfFive", ["ngRoute",'ng-token-auth', "ngResource", 'chart.js', 'ui.tinymce', 'ui.bootstrap', 'ngDragDrop', 'ngAnimate', 'firebase']);

// Config of Google Oauth
app.config(["$authProvider", function($authProvider) {
    $authProvider.configure({
      authProviderPaths: {
      google_oauth2: '/auth/google_oauth2'
      },
      omniauthWindowType:'newWindow',
    });
  }]);


// Wrong route redirect
app.config(["$httpProvider", function($httpProvider) {
	$httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');

    $httpProvider.interceptors.push(["$q", "$location", function($q, $location) {
      return {
       'responseError': function(rejection) {
             // do something on error
             if (rejection.status == 401) {
               $location.path("/")
             }
             return $q.reject(rejection);
           }
      };
    }]);

}]);

// Angular Routes
app.config(["$routeProvider", function ($routeProvider){
	$routeProvider
	//Home
	.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'HomeController'
	})
	//Login
	.when('/login/', {
		templateUrl: 'partials/login.html',
		controller: 'LoginController'
	})


	//Additional Info
	.when('/users/:id/additional_info', {
		templateUrl: 'partials/additionalInfo.html',
		controller: 'AdditionalInfoController'
	})


	.when('/users/:id/courses', {
		templateUrl: 'partials/coursesIndex.html',
		controller: 'CoursesIndexController'
	})
	
		
	.when('/survey', {
		templateUrl: 'partials/survey.html',
		controller: 'SurveyController'
	})

	.otherwise({ redirectTo: '/'});
}]);






