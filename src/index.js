const cityInput = document.getElementById('cityInput');
const fetchWeatherButton = document.getElementById('fetchWeather');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('CityName');
const temperatureInfo = document.getElementById('temperatureinfo');
const humidityInfo = document.getElementById('humidityinfo');
const skyInfo = document.getElementById('skyinfo');
const emojiInfo = document.getElementById('emojiinfo');

const api = '1d67ecf8acbc6348a362b908df6b380c';
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${api}&units=metric`;

function getEmoji(id) {
    if (id >= 200 && id < 300) return "⛈️";   // thunderstorm
    if (id >= 300 && id < 400) return "🌦️";   // drizzle
    if (id >= 500 && id < 600) return "🌧️";   // rain
    if (id >= 600 && id < 700) return "❄️";   // snow
    if (id >= 700 && id < 800) return "🌫️";   // mist, fog, haze
    if (id === 800) return "☀️";              // clear sky
    if (id === 801) return "🌤️";              // few clouds
    if (id === 802) return "⛅";              // scattered clouds
    return "☁️";                              // broken or overcast clouds
}

async function getinfo(city) {
    url =  "https://api.openweathermap.org/data/2.5/weather?q="
        + encodeURIComponent(city)
        + "&units=metric&appid=" + api;

    const response = await fetch(url);
    
    if (response.status === 404) throw new Error("City not found");
    if (response.status === 401) throw new Error("Invalid or not yet active API key");
    if (!response.ok) throw new Error("Something went wrong, try again");

    return await response.json();
}

function shwoweather(data) {
    if (!data || !data.main || !data.weather || data.weather.length === 0) {
        alert('Invalid weather data received.');
        return;
    }

    else {
        cityName.textContent = data.name;
        temperatureInfo.textContent = `${data.main.temp} °C`;
        humidityInfo.textContent = `Humidity: ${data.main.humidity}%`;
        skyInfo.textContent = `Sky: ${data.weather[0].description}`;
        emojiInfo.textContent = getEmoji(data.weather[0].id);
    }}

function showError(message) {
    cityName.textContent = message;
    temperatureInfo.textContent = "";
    humidityInfo.textContent = "";
    skyInfo.textContent = "";
    emojiInfo.textContent = "😕";
}

async function search() {
    const city = cityInput.value.trim();

    if (!city) {
        showError('Please enter a city name.');
        return;
    }

    try {
        cityName.textContent = 'Loading...';
        const data = await getinfo(city);
        shwoweather(data);
    } catch (error) {
        showError(error.message);
    }

}

fetchWeatherButton.addEventListener('click', search);