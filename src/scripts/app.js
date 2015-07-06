var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(['$routeProvider', function($routeProvider) {

	$routeProvider.
		when('/profile', {
			templateUrl : 'src/templates/profiles.html'
		}).
		when('/messages', {
			templateUrl : 'src/templates/messages.html'
		}).
		when('/home', {
			templateUrl : 'src/templates/home.html'
		}).
		otherwise({ redirectTo: '/home' })
}])

mainApp.controller('MainCtrl', ['$scope', function($scope) {

}]);
