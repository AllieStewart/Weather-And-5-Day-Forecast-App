// Define variables here
var api_key = "21dd14b3b3fccee814257b2c4c22649e";
var rightNow = dayjs().format('MMM DD, YYYY');
var searchButton = $('.search-button');
var cityNew = document.querySelector("#city-input");
var input = "";

// Check if there is already local storage
$(window).on("load", function() {
    
});

// Search button (get rid of console logs later)
searchButton.on("click", function(event)
{
    event.preventDefault();
    console.log("Message sent!");

    var city = cityNew.value;
    localStorage.setItem('cities', city);

    console.log("City: " + city);

    // save to local storage, run currentWeather function?

});

// Store recent searches
function recentSearchList()
{

}

// Get current weather/location; needs to retrieve API
function currentWeather (city)
{
    // var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api_key;
    // $.ajax(
    //     {
    //         url: cityURL,
    //         method: "GET",
    //     }
    // ).then(function (response)
    // {

    // });

}

// Get 5-day forecast
function fiveDayForecast()
{

}

// Get data saved locally
function getLocalStorage()
{

}

// Save data locally
function setLocalStorage()
{

}