//----------------------------------Start of JS file----------------------------------
// Check if there is already local storage
$(window).on("load", function() {
    getLocalStorage();
});

// Define variables here;
// API key, current date, search and clear buttons,
// the user input value for city name, and an array of city.
var api_key = "21dd14b3b3fccee814257b2c4c22649e";
var rightNow = dayjs().format('MM/DD/YYYY');
var searchButton = $(".search-button");
var clearButton = $(".clear-button");
var cityNew = document.querySelector("#city-input");
var city = [];

// When search button clicked, new city search saved to browser and appended to search history,
// as well as displaying current weather and 5-day forecast, and setting to local storage.
searchButton.on("click", function(event)
{
    event.preventDefault();
    console.log("Message sent!");

    city = cityNew.value;

    console.log("City: " + city);
     // Gets current weather + 5-day forecast, sets local storage of city input, and appends it to search history.
    currentWeather(city);
    setLocalStorage(city);
    recentSearchList(city);

});

// Store recent searches.
function recentSearchList(city)
{
    // Creating list items with clickable buttons.
    var liNew = $("<li>");
    var buttonNew = $("<button>");
    // Adding 'listbtn' ID and 'button...' class with city name attached.
    buttonNew.attr('id', 'listBtn');
    buttonNew.addClass("button btn-outline-success btn-block");
    buttonNew.text(city);
    // Appends button to created <li>. Prepends <li> to 'search-history' ID.
    liNew.append(buttonNew);
    $("#search-history").prepend(liNew);

// When the city button is clicked (from 'search history'), retrieves weather info about that city.
    $("#listBtn").on("click", function(event)
    {
        event.preventDefault();

        var retrieveCity = $(this).text();
        //setLocalStorage(retrieveCity);
        currentWeather(retrieveCity);
    })
}

// Get current weather/location; needs to retrieve API.
function currentWeather(city)
{
    // The current weather API URL with teh ajax method of getting it.
    var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + api_key;
    $.ajax(
        {
            url: cityURL,
            method: "GET",
            error: (error => {
                alert("City not found, please check your spelling.")
                return;
        })
        }
    ).then(function (response)
    {
        console.log(response);

        // Appends selectors to the HTML, in the large white box for the current weather today.
        var searchedCity = $(".city").append($("<p><h3>" + response.name + " (" + rightNow + ")" + "</h3></p>"));
        var icon = $('<img class="imgsize">').attr('src', 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png');
        var temp = $("<p>").text('Temp: ' + response.main.temp + ' °F');
        var wind = $("<p>").text('Wind: ' + response.wind.speed + ' MPH');
        var humidity = $("<p>").text('Humidity: ' + response.main.humidity + ' %');

        // Gives city ID to other function for API to use.
        var cityID = response.id;
        fiveDayForecast(cityID);

        // Appends values directly to HTML, under 'city-date-icon' ID.
        searchedCity.append(icon).append(temp).append(wind).append(humidity);
        $("#city-date-icon").empty();
        $("#city-date-icon").append(searchedCity);
    });

}

// Gets 5-day forecast, needs to retrieve API.
function fiveDayForecast(city)
{
    // The 5-day forecast API URL with ajax method of getting it.
    var cityURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&units=imperial&appid=" + api_key;
    $.ajax(
        {
            url: cityURL,
            method: "GET",
        }
    ).then(function(response)
    {
        // Getting list from the URL response, looping into five sets of data.
        var weatherList = response.list;
        for (var i = 0; i < weatherList.length; i++)
        {
            if (weatherList[i].dt_txt.split(' ')[1] === '12:00:00')
            {
                // Bulk of it, adds selectors to the HTML, makes 5 cards for the 5-day forecast
                var cityMain = $('<div>');
                cityMain.addClass('col forecast bg-secondary border border-dark text-white ml-3 mb-3 rounded>');
                var date = $("<h5>").text(response.list[i].dt_txt.split(" ")[0]);
                var icon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + weatherList[i].weather[0].icon + '.png');
                var temp = $('<p>').text('Temp: ' + weatherList[i].main.temp + ' °F');  
                var wind = $('<p>').text('Wind: ' + weatherList[i].wind.speed + ' MPH');              
                var humidity = $('<p>').text('Humidity: ' + weatherList[i].main.humidity + ' %');  
                // Appends values directly to HTML, under 'forecast' ID.
                cityMain.append(date).append(icon).append(temp).append(wind).append(humidity);
                $("#forecast").append(cityMain);
            }
        }
    })
}

// Gets data saved locally.
function getLocalStorage()
{
    // 'saved' gets from local storage (the city names).
    var saved = localStorage.getItem("cities");
    var saveArr = [];
    // Join local storage value to new array, split string into substrings.
    saved.trim();
    saveArr.join(saved);
    saveArr = saved.split(',');
    // Loops saved values into search history.
    for (var i = 0; i < saveArr.length; i++)
    {
        recentSearchList(saveArr[i]);
    }
}

// Saves data locally.
function setLocalStorage(city)
{
    // Gets value from local storage.
    var info = localStorage.getItem("cities");
    // Push local storage value into array, set key + stringify values.
    var saveArr = [];
    saveArr.push(info);
    localStorage.setItem("cities", JSON.stringify(saveArr));
    // Set local storage.
    info = city;
    localStorage.setItem("cities", info);
    // If array is empty, sets item values and appends to search history.
    if (info.indexOf(city) === -1)
    {
        info = info + ',' + city;
        localStorage.setItem("cities", info);
        recentSearchList(city);
    }
}

// Clear history button; clears local storage AND search history of page.
clearButton.on("click", function () {
    localStorage.removeItem("cities");
    document.querySelector("#search-history").innerHTML = "";
    console.log("History cleared.");
  });
  //----------------------------------End of JS file----------------------------------