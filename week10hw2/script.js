const startBtn = document.getElementById('start');
const outputSection = document.getElementById('output');

const fetchCountryData = () => {
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            const randomCountry = data[Math.floor(Math.random() * data.length)];
            const countryName = randomCountry.name.common;
            const capital = randomCountry.capital ? randomCountry.capital[0] : "No Capital";
            const flagUrl = randomCountry.flags.png;
            const latitude = randomCountry.latlng[0];
            const longitude = randomCountry.latlng[1];

            outputSection.innerHTML = '';

            const name = document.createElement('h2');
            name.textContent = `Country: ${countryName}`;
            outputSection.appendChild(name);

            const capitalInfo = document.createElement('p');
            capitalInfo.textContent = `Capital: ${capital}`;
            outputSection.appendChild(capitalInfo);

            const flagImg = document.createElement('img');
            flagImg.src = flagUrl;
            flagImg.alt = `${countryName} Flag`;
            flagImg.width = 150;
            outputSection.appendChild(flagImg);

            fetchWeatherData(latitude, longitude);
        })
        .catch(error => console.error('Error fetching country data:', error));
};

const fetchWeatherData = (latitude, longitude) => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        .then(response => response.json())
        .then(data => {
            const weather = data.current_weather;
            const temperature = weather.temperature;
            const windspeed = weather.windspeed;

            const weatherInfo = document.createElement('p');
            weatherInfo.textContent = `Current Weather: ${temperature}°C, Wind Speed: ${windspeed} m/s`;
            outputSection.appendChild(weatherInfo);
        })
        .catch(error => console.error('Error fetching weather data:', error));
};

startBtn.addEventListener('click', fetchCountryData);