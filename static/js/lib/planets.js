	

smApp.directive("gamescreen", function() {

	return {
		link: function($scope) {

			$scope.makePlanets = function() {
				
				// Establish x-axis grid slots:
				var xCoords = [];

				// Set a 10px buffer from left edge of screen
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
					var setCoord = Math.random() < 0.3 ? true: false;
					if(setCoord == true) {
						var xCoord = Math.random() * (coordinate[1] - coordinate[0]) + coordinate[0];
						planetXCoords.push(Math.round(xCoord));
					}
				});

				// Finalize coordinate array by randomly filling Y-axis coordinates
				var planets = [];

				var planetNumber = 0;

				_.forEach(planetXCoords, function(xCoord) {

					planetNumber += 1;

					var yCoord = Math.random() * (($scope.screenHeight - 10) - 10) + 10;

					var planetRadius = Math.random() * (50 - 15) + 15;

					var planetName = "planet" + planetNumber;

					var red = Math.round(Math.random() * (255 - 0) + 0);
					var green = Math.round(Math.random() * (255 - 0) + 0);
					var blue = Math.round(Math.random() * (255 - 0) + 0);


					var planet = {
						'name': planetName,
						'xCoord': xCoord,
						'yCoord': Math.round(yCoord),
						'radius': Math.round(planetRadius),
						'color': 'rgb(' + red + ',' + green + ',' + blue + ')'
					}

					planets.push(planet);

				});

				console.log(planets);

				return planets;

			}

			$scope.drawPlanets = function(planets) {

				_.forEach(planets, function(planet) {
					$scope.ctx.beginPath();
			    $scope.ctx.arc(planet['xCoord'], planet['yCoord'], planet['radius'], 0, 2 * Math.PI, false);
			    $scope.ctx.lineWidth = 2;
			    $scope.ctx.strokeStyle = 'rgb(237, 237, 102)';
			    $scope.ctx.fillStyle = planet['color'];
			    $scope.ctx.stroke();
			   	$scope.ctx.fill();
			    $scope.ctx.closePath();
				})
				
			};


		} // end link:
	}
});
