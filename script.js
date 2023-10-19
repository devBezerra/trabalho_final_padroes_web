function getLocation() {
  loader(true);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeatherData, handleError);
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function showWeatherData(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  getWeatherData(latitude, longitude);
}

function handleError(error) {
  loader(false);
  console.error("Error getting location: " + error.message);
}

function getWeatherData(latitude, longitude) {
  const apiKey = "This is not a API Key :)";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const weatherData = JSON.parse(xhr.responseText);

      changeView(weatherData);
    } else {
      loader(false);
      console.error("Error fetching time data.");
    }
  };

  xhr.send();
}

function changeView(data) {
  const cityName = document.createTextNode(data.name);
  const cityTemp = document.createTextNode(
    `Current Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C.`
  );
  const weatherDescription = document.createTextNode(
    data.weather[0].description
  );
  const clouds = document.createTextNode(
    `${data.clouds.all}% of clouds in the sky.`
  );
  const humidity = document.createTextNode(
    `${data.main.humidity}% of humidity.`
  );

  const cityNameInformation = document.createElement("h2");
  cityNameInformation.appendChild(cityName);
  cityNameInformation.className = 'cityNameInformation';

  const conditions = document.createElement("h3");
  conditions.appendChild(weatherDescription);
  conditions.className = 'conditions';

  const currentTemp = document.createElement("p");
  currentTemp.appendChild(cityTemp);
  currentTemp.className = 'currentTemp';

  const cloudsInfo = document.createElement("p");
  cloudsInfo.appendChild(clouds);
  cloudsInfo.className = 'cloudsInfo';

  const humidityInfo = document.createElement("p");
  humidityInfo.appendChild(humidity);
  humidityInfo.className = 'humidityInfo';

  const section = document.getElementById("city");
  section.appendChild(cityNameInformation);
  section.appendChild(conditions);
  section.appendChild(currentTemp);
  section.appendChild(cloudsInfo);
  section.appendChild(humidityInfo);
  loader(false);
}

function loader(load) {
  const loaderSection = document.getElementById("loader");
  if (!!load) {
    const loading = document.createElement("div");
    loading.className = "loader-circle";
    loading.id = "loader-circle";

    loaderSection.appendChild(loading);

    document.getElementById("showButton").disabled = true;
  } else {
    const loading = document.getElementById("loader-circle");
    loaderSection.removeChild(loading);

    document.getElementById("showButton").disabled = false;
  }
}
