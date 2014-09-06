	

smApp.directive("gamescreen", function() {

	return {
		link: function($scope) {

			$scope.planetBuilder = {
				makePlanets: function(num) {

					function isNotUnique(planet, planets) {
						_.forEach(planets, function(option) {
							console.log(option);
							if(option.x >= planet.x - 42
								|| option.x <= planet.x + 42
								|| option.y >= planet.y - 42
								|| option.y <= planet.y +42) {
								return false;
							} else {
								return true;
							}
						});
						return true;
					}


					var planets = [];
					for(var i=0;i<num;i++) {
						do {
							planet = {};
							planet.x = Math.round(Math.random() * (($scope.canvas.width - 42) - 42) + 42);
							planet.y = Math.round(Math.random() * (($scope.canvas.height -42) - 42) + 42);
							planet.d = Math.round(Math.random() * (40 - 10) + 10);
						}	while (isNotUnique(planet, planets) === false);

						planets.push(planet);
					}
					return planets;
				},
				drawPlanets: function(planet) {
					$scope.ctx.beginPath();
			    $scope.ctx.arc(planet.x, planet.y, planet.d, 0, 2 * Math.PI, false);
			    $scope.ctx.lineWidth = 2;
			    $scope.ctx.strokeStyle = 'rgb(237, 237, 102)';
			    $scope.ctx.stroke();
			    $scope.ctx.closePath();
				},
				touchPlanet: function() {
					console.log('something');
				}

			}
		}
	}
});

