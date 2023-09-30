const apiKey = "e0f51fbd4d5f4d9383433550232509";
const apiUrl = "http://api.weatherapi.com/v1";

let latitude = undefined;
let longitude = undefined;
let jsonData = undefined
let currentDate = undefined;
let endDate = undefined;


window.onload = function () {
    currentDate = getCurrentDate();
    endDate=getEndDate(); 


    var latitude;  // Variable to store latitude
    var longitude; // Variable to store longitude

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
        maincard_weather(latitude, longitude);
        historical_weather(latitude, longitude,currentDate,endDate);
    };

    // Call the getLocation function to initiate the geolocation process
    getLocation();


};

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function getEndDate() {
    const date = new Date();
    date.setDate(date.getDate() - 4);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}





const search_btn = document.getElementById("search-btn");
search_btn.onclick = () => {
    let search_bar = document.getElementById("search-bar").value;
    const location = encodeURIComponent(search_bar);
    console.log(currentDate);
    display_weather(location);


};

function display_weather(location) {
    maincard_weather(location);
}


function maincard_weather(location) {


    // Use encodeURIComponent to properly encode the search_bar value

    fetch(`${apiUrl}/current.json?key=${apiKey}&q=${location}`)
        .then(response => {
            // Check if the response status is OK (200)
            if (!response.ok) {
                throw new Error("Weather data request failed with status: " + response.status);
            }
            // Parse the response as JSON
            return response.json();
        })
        .then(data => {
            // Handle the JSON data here
            jsonData = data;
            forcast_weather(jsonData);
            document.getElementById("cell1").innerHTML = data.current.temp_c + "&deg;";
            let condition = document.getElementById("cell2").innerHTML = data.current.condition.text;
            document.getElementById("cell3").innerHTML = data.location.name;
            let conditionArray = condition.split(' ');

            // Change the image source based on the condition
            if (conditionArray[conditionArray.length - 1] == "rain") {
                document.getElementById("main-img").src = "ASSETS/rain.jpg"; // Change to the new image source
            } else if (conditionArray[conditionArray.length - 1] == "cloudy") {
                document.getElementById("main-img").src = "ASSETS/clouds.jpeg"; // Change to the new image source
            }

            const windPressure = data.current.pressure_mb;
            const windSpeed = data.current.wind_kph;
            const humidity = data.current.humidity;
            const uvIndex = data.current.uv;
            const sunrise = data.location.localtime;
            const sunset = data.location.localtime;

            // Update the table cells with the data
            document.getElementById('windPressure').textContent = windPressure;
            document.getElementById('windSpeed').textContent = windSpeed;
            document.getElementById('humidity').textContent = humidity;
            document.getElementById('uvIndex').textContent = uvIndex;
            document.getElementById('sunrise').textContent = sunrise;
            document.getElementById('sunset').textContent = sunset;
        })
        .catch(error => {
            // Handle errors here
            console.error('Fetch error:', error);
        });
}
function maincard_weather(latitude, longitude) {


    // Use encodeURIComponent to properly encode the search_bar value

    fetch(`${apiUrl}/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=5`)
        .then(response => {
            // Check if the response status is OK (200)
            if (!response.ok) {
                throw new Error("Weather data request failed with status: " + response.status);
            }
            // Parse the response as JSON
            return response.json();
        })
        .then(data => {
            // Handle the JSON data here
            jsonData = data;
            forcast_weather(jsonData);
            document.getElementById("cell1").innerHTML = data.current.temp_c + "&deg;";
            let condition = document.getElementById("cell2").innerHTML = data.current.condition.text;
            document.getElementById("cell3").innerHTML = data.location.name;
            let conditionArray = condition.split(' ');

            // Change the image source based on the condition
            if (conditionArray[conditionArray.length - 1] == "rain") {
                document.getElementById("main-img").src = "ASSETS/rain.jpg"; // Change to the new image source
            } else if (conditionArray[conditionArray.length - 1] == "cloudy") {
                document.getElementById("main-img").src = "ASSETS/clouds.jpeg"; // Change to the new image source
            }

            const windPressure = data.current.pressure_mb;
            const windSpeed = data.current.wind_kph;
            const humidity = data.current.humidity;
            const uvIndex = data.current.uv;
            const sunrise = data.location.localtime;
            const sunset = data.location.localtime;

            // Update the table cells with the data
            document.getElementById('windPressure').textContent = windPressure;
            document.getElementById('windSpeed').textContent = windSpeed;
            document.getElementById('humidity').textContent = humidity;
            document.getElementById('uvIndex').textContent = uvIndex;
            document.getElementById('sunrise').textContent = sunrise;
            document.getElementById('sunset').textContent = sunset;
        })
        .catch(error => {
            // Handle errors here
            console.error('Fetch error:', error);
        });
}

function forcast_weather(jsonData) {
    for (let i = 1; i < 5; i++) {
        // Use template literals to concatenate the index i with the IDs
        document.getElementById(`card-temp${i}`).innerHTML = jsonData.forecast.forecastday[i].day.maxtemp_c + "&deg;";
        let condition = document.getElementById(`card-condition${i}`).innerHTML = jsonData.forecast.forecastday[i].day.condition.text;
        document.getElementById(`card-date${i}`).innerHTML = jsonData.forecast.forecastday[i].date;

        let conditionArray = condition.split(' ');
        let card = document.getElementById(`card${i}`);
        card.style.backgroundRepeat = "no-repeat";
        card.style.backgroundSize = "cover";

        if (conditionArray[conditionArray.length - 1] == "rain") {
            card.style.backgroundImage = "url('Assets/rain.jpg')";
        } else if (conditionArray[conditionArray.length - 1] == "cloudy") {
            card.style.backgroundImage = "url('Assets/clouds.jpeg')";
        } else if (conditionArray[conditionArray.length - 1] == "Sunny") {
            card.style.backgroundImage = "url('Assets/sun.jpeg')";
        } else if (conditionArray[conditionArray.length - 1] == "Windy") {
            card.style.backgroundImage = "url('Assets/windy.jpg')";
        }
        // Add more conditions as needed for other weather conditions
    }

}
function historical_weather(latitude, longitude, currentDate, endDate) {
    fetch(`${apiUrl}/history.json?key=${apiKey}&q=${latitude},${longitude}&dt=${endDate}&end_dt=${currentDate}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Weather data request failed with status: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            const table = document.querySelector('.historical-data table');
            table.innerHTML = '';

            for (let i = 4 - 1; i >= 0; i--) {
                const row = document.createElement('tr');
                const cell = document.createElement('td');

                const iconSrc = getIconSrc(data.forecast.forecastday[i].day.condition.text);

                cell.innerHTML = `<img src="${iconSrc}">&nbsp;&nbsp;&nbsp;&nbsp;${data.forecast.forecastday[i].date}&nbsp;&nbsp;&nbsp;&nbsp;${data.forecast.forecastday[i].day.condition.text}&nbsp;&nbsp;&nbsp;&nbsp;${data.forecast.forecastday[i].day.maxtemp_c}&deg;`;

                row.appendChild(cell);
                table.appendChild(row);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function getIconSrc(condition) {
    if (condition.toLowerCase().includes('shower')) {
        return 'ASSETS/icons/clouds.png';
    } else if (condition.toLowerCase().includes('windy')) {
        return 'ASSETS/icons/windy.png';
    } else if (condition.toLowerCase().includes('sunny')) {
        return 'ASSETS/icons/sunny.png';
    } else if (condition.toLowerCase().includes('rainy')) {
        return 'ASSETS/icons/rain.png';
    }

    return 'ASSETS/icons/default.png';
}

