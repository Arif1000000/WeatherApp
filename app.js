async function getWeather() {
    const apiKey = '7beb906372e543630c3d91473e40d8db';
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            const temperature = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius
            const description = data.weather[0].description;
            const city = data.name;

            weatherInfo.innerHTML = `<p>Temperature in ${city}: ${temperature}°C, ${description}</p>`;
        } else {
            weatherInfo.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}