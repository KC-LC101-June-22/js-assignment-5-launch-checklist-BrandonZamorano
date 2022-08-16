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
}

function validateInput(testInput) {
	if (testInput.trim().length === 0) {
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
	console.log(validationResults);

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

	list.querySelector('#pilotStatus').textContent = `Pilot ${pilot} is ready`;
	list.querySelector('#copilotStatus').textContent = `Co-pilot ${copilot} is ready`;

	const MIN_FUEL_LEVEL = 10_000;

	if (fuelLevel < MIN_FUEL_LEVEL) {
		list.style.visibility = 'visible';
		list.querySelector('#fuelStatus').textContent = "Not enough fuel for the journey"
		launchStatusEl.textContent="Shuttle not ready for launch";
		launchStatusEl.style.color = "red";
		return;
	}

	const MAX_CARGO_MASS = 10_000;

	if (cargoLevel > MAX_CARGO_MASS) {
		list.style.visiblity = "visible";
		launchStatusEl.textContent = "Shuttle not ready for launch";
		return;
	}

	launchStatus.textContent = "Shuttle is ready for launch";
	launchStatus.style.color = "green";







	//const validationResults = [pilot, copilot, fuelLevel, cargoLevel]
	//.reduce((acc, curr) => {
		//acc[curr]k
	//}, {})
	//.map(input => validateInput(input))
	
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch().then( function(response) {
        });

    return planetsReturned;
}

function pickPlanet(planets) {
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
