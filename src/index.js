//// The time and date ////

function currentDate(theDate) {
  let now = new Date();

  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = now.getDay();

  let date = theDate.getDate();
  if (date === 1 || 21 || 31) {
    date = `${date}st`;
  } else if (date === 2 || 22) {
    date = `${date}nd`;
  } else if (date === 3 || 23) {
    date = `${date}rd`;
  } else {
    date = `${date}th`;
  }

  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "October",
    "November",
    "December",
  ];
  let months = now.getMonth();

  return `${day[weekDay]} ${month[months]} ${date}`;
}

let topRight = document.querySelector("#date");
topRight.innerHTML = currentDate(new Date());

function currentTime(theTime) {
  let hour = new Date();

  let hours = hour.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = hour.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `🌞 ${hours}:${minutes}`;
}

let hourMinutes = document.querySelector("#time");
hourMinutes.innerHTML = currentTime(new Date());

///////// the city search ///////
function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#theTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function searchCity(city) {
  let apiKey = `abbaa4ac3af826a424d9c34cf8975be8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchCity(city);
}

searchCity("Oslo");

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", handleSubmit);

///current location
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `abbaa4ac3af826a424d9c34cf8975be8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let location = document.querySelector("#locationButton");
location.addEventListener("click", displayCurrent);

////// celsius to fahrenheit //////////

function fahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#theTemperature");
  temperature.innerHTML = 32;
}

let intoFarenheit = document.querySelector("#fahrenheit");
intoFarenheit.addEventListener("click", fahrenheit);

function celsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#theTemperature");
  temperature.innerHTML = 21;
}

let intoCelsius = document.querySelector("#celsius");
intoCelsius.addEventListener("click", celsius);
