smApp.directive("gamescreen", function() {

	return {
		restrict: "A",
		link: function($scope, element){

			var canvas = element[0];
			var ctx = element[0].getContext('2d');
			var rect = canvas.getBoundingClientRect();

			$scope.ctx = ctx;
			$scope.frames = 0;

			var screenWidth = canvas.width;
			var screenHeight = canvas.height;

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

			$scope.click = {
				targetX: 0,
				targetY: 0,
				targetRadius: 0
			};

			$scope.clickSignalTarget = function() {
				ctx.beginPath();
	      ctx.arc($scope.click.targetX, $scope.click.targetY, $scope.click.targetRadius, 0, 2 * Math.PI, false);
	      ctx.fillStyle = 'red';
	      ctx.fill();
	      ctx.strokeStyle = '#003300';
	      ctx.stroke();
			}

			function drawGame() {
			ctx.clearRect(0,0,screenWidth,screenHeight);
			ctx.fillStyle = "rgb(213,209,255)";
			ctx.fillRect($scope.ship.posX, $scope.ship.posY, $scope.ship.width, $scope.ship.height);
			ctx.fillText("MouseX=" + mousePos.x + " MouseY=" + mousePos.y, 2, 20);
			}


			function moveThings() {

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
				shipTarget.x = target.clientX - rect.left;
				shipTarget.y = target.clientY - rect.top;

				console.log(shipTarget.x);
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

			setInterval(function() {
				ctx.fillStyle = 'black';
				moveThings();
				drawGame();

				$scope.clickSignalTarget();

				$scope.$apply($scope.posX = $scope.ship.posX);
				$scope.$apply($scope.posY = $scope.ship.posY);
				$scope.frames += 1;
			}, 20);


		}
	}
});