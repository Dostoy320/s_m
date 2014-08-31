smApp.directive("gamescreen", function() {

	return {
		restrict: "A",
		link: function($scope, element){

			var canvas = element[0];
			var ctx = element[0].getContext('2d');

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
					ship.posX += 2;
				}
				if(ship.posX > shipTarget.x) {
					ship.posX -= 2;
				}
				if(ship.posY < shipTarget.y) {
					ship.posY += 2;
				}
				if(ship.posY > shipTarget.y) {
					ship.posY -= 2;
				}

				if(ship.posX + ship.width >= screenWidth) {
					ship.posX -= 2;
				}
				if(ship.posX <= 0) {
					ship.posX += 2;
				}
			}

			function setTarget(target) {
				shipTarget.x = target.clientX;
				shipTarget.y = target.clientY;
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
				setTarget(evnt);
			});

			setInterval(function() {
				moveThings();
				drawGame();
				$scope.$apply($scope.posX = ship.posX);
				$scope.$apply($scope.posY = ship.posY);
			}, 20);


		}
	}
});