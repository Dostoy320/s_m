
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

			screenWidth = canvas.width;
			screenHeight = canvas.height;

			$scope.screenWidth = screenWidth;
			$scope.screenHeight = screenHeight;

			// Initialize ship at center of screen:
			$scope.ship = {
				'width': 30,
				'height': 10,
				'posX': screenWidth / 2,
				'posY': screenHeight / 2,
				'speed': 4
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
					$scope.ship.posX += $scope.ship.speed;
				}
				if($scope.ship.posX > shipTarget.x) {
					$scope.ship.posX -= $scope.ship.speed;
				}
				if($scope.ship.posY < shipTarget.y) {
					$scope.ship.posY += $scope.ship.speed;
				}
				if($scope.ship.posY > shipTarget.y) {
					$scope.ship.posY -= $scope.ship.speed;
				}

				if($scope.ship.posX + $scope.ship.width >= screenWidth) {
					$scope.ship.posX -= $scope.ship.speed;
				}
				if($scope.ship.posX <= 0) {
					$scope.ship.posX += $scope.ship.speed;
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

			var planets = $scope.makePlanets();

			setInterval(function() {
				//ctx.fillStyle = 'black';
				moveShip();
				drawGame();

				$scope.drawPlanets(planets);

				$scope.clickSignalTarget();

				$scope.$apply($scope.posX = $scope.ship.posX);
				$scope.$apply($scope.posY = $scope.ship.posY);
				$scope.frames += 1;
			}, 35); // 30FPS == 33.333333


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
