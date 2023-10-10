// Define variables here
var api_key = "21dd14b3b3fccee814257b2c4c22649e";
var rightNow = dayjs().format('MMM DD, YYYY');
var searchButton = $('.search-button');
var cityNew = document.querySelector("#city-input");
var city = "";
//var input = "";

// Check if there is already local storage
$(window).on("load", function() {
    
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

}

// Get current weather/location; needs to retrieve API
function currentWeather (city)
{
    var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api_key;
    $.ajax(
        {
            url: cityURL,
            method: "GET",
            // error: (
            //     alert("City not found, please check your spelling.");
            //     return;
            // )
        }
    ).then(function (response)
    {
        console.log(response);

        $("#city-date-icon").empty();

        // var searchedCity = ;
        // var icon = ;
        // var temp = ;
        // var wind = ;
        // var humidity = ;

        //append searchedCity.date.icon
        //append temp, wind, humidity underneath


    });

}

// Get 5-day forecast
function fiveDayForecast()
{

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
    localStorage.setItem('cities', city);
}