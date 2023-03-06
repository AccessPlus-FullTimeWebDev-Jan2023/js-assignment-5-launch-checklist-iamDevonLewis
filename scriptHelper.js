// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src='${imageUrl}'>`
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty"
    } else if (isNaN(testInput)) {
        return "Not a Number"
    } else if (!isNaN(testInput)) {
        return "Is a Number"
    }
}

function formSubmission (document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let launchStatus = document.getElementById('launchStatus');
    
    if (validateInput(pilot) === "Empty"|| validateInput(copilot) === "Empty"|| 
    validateInput(fuelLevel) === "Empty"||validateInput(cargoLevel) === "Empty") {
        alert(`All fields are required`);
    }
   
    else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        alert(`Enter a number`);
    } else if (validateInput(pilot)==="Is a Number"||validateInput(copilot)==="Is a Number") {
        alert('Make sure to enter valid information!');
    } 
    else {
    
    pilotStatus.innerHTML = `Pilot ${pilot} is ready`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready`;
    
    }

    if (fuelLevel < 10000) {
        list.style.visibility = "visible";
        fuelStatus.innerHTML = "Not enough fuel for journey";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = rgb(199, 37, 78);
    } else if (cargoLevel > 10000) {
        list.style.visibility = "visible";
        cargoStatus.innerHTML = "Too much mass for the shuttle to take off";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = rgb(199, 37, 78);
    } else if (cargoLevel < 10000 && fuelLevel > 10000) {
        fuelStatus.innerHTML = "Enough fuel for journey";
        list.style.visibility = "visible";
        cargoStatus.innerHTML = "Cargo light enough for takeoff";
        launchStatus.innerHTML = "Shuttle ready for launch";
        launchStatus.style.color = rgb(199, 37, 78);
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()

        });
    return planetsReturned;
}

function pickPlanet(planets) {
    let planet = Math.floor(Math.random() * planets.length);
    return planets[planet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
