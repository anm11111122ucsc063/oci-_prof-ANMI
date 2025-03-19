const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const tempElement = document.getElementById('temp');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');

const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

searchButton.addEventListener('click', function() {
    const city = cityInput.value;
    if (city) {
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found!');
            } else {
                displayWeather(data);
            }
        })
        .catch(error => alert('Error fetching data!'));
}

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    tempElement.textContent = `Temperature: ${data.main.temp}°C`;
    descriptionElement.textContent = `Description: ${data.weather[0].description}`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
