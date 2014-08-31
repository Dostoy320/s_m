
var smApp = angular.module('smApp', []);

smApp.controller('consoleView', function($scope) {

	$scope.clickGrow = function() {
			$scope.ship.width = 60;
			$scope.ship.height = 20;
		};

	$scope.clickShrink = function() {
			$scope.ship.width = 30;
			$scope.ship.height = 10;
		};
	
});