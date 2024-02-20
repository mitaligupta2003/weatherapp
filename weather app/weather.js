const inputbox = document.querySelector(".input-box");
const searchbtn = document.getElementById("searchbtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

const location_not_found = document.getElementById("location-not-found");

const weather_body = document.querySelector(".weather-body");

async function checkweather(city) {
  const api_key = "4ff721c4a12ea43a9da125bb7e9c8c3b";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );
  console.log(weather_data);
  if (weather_data.cod === "404") {
    location_not_found.style.display = "initial";
    weather_body.style.display = "none";
    console.log("error");
    return;
  }else{
      location_not_found.style.display = "none";
      weather_body.style.display = "flex";
      temperature.innerHTML = `${Math.round (weather_data.main.temp - 273.15)}°C`;
      description.innerHTML = `${weather_data.weather[0].description}`;
      humidity.innerHTML = `${weather_data.main.humidity}%`;
      wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

      switch (weather_data.weather[0].main) {
        case "Clear":
          weather_img.src = "sun.jpg";
          break;
        case "Haze":
          weather_img.src = "sun-cloud.png";
          break;
        case "Rain":
          weather_img.src = "raincloud.jpeg";
          break;
        case "Clouds":
          weather_img.src = "cloud.jpeg";
          break;
          case "rain":
          weather_img.src = "rain.jpeg";
          break;
        case "Snow":
          weather_img.src = "snow.jpeg";
          break;
        case "Mist":
          weather_img.src = "mist.jpeg";
          break;
        default:
          weather_img.src = "sun.jpg";
      }
      
  }

}

searchbtn.addEventListener("click", () => {
  console.log(inputbox.value);
  checkweather(inputbox.value);
});

inputbox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      checkweather(inputbox.value);
    }
  });
