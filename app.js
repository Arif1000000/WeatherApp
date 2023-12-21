async function getWeather() {
    const apiKey = '7beb906372e543630c3d91473e40d8db';
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');

    try {
        // Fetch current weather data
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok) {
            throw new Error(`Weather API request failed with status: ${weatherResponse.status}`);
        }

        // Fetch forecast data for the next 5 days
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationInput.value}&appid=${apiKey}`);
        const forecastData = await forecastResponse.json();

        if (!forecastResponse.ok) {
            throw new Error(`Forecast API request failed with status: ${forecastResponse.status}`);
        }

        // Fetch UV Index data
        const uvResponse = await fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${apiKey}`);
        const uvData = await uvResponse.json();

        if (!uvResponse.ok) {
            throw new Error(`UV Index API request failed with status: ${uvResponse.status}`);
        }

        // Display the weather information
        displayWeather(weatherData, forecastData, uvData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}

function displayWeather(currentWeather, forecast, uvData) {
    const weatherInfo = document.getElementById('weatherInfo');
    
    // Extract relevant information
    const cityName = currentWeather.name;
    const temperature = Math.round(currentWeather.main.temp - 273.15); // Convert temperature to Celsius
    const description = currentWeather.weather[0].description;
    const windSpeed = currentWeather.wind.speed;
    const humidity = currentWeather.main.humidity;
    const visibility = currentWeather.visibility;
    const uvIndex = uvData.value;

    // Display current weather information
    weatherInfo.innerHTML = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature}°C, ${description}</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Humidity: ${humidity}%</p>
        <p>Visibility: ${visibility} meters</p>
        <p>UV Index: ${uvIndex}</p>
        <h3>Weather Forecast for the Next 5 Days</h3>
        ${displayForecast(forecast)}
    `;
}

function displayForecast(forecast) {
    // Extract and format forecast data
    const forecastList = forecast.list.slice(0, 5); // Display forecast for the next 5 days
    const forecastItems = forecastList.map(item => `
        <div>
            <p>Date/Time: ${item.dt_txt}</p>
            <p>Temperature: ${Math.round(item.main.temp - 273.15)}°C</p>
            <p>Weather: ${item.weather[0].description}</p>
            
        </div>
    `).join('');

    return `<div class="forecast">${forecastItems}</div>`;
}