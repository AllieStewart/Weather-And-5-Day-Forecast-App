// Define variables here
var api_key = "21dd14b3b3fccee814257b2c4c22649e";
var rightNow = dayjs().format('MMM DD, YYYY');
var searchButton = $(".search-button");
var cityNew = document.querySelector("#city-input");
var city = "";
//var input = "";

// Check if there is already local storage
$(window).on("load", function() {
    getLocalStorage();
});

// Search button (get rid of console logs later)
searchButton.on("click", function(event)
{
    event.preventDefault();
    console.log("Message sent!");

    var city = cityNew.value;

    console.log("City: " + city);

    setLocalStorage(city);

    currentWeather(city);

});

// Store recent searches
function recentSearchList(city)
{
    var liNew = $("<li>");
    var buttonNew = $("<button>");

    buttonNew.attr('id', 'listBtn');
    buttonNew.addClass("button btn-outline-success btn-block");
    buttonNew.text(city);

    liNew.append(buttonNew);
    $("#search-history").prepend(liNew);

    $("#listBtn").on("click", function(event)
    {
        event.preventDefault();

        var retrieveCity = $(this).text();
        setLocalStorage(retrieveCity);
        currentWeather(retrieveCity);
    })
    // only stores one search at a time, hmmm...
}

// Get current weather/location; needs to retrieve API
function currentWeather(city)
{
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
        $(".city-date-icon").empty();

        var searchedCity = $(".city").append(response.name + " ");
        // date repeats when searching new city; fix append, maybe put to city append instead^
        var date = $(".date").append("(" + rightNow + ")");
        var icon = $('<img class="imgsize">').attr('src', 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png');
        var temp = $("<li>").text('Temp: ' + response.main.temp + ' °F');
        var wind = $("<li>").text('Wind: ' + response.wind.speed + ' MPH');
        var humidity = $("<li>").text('Humidity: ' + response.main.humidity + '%');

        var cityID = response.id;

        fiveDayForecast(cityID);

        //fix append(date)
        searchedCity.append(date).append(icon).append(temp).append(wind).append(humidity);

        $("#city-date-icon").empty();
        $("#city-date-icon").append(searchedCity);
    });

}

// Get 5-day forecast
function fiveDayForecast(city)
{
    var cityURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&units=imperial&appid=" + api_key;
    $.ajax(
        {
            url: cityURL,
            method: "GET",
        }
    ).then(function(response)
    {
        var weatherList = response.list;
        for (var i = 0; i < weatherList.length; i++)
        {
            if (weatherList[i].dt_txt.split(' ')[1] === '12:00:00')
            {
                var cityMain = $('<div>');
                cityMain.addClass('col forecast bg-secondary border border-dark text-white ml-3 mb-3 rounded>');
                var date = $("<h5>").text(response.list[i].dt_txt.split(" ")[0]);
                var icon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + weatherList[i].weather[0].icon + '.png');
                var temp = $('<p>').text('Temp: ' + weatherList[i].main.temp + ' °F');  
                var wind = $('<p>').text('Wind: ' + weatherList[i].wind.speed + 'MPH');              
                var humidity = $('<p>').text('Humidity: ' + weatherList[i].main.humidity + '%');  

                cityMain.append(date).append(icon).append(temp).append(wind).append(humidity);
                $('#forecast').append(cityMain);
            }
        }
    })
}

// Get data saved locally
function getLocalStorage()
{
    var saved = localStorage.getItem('cities');
    var saveArr = [];

    saved.trim();
    saveArr = saved.split(',');
    for (var i = 0; i < saveArr.length; i++)
    {
        recentSearchList(saveArr[i]);
    }
}

// Save data locally
function setLocalStorage(city)
{
    var info = localStorage.getItem('cities');

    info = city;
    localStorage.setItem('cities', info);

    if (info.indexOf(city) === -1)
    {
        info = info + ',' + city;
        localStorage.setItem('cities', info);
        recentSearchList(city);
    }
}