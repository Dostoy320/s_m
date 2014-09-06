
var smApp = angular.module('smApp', []);

smApp.directive("gamescreen", function() {

	return {
		restrict: "A",
		link: function($scope, element){

			var canvas = element[0];
			var ctx = element[0].getContext('2d');
			var rect = canvas.getBoundingClientRect();
			var img = new Image();
			img.src = 'static/img/tiny_rocket.png';

			$scope.canvas = canvas;
			$scope.ctx = ctx;
			$scope.frames = 0;

			var screenWidth = canvas.width;
			var screenHeight = canvas.height;

			// Initialize ship at center of screen:
			$scope.ship = {
				'width': 30,
				'height': 10,
				'posX': screenWidth / 2,
				'posY': screenHeight / 2
			};

			var shipTarget = {
				x: screenWidth / 2,
				y: screenHeight / 2
			};

			var mousePos = {};

			// Cursor-click animation:
			$scope.click = {
				targetX: 0,
				targetY: 0,
				targetRadius: 0
			};
			$scope.clickSignalTarget = function() {
				ctx.beginPath();
	      ctx.arc($scope.click.targetX - 8, $scope.click.targetY - 8, $scope.click.targetRadius, 0, 2 * Math.PI, false);
	      ctx.lineWidth = 2;
	      ctx.strokeStyle = 'rgb(237, 237, 102)';
	      ctx.stroke();
	      ctx.closePath();
			}

			// Draw persistent objects (space and ship):
			function drawGame() {
			ctx.clearRect(0,0,screenWidth,screenHeight);
			//ctx.drawImage(img, $scope.ship.posX, $scope.ship.posY);
			ctx.fillStyle = "rgb(213,209,255)";
			//ctx.fillRect($scope.ship.posX, $scope.ship.posY, $scope.ship.width, $scope.ship.height);
			ctx.fillText("MouseX=" + mousePos.x + " MouseY=" + mousePos.y, 2, 20);
			ctx.drawImage(img, $scope.ship.posX, $scope.ship.posY)
			}

			// Move ship to target:
			function moveShip() {
				if($scope.ship.posX < shipTarget.x) {
					$scope.ship.posX += 3;
				}
				if($scope.ship.posX > shipTarget.x) {
					$scope.ship.posX -= 3;
				}
				if($scope.ship.posY < shipTarget.y) {
					$scope.ship.posY += 3;
				}
				if($scope.ship.posY > shipTarget.y) {
					$scope.ship.posY -= 3;
				}

				if($scope.ship.posX + $scope.ship.width >= screenWidth) {
					$scope.ship.posX -= 3;
				}
				if($scope.ship.posX <= 0) {
					$scope.ship.posX += 3;
				}
			}

			function setTarget(target) {
				shipTarget.x = target.clientX - rect.left - 23;
				shipTarget.y = target.clientY - rect.top - 15;
			}

			function getMousePosition(canvas, evnt) {
				return {
					x: evnt.clientX - rect.left,
					y: evnt.clientY - rect.top
				};
			}

			canvas.addEventListener('mousemove', function(evnt) {
				mousePos = getMousePosition(canvas, evnt);
			}, false);

			canvas.addEventListener('mousedown', function(evnt) {
				// Initial click indicator:
				$scope.click = {
					targetX: evnt.clientX - rect.left,
					targetY: evnt.clientY - rect.top,
					targetRadius: 3
				};

				// Set target for ship travel:
				setTarget(evnt);

				// Click indicator animation:
				setTimeout(function() {
					$scope.click.targetRadius = 6;
					setTimeout(function() {
						$scope.click.targetRadius = 12;
						setTimeout(function() {
							$scope.click.targetRadius = 6;
							setTimeout(function() {
								$scope.click.targetRadius = 3;
								setTimeout(function() {
									$scope.click.targetRadius = 0;
								}, 50);
							}, 50);
						}, 50);
					}, 50);
				}, 50);

			});

			var planets = $scope.planetBuilder.makePlanets(10);

			console.log(planets);

			setInterval(function() {
				ctx.fillStyle = 'black';
				moveShip();
				drawGame();

				_.forEach(planets, function(planet) {
					$scope.planetBuilder.drawPlanets(planet);
				});

				$scope.planetBuilder.drawPlanets();

				$scope.clickSignalTarget();

				$scope.$apply($scope.posX = $scope.ship.posX);
				$scope.$apply($scope.posY = $scope.ship.posY);
				$scope.frames += 1;
			}, 20);


		}
	}
});

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
	

smApp.directive("gamescreen", function() {

	return {
		link: function($scope) {

			$scope.planetBuilder = {
				makePlanets: function(num) {

					function isUnique(planet, planets) {
						_.forEach(planets, function(option) {
							console.log(option);
							if(option.x >= planet.x - 42
								|| option.x <= planet.x + 42
								|| option.y >= planet.y - 42
								|| option.y <= planet.y +42) {
								return false;
								break;
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
						}	while (isUnique(planet, planets) === false);

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

