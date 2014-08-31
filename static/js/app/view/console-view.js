
var smApp = angular.module('smApp', []);

smApp.controller('consoleView', function($scope) {

	$scope.clickTest = function() {
			$scope.ship.width = 60;
			$scope.ship.height = 20;
		}
	
});