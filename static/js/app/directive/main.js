smApp.directive("gamescreen", function() {

	return {
		restrict: "A",
		link: function($scope, element){

			$scope.frames = 0;

			var canvas = element[0];
			var ctx = element[0].getContext('2d');

			$scope.ctx = ctx;

			var screenWidth = canvas.width;
			var screenHeight = canvas.height;

			var ship = {
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

			function drawGame() {
			ctx.clearRect(0,0,screenWidth,screenHeight);
			ctx.fillRect(ship.posX, ship.posY, ship.width, ship.height);
			ctx.fillText("MouseX=" + mousePos.x + " MouseY=" + mousePos.y, 2, 20);
			}


			function moveThings() {
				// if(ship.posY + 11 < screenHeight-ground) {
				// 	ship.posY++;
				// }

				// ship.posY = Math.min(screenHeight-ground,ship.posY);

				if(ship.posX < shipTarget.x) {
					ship.posX += 3;
				}
				if(ship.posX > shipTarget.x) {
					ship.posX -= 3;
				}
				if(ship.posY < shipTarget.y) {
					ship.posY += 3;
				}
				if(ship.posY > shipTarget.y) {
					ship.posY -= 3;
				}

				if(ship.posX + ship.width >= screenWidth) {
					ship.posX -= 3;
				}
				if(ship.posX <= 0) {
					ship.posX += 3;
				}
			}

			function setTarget(target) {
				var rect = canvas.getBoundingClientRect();
				shipTarget.x = target.clientX - rect.left;
				shipTarget.y = target.clientY - rect.top;

				console.log(shipTarget.x);
			}

			function getMousePosition(canvas, evnt) {
				var rect = canvas.getBoundingClientRect();
				return {
					x: evnt.clientX - rect.left,
					y: evnt.clientY - rect.top
				};
			}

			canvas.addEventListener('mousemove', function(evnt) {
				mousePos = getMousePosition(canvas, evnt);
			}, false);

			canvas.addEventListener('mousedown', function(evnt) {
				console.log(evnt.clientX);
				setTarget(evnt);
			});

			setInterval(function() {
				moveThings();
				drawGame();
				$scope.$apply($scope.posX = ship.posX);
				$scope.$apply($scope.posY = ship.posY);
				$scope.frames += 1;
			}, 20);


		}
	}
});