	var drawPlanets = function() {

		$scope.ctx.beginPath();
    $scope.ctx.arc(40, 80, 30, 0, 2 * Math.PI, false);
    $scope.ctx.lineWidth = 2;
    $scope.ctx.strokeStyle = 'rgb(237, 237, 102)';
    $scope.ctx.stroke();
    $scope.ctx.closePath();
		};