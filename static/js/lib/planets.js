smApp.service('planetService', function() {

	var drawPlanets = function() {

		ctx.beginPath();
    ctx.arc(40, 80, 30, 0, 2 * Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(237, 237, 102)';
    ctx.stroke();
    ctx.closePath();
		};

});	

	