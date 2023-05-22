var token = 'e752958f8cf3063d1f0daa91d773b31c';
var userInput = document.querySelector('.input');
var searchButton = document.querySelector('.search-btn');
var cityList = document.querySelector(".city-list");

// Retrieves city name from local storage
var addCityName = localStorage.getItem('addCityName');

// Today's forecast URL
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + addCityName + '&units=imperial' + token;

// 5-day forecast URL
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + addCityName + '&units=imperial' + token;

// Stores the user input value in localStorage
function addCityName() {
    localStorage.setItem('addCityName', userInput.value);
}

for (var i = 0; i < localStorage.length; i++) {
    $(".city-list").append("<p>" + localStorage.getItem(localStorage.key(i)) + "</p>");
}

// Today's forecast
$.ajax({
    url: weatherURL,
    method: "GET"
})
    .then(function(response) {

        // Displa weather information
        $('.city-name').html("<h2>" + response.name + "</h2>");
        $('.weather-icon').html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' >");
        $('.wind-speed').text("Wind Speed: " + response.wind.speed + " MPH");
        $('.humidity').text("Humidity: " + response.main.humidity + "%");
        $(".temperature").text("Temperature: " + response.main.temp + " F");

        // UV Index URL
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + token;

        // UV Index data
        $.ajax({
            url: uvIndexURL,
            method: "GET"
        })
            .then(function(response) {
                var uvValue = response.value;

                // Displays UV Index information
                $('.uv-index').text("UV Index: " + response.value);
                $('.uv-index').css("background-color", uvColor(uvValue));
            });

    });

// UV Index Colors!
function uvColor(uvValue, color) {
    var color = "";
    if (uvValue <= 2) {
        color = "#66ff00";
    }
    else if (uvValue <= 5 && uvValue > 2) {
        color = "#ffbb00";
    }
    else if (uvValue >= 6 && uvValue > 5) {
        color = "#FF0000";
    }
    return color;
}

// Displays today's date
var todaysDate = moment().format("dddd, MMMM Do");

function displayCurrentDate() {
    $(".todays-date").text(todaysDate);
};
displayTodaysDate();

// Pulls 5-day Forecast
$.ajax({
    url: forecastURL,
    method: "GET"
})
    .then(function (response) {

        var firstDay = moment(response.list[0].dt_txt).format("ddd, MMM D");

        // Day 1
        $(".day-one-temp").text("Temp: " + response.list[0].main.temp + " F");
        $(".day-one-date").html("<h6>" + firstDay + "</h6>");
        $(".day-one-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Weather icon.'>");
        $(".day-one-humidity").text("Humidity: " + response.list[0].main.humidity + "%");

        var secondDay = moment(response.list[8].dt_txt).format("ddd, MMM D");
        // Day 2
        $(".day-two-temp").text("Temp: " + response.list[8].main.temp + " F");
        $(".day-two-date").html("<h6>" + secondDay + "</h6>");
        $(".day-two-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[8].weather[0].icon + ".png' alt='Weather icon.'>");
        $(".day-two-humidity").text("Humidity: " + response.list[8].main.humidity + "%");

        var thirdDay = moment(response.list[16].dt_txt).format("ddd, MMM D");
        // Day 3
        $(".day-three-temp").text("Temp: " + response.list[16].main.temp + " F");
        $(".day-three-date").html("<h6>" + thirdDay + "</h6>");
        $(".day-three-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[16].weather[0].icon + ".png' alt='Weather icon.'>");
        $(".day-three-humidity").text("Humidity: " + response.list[16].main.humidity + "%");

        var fourthDay = moment(response.list[24].dt_txt).format("ddd, MMM D");

        // Day 4
        $(".day-four-temp").text("Temp: " + response.list[24].main.temp + " F");
        $(".day-four-date").html("<h6>" + fourthDay + "</h6>");
        $(".day-four-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[24].weather[0].icon + ".png' alt='Weather icon.'>");
        $(".day-four-humidity").text("Humidity: " + response.list[24].main.humidity + "%");

        var fifthDay = moment(response.list[32].dt_txt).format("ddd, MMM D");

        // Day 5
        $(".day-five-temp").text("Temp: " + response.list[32].main.temp + " F");
        $(".day-five-date").html("<h6>" + fifthDay + "</h6>");
        $(".day-five-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[32].weather[0].icon + ".png' alt='Weather icon.'>");
        $(".day-five-humidity").text("Humidity: " + response.list[32].main.humidity + "%");

    });

// Search button event listener
searchButton.addEventListener('click', addCityName);
