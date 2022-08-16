// Write your JavaScript code here!

window.addEventListener("load", function() {
	const form = document.querySelector('form');
	const pilotNameInput = document.querySelector("input[name=pilotName]");
	const copilotNameInput = document.querySelector("input[name=copilotName]");
	const fuelLevelInput = document.querySelector("input[name=fuelLevel]");
	const cargoMassInput = document.querySelector("input[name=cargoMass]");
	const faultyItemsEl = document.getElementById('faultyItems');

	form.addEventListener("submit", function(event) {
		event.preventDefault();

		formSubmission(document, faultyItemsEl, pilotNameInput.value, copilotNameInput.value, fuelLevelInput.value, cargoMassInput.value);



	});

	let listedPlanets;
	// Set listedPlanetsResponse equal to the value returned by calling myFetch()
	let listedPlanetsResponse = myFetch();
	listedPlanetsResponse.then(function (result) {
		listedPlanets = result;
	}).then(function () {
		// Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
		const planet = pickPlanet(listedPlanets);
		addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
	})


});
