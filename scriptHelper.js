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

const validationResult = {
  EMPTY: "Empty",
  NAN: "Not a Number",
  NUM: "Is a Number"
}

function validateInput(testInput) {
  if (testInput === "") {
    return validationResult.EMPTY
  }

  if (Number.isNaN(Number(testInput))) {
    return validationResult.NAN
  } else {
    return validationResult.NUM
  }

}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  const validationResults = [
    { expected: validationResult.NAN, result: validateInput(pilot) },
    { expected: validationResult.NAN, result: validateInput(copilot) },
    { expected: validationResult.NUM, result: validateInput(fuelLevel) },
    { expected: validationResult.NUM, result: validateInput(cargoLevel) },
  ]

  // Alert if any result is "Empty"
  if (validationResults.find(({ result }) => result === validationResult.EMPTY)) {
    return alert("All fields are required")
  }

  // Alert if not every result is equal to expected
  if (!validationResults.every(({ expected, result }) => expected === result)) {
    return alert("Make sure to enter valid information for each field")
  }

  // Assume everything is validated at this point
  fuelLevel = Number(fuelLevel)
  cargoLevel = Number(cargoLevel)

  const launchStatusEl = document.querySelector("#launchStatus");

  const MIN_FUEL_LEVEL = 10_000;
  const MAX_CARGO_MASS = 10_000;
  const COLOR_GREEN = "rgb(65, 159, 106)";
  const COLOR_RED = "rgb(199, 37, 78)";

  const pilotStatusEl = document.querySelector('#pilotStatus');
  const copilotStatusEl = document.querySelector('#copilotStatus');
  const fuelStatusEl = document.querySelector('#fuelStatus');
  const cargoStatusEl = document.querySelector("#cargoStatus");

  pilotStatusEl.textContent = `Pilot ${pilot} is ready for launch`;
  copilotStatusEl.textContent = `Co-pilot ${copilot} is ready for launch`;

  // update launch status
  if (fuelLevel < MIN_FUEL_LEVEL || cargoLevel > MAX_CARGO_MASS) {
    list.style.visibility = 'visible';
    launchStatusEl.textContent = "Shuttle Not Ready for Launch";
    launchStatusEl.style.color = COLOR_RED;
  } else {
    list.style.visiblity = "visible";
    launchStatusEl.textContent = "Shuttle is Ready for Launch";
    launchStatusEl.style.color = COLOR_GREEN;
  }


  if (fuelLevel < MIN_FUEL_LEVEL) {
    fuelStatusEl.textContent = "Fuel level too low for launch"
  } else {
    fuelStatusEl.textContent = "Fuel level high enough for launch"
  }


  if (cargoLevel > MAX_CARGO_MASS) {
    cargoStatusEl.textContent = "Cargo mass too heavy for launch";
  } else {
    cargoStatusEl.textContent = "Cargo mass low enough for launch";
  }

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
