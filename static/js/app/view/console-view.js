
var smApp = angular.module('smApp', []);

smApp.controller('consoleView', function($scope) {

	$scope.clickTest = function() {
			$scope.ctx.rect(20,20,150,100);
			$scope.ctx.stroke(); 
		}
	
});