function makePlanet(num) {
	var planet = {};
	for(var i=0;i<num;i++) {
		planet.x = Math.round(Math.random() * (600 - 0) + 0);
		planet.y = Math.round(Math.random() * (200 - 0) + 0);
		console.log(planet.x);
		console.log(planet.y);
	}
}

makePlanet(5);

