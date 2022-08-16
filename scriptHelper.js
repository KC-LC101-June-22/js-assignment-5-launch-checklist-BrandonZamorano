// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
	document.getElementById('missionTarget').innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
	`;
}

function validateInput(testInput) {
	if (testInput === "") {
		return "Empty";
	}

	if (Number.isNaN(Number(testInput))) {
		return "Not a Number";
	} else {
		return "Is a Number";
	}
   
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
	const validationResults = {
		pilot: validateInput(pilot),
		copilot: validateInput(copilot),
		fuelLevel: validateInput(fuelLevel),
		cargoLevel: validateInput(cargoLevel),
	}

	if (Object.values(validationResults).includes("Empty")) {
		return alert("All fields are required");
	}

	if (
		validationResults.pilot === "Is a Number" ||
		validationResults.copilot === "Is a Number" ||
		validationResults.fuelLevel === "Not a Number" ||
		validationResults.cargoLevel === "Not a Number"
	) {
		return alert("Make sure to enter valid information for each field");
	}

	// Assume everything is validated at this point
	fuelLevel = Number(fuelLevel)
	cargoLevel = Number(cargoLevel)

	const launchStatusEl = document.querySelector("#launchStatus");

	const MIN_FUEL_LEVEL = 10_000;
	const MAX_CARGO_MASS = 10_000;

	const pilotStatusEl = list.querySelector('#pilotStatus');
	const copilotStatusEl = list.querySelector('#copilotStatus');
	const fuelStatusEl = list.querySelector('#fuelStatus');
	const cargoStatusEl = list.querySelector("#cargoStatus");

	pilotStatusEl.textContent = `Pilot ${pilot} is ready for launch`;
	copilotStatusEl.textContent = `Co-pilot ${copilot} is ready for launch`;

	// update launch status
	if (fuelLevel < MIN_FUEL_LEVEL || cargoLevel > MAX_CARGO_MASS) {
		launchStatusEl.textContent = "Shuttle Not Ready for Launch";
		launchStatusEl.style.color = "rgb(199, 37, 78)";
	}


	if (fuelLevel < MIN_FUEL_LEVEL) {
		list.style.visibility = 'visible';
		fuelStatusEl.textContent = "Fuel level too low for launch"
	} else {
		fuelStatusEl.textContent = "Fuel level high enough for launch"
	}


	if (cargoLevel > MAX_CARGO_MASS) {
		list.style.visiblity = "visible";
		cargoStatusEl.textContent = "Cargo mass too heavy for launch";

		return;
	} else {
		cargoStatusEl.textContent = "Cargo mass low enough for launch";
	}

	launchStatusEl.textContent = "Shuttle is Ready for launch";
	launchStatusEl.style.color = "green";
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(res => res.json());

    return planetsReturned;
}

function pickPlanet(planets) {
	return planets[Math.floor(Math.random() * planets.length)]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
