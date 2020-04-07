$(document).ready(function(){

    const key = "69a8c21b7273a586293ec934e4d677e9";
    let location = ""
    
    //Create and Search
    $("#search-button").on("click", function(){
        location = $("#search-input").val();
        let url = "https://api.openweathermap.org/data/2.5/forecast?q=" + location +  "&appid=" + key;
        //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
        createButton(location);
        fillDashboard(url);
    });

    //Search with Existing Button
    $("#button-append").on("click", "button", function(){
        let searchTerm = $(this).data("value");
        let url = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + key;
        console.log(searchTerm);
        fillDashboard(url);
    });

    function createButton(location){
        searchButton = $("<button>");
        searchButton.addClass("search-button");
        searchButton.attr("data-value", location);
        searchButton.append(location);
        $("#button-append").append(searchButton);
    }

    //call API and build div
    function fillDashboard(url){
        currentWeather(url);
        }
    
    
    function currentWeather(url){
        $.ajax({
            url : "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + key,
            method : "GET"
        }).then(function(response){
            console.log(response);
            $("#append-weather-details").empty();
            let cityName = response.name;
            //  let date = 
            let currentTemp = response.main.temp;
            let iconCode = response.weather[0].icon;
            let currentHumidity = response.main.humidity;
            let iconUrl ="http://openweathermap.org/img/w/" + iconCode + ".png";
            
            
            let windSpeed = response.wind.speed;
            //  let lat = response.city.coord.lat;
            //  let long = response.city.coord.lat;
            //  console.log(cityName, iconCode, iconUrl, currentTemp, currentHumidity, windSpeed, lat, long);
            let headlineDiv = $("<div>");
            headlineDiv.addClass("d-flex")
             let cityNameH2 = $("<h2>");
             cityNameH2.text("Current Weather for: " + cityName);
             $("#append-weather-details").append(headlineDiv);
             console.log(today);
             $(headlineDiv).append(cityNameH2);
             let currentWeatherIcon = $("<img>");
             currentWeatherIcon.attr("src", iconUrl);
             $(headlineDiv).append(currentWeatherIcon);
             let currentTempP = $("<p>")
             currentTempP.text("Temperature: " + currentTemp)
             $("#append-weather-details").append(currentTempP);
             let currentHumidityP = $("<p>")
             currentHumidityP.text("Humidity: " + currentHumidity + "%")
             $("#append-weather-details").append(currentHumidityP);
             let currentWindSpeedP = $("<p>")
             currentWindSpeedP.text("Wind Speed: " + windSpeed + " MPH")
             $("#append-weather-details").append(currentWindSpeedP);
            //Build the button in then 'then' because i dont want buttons if the search fails
            getFiveDayData(lat, long);
            
       });
    }
    function getFiveDayData(lat, long){
        $.ajax({
            url : "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + key,
            method : "GET"
        }).then(function(response){
            console.log(response);
            //  let currentTemp = response.list[0].main.temp;
            //  let iconCode = response.list[0].weather[0].icon;
            //  let currentHumidity = response.list[0].main.humidity;
            //  let iconUrl ="http://openweathermap.org/img/w/" + iconCode + ".png";
       });
    }

});
