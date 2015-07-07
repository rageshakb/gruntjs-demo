function print() {
	console.log("Print invoked !!!");
}
var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(['$routeProvider', function($routeProvider) {

	$routeProvider.
		when('/profile', {
			templateUrl : 'templates/profiles.html'
		}).
		when('/messages', {
			templateUrl : 'templates/messages.html'
		}).
		when('/home', {
			templateUrl : 'templates/home.html'
		}).
		otherwise({ redirectTo: '/home' })
}])

mainApp.controller('MainCtrl', ['$scope', function($scope) {

}]);
