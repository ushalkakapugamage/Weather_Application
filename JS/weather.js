const apiKey = "e0f51fbd4d5f4d9383433550232509";
const apiUrl = "http://api.weatherapi.com/v1";

const search_btn = document.getElementById("search-btn");
search_btn.onclick = () => {
    console.log("Search");
    display_weather();


};

function display_weather() {
    maincard_weather();
    forcast_weather();
}

function maincard_weather() {
    let search_bar = document.getElementById("search-bar").value;

    // Use encodeURIComponent to properly encode the search_bar value
    const encodedSearchBar = encodeURIComponent(search_bar);
    fetch(`${apiUrl}/current.json?key=${apiKey}&q=${encodedSearchBar}`)
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

            let imgElement = document.querySelector("#main-img");

            // Change the image source based on the condition
            if (conditionArray[conditionArray.length - 1] == "rain") {
                imgElement.img.src = "ASSETS/rainy.webp"; // Change to the new image source
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

function forcast_weather() {
    let search_bar = document.getElementById("search-bar").value;

    // Use encodeURIComponent to properly encode the search_bar value
    const encodedSearchBar = encodeURIComponent(search_bar);
    fetch(`${apiUrl}/forecast.json?key=${apiKey}&q=${encodedSearchBar}&days=5`)
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


            for (let i = 0; i < 5; i++) {
                // Use template literals to concatenate the index i with the IDs
                document.getElementById(`card-temp${i}`).innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "&deg;";
                let condition = document.getElementById(`card-condition${i}`).innerHTML = data.forecast.forecastday[i].day.condition.text;
                let conditionArray = condition.split(' ');
                if (conditionArray[conditionArray.length - 1] == "rain") {
                    document.getElementById(`card${i}`).style.backgroundImage = "url('Assets/rainy.webp')";
                }
            }

        })
        .catch(error => {
            // Handle errors here
            console.error('Fetch error:', error);
        });
}

