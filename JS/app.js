const apiKey = "e0f51fbd4d5f4d9383433550232509";
const apiUrl = "http://api.weatherapi.com/v1";

let latitude = undefined;
let longitude = undefined;
let jsonData = undefined;

window.onload = function () {
    var getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    };

    var showPosition = function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        // Fetch forecast data only once
        fetchForecastData(latitude, longitude);

        // Display current weather
        maincard_weather();

        // Display forecast weather
        forcast_weather();
    };

    // Call the getLocation function to initiate the geolocation process
    getLocation();
};

const search_btn = document.getElementById("search-btn");
search_btn.onclick = () => {
    let search_bar = document.getElementById("search-bar").value;
    const location = encodeURIComponent(search_bar);

    // Fetch forecast data only once
    fetchForecastData(location);

    // Display current weather
    maincard_weather();

    // Display forecast weather
    forcast_weather();
};

function fetchForecastdata(latitude, longitude) {
    fetch(`${apiUrl}/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=5`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Weather data request failed with status: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            jsonData = data;

            // Call other functions that depend on the forecast data
            forcast_weather(jsonData);
            // Additional functions...

        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function fetchForecastData(location) {
    fetch(`${apiUrl}/forecast.json?key=${apiKey}&q=${location}&days=5`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Weather data request failed with status: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            jsonData = data;
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function maincard_weather() {
    // Use jsonData for current weather data
    document.getElementById("cell1").innerHTML = jsonData.current.temp_c + "&deg;";
    let condition = document.getElementById("cell2").innerHTML = jsonData.current.condition.text;
    document.getElementById("cell3").innerHTML = jsonData.location.name;

    // Change the image source based on the condition
    if (condition.toLowerCase().includes("rain")) {
        document.getElementById("main-img").src = "ASSETS/rain.jpg";
    } else if (condition.toLowerCase().includes("cloudy")) {
        document.getElementById("main-img").src = "ASSETS/clouds.jpeg";
    }

    // Update other elements with data
    // ...
}

function forcast_weather() {
    for (let i = 1; i < 5; i++) {
        // Use template literals to concatenate the index i with the IDs
        document.getElementById(`card-temp${i}`).innerHTML = jsonData.forecast.forecastday[i].day.maxtemp_c + "&deg;";
        let condition = jsonData.forecast.forecastday[i].day.condition.text;
        document.getElementById(`card-condition${i}`).innerHTML = condition;
        document.getElementById(`card-date${i}`).innerHTML = jsonData.forecast.forecastday[i].date;

        let conditionArray = condition.split(' ');
        let card = document.getElementById(`card${i}`);
        card.style.backgroundRepeat = "no-repeat";
        card.style.backgroundSize = "cover";

        if (conditionArray[conditionArray.length - 1].toLowerCase() == "rain") {
            card.style.backgroundImage = "url('Assets/rain.jpg')";
        } else if (conditionArray[conditionArray.length - 1].toLowerCase() == "cloudy") {
            card.style.backgroundImage = "url('Assets/clouds.jpeg')";
        } else if (conditionArray[conditionArray.length - 1].toLowerCase() == "sunny") {
            card.style.backgroundImage = "url('Assets/sun.jpeg')";
        } else if (conditionArray[conditionArray.length - 1].toLowerCase() == "windy") {
            card.style.backgroundImage = "url('Assets/windy.jpg')";
        }
        // Add more conditions as needed for other weather conditions
    }
}
