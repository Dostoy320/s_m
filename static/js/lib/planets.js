	

smApp.directive("gamescreen", function() {

	return {
		link: function($scope) {

			$scope.makePlanets = function() {
				
				// Establish x-axis grid slots:
				var xCoords = [];

				// Set a 10pix buffer from left edge of screen
				var coord = 10;

				while(coord < $scope.screenWidth - 10) { // 10pix buffer on right edge of screen
					var x1 = coord + 1;
					coord += 75;
					var x2 = coord;
					xCoords.push([x1, x2]);
				}

				// For each x-axis grid slot, set random X coordinate if setCoord is true
				var planetXCoords = [];

				_.forEach(xCoords, function(coordinate) {
					var setCoord = Math.random() < 0.5 ? true: false;
					if(setCoord == true) {
						var xCoord = Math.random() * (coordinate[1] - coordinate[0]) + coordinate[0];
						planetXCoords.push(Math.round(xCoord));
					}
				});

				// Finalize coordinate array by randomly filling Y-axis coordinates
				var planetCoords = [];

				_.forEach(planetXCoords, function(xCoord) {

					var yCoord = Math.random() * (($scope.screenHeight - 10) - 10) + 10;

					planetCoords.push([xCoord, Math.round(yCoord)]);

				});

				return planetCoords;

			}

			$scope.drawPlanets = function(planets) {

				_.forEach(planets, function(planet) {
					$scope.ctx.beginPath();
			    $scope.ctx.arc(planet[0], planet[1], 20, 0, 2 * Math.PI, false);
			    $scope.ctx.lineWidth = 2;
			    $scope.ctx.strokeStyle = 'rgb(237, 237, 102)';
			    $scope.ctx.stroke();
			    $scope.ctx.closePath();
				})
				
			};


		} // end link:
	}
});
