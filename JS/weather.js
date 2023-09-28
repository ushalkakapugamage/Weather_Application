const apiKey = "e0f51fbd4d5f4d9383433550232509";
const apiUrl = "http://api.weatherapi.com/v1";

let latitude = undefined;
let longitude = undefined;


window.onload = function () {
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

        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);
        maincard_weather(latitude, longitude);
        forcast_weather(latitude, longitude);
    };

    // Call the getLocation function to initiate the geolocation process
    getLocation();


};




const search_btn = document.getElementById("search-btn");
search_btn.onclick = () => {
    let search_bar = document.getElementById("search-bar").value;
    const location = encodeURIComponent(search_bar);
    display_weather(location);


};

function display_weather(location) {
    maincard_weather(location);
    forcast_weather(location);
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
            console.log(data);
            document.getElementById("cell1").innerHTML = data.current.temp_c + "&deg;";
            let condition = document.getElementById("cell2").innerHTML = data.current.condition.text;
            document.getElementById("cell3").innerHTML = data.location.name;
            let conditionArray = condition.split(' ');

            // Change the image source based on the condition
            if (conditionArray[conditionArray.length - 1] == "rain") {
                document.getElementById("main-img").src = "ASSETS/rain.jpg"; // Change to the new image source
            }else if (conditionArray[conditionArray.length - 1] == "cloudy") {
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

    fetch(`${apiUrl}/current.json?key=${apiKey}&q=${latitude},${longitude}`)
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
            console.log(data);
            document.getElementById("cell1").innerHTML = data.current.temp_c + "&deg;";
            let condition = document.getElementById("cell2").innerHTML = data.current.condition.text;
            document.getElementById("cell3").innerHTML = data.location.name;
            let conditionArray = condition.split(' ');

            // Change the image source based on the condition
            if (conditionArray[conditionArray.length - 1] == "rain") {
                document.getElementById("main-img").src = "ASSETS/rain.jpg"; // Change to the new image source
            }else if (conditionArray[conditionArray.length - 1] == "cloudy") {
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

function forcast_weather(location) {
    fetch(`${apiUrl}/forecast.json?key=${apiKey}&q=${location}&days=5`)
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
            console.log(data);


            for (let i = 1; i < 5; i++) {
                // Use template literals to concatenate the index i with the IDs
                document.getElementById(`card-temp${i}`).innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "&deg;";
                let condition = document.getElementById(`card-condition${i}`).innerHTML = data.forecast.forecastday[i].day.condition.text;
                document.getElementById(`card-date${i}`).innerHTML = data.forecast.forecastday[i].date;
            
                let conditionArray = condition.split(' ');
                if (conditionArray[conditionArray.length - 1] == "rain") {
                    document.getElementById(`card${i}`).style.backgroundImage = "url('Assets/rain.jpg')";
                } else if (conditionArray[conditionArray.length - 1] == "cloudy") {
                    document.getElementById(`card${i}`).style.backgroundImage = "url('Assets/clouds.jpeg')";
                } else if (conditionArray[conditionArray.length - 1] == "sunny") {
                    document.getElementById(`card${i}`).style.backgroundImage = "url('Assets/sun.jpg')";
                }
                // Add more conditions as needed for other weather conditions
            }
            

        })
        .catch(error => {
            // Handle errors here
            console.error('Fetch error:', error);
        });

    function forcast_weather(latitude, longitude) {
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
                console.log(data);


                for (let i = 1; i < 5; i++) {
                    // Use template literals to concatenate the index i with the IDs
                    document.getElementById(`card-temp${i}`).innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "&deg;";
                    let condition = document.getElementById(`card-condition${i}`).innerHTML = data.forecast.forecastday[i].day.condition.text;
                    document.getElementById(`card-date${i}`).innerHTML = data.forecast.forecastday[i].date;
                
                    let conditionArray = condition.split(' ');
                    if (conditionArray[conditionArray.length - 1] == "rain") {
                        document.getElementById(`card${i}`).style.backgroundImage = "url('Assets/rain.jpg')";
                    } else if (conditionArray[conditionArray.length - 1] == "cloudy") {
                        document.getElementById(`card${i}`).style.backgroundImage = "url('Assets/clouds.jpeg')";
                    } else if (conditionArray[conditionArray.length - 1] == "sunny") {
                        document.getElementById(`card${i}`).style.backgroundImage = "url('Assets/sun.jpg')";
                    }
                    // Add more conditions as needed for other weather conditions
                }

            })
            .catch(error => {
                // Handle errors here
                console.error('Fetch error:', error);
            });
    }
}

