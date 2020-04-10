$(document).ready(function(){
    
    const key = "69a8c21b7273a586293ec934e4d677e9";
    let location = ""
    let searchTerms = [];
    init();
    //Create and Search
    $("#search-button").on("click", function(){
        location = $("#search-input").val();
        addToLocalStorage(location);
        createButton(location);
        fillDashboard(location);
    });
    
    // Enter event listener
    $('.input-group').keypress(function(e){
        if(e.which == 13){
            $('#search-button').click();
        }
    });
    
    //Search with Existing Button
    $("#button-append").on("click", "button", function(){
        let searchTerm = $(this).data("value");
        location = searchTerm;
        fillDashboard(location);
    });
    $("#clear-button-history").on("click", function(){
        $("#button-append").empty();
        localStorage.clear();
    })
    
    //call API and build div
    function fillDashboard(location){
        currentWeather(location);
    }
    
    function currentWeather(location){
        $.ajax({
            url : "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + key,
            method : "GET"
        }).then(function(response){
            $("#append-weather-details").empty();
            let cityName = response.name;
            let date = new Date(response.dt);
            let dateFormatted = moment.unix(date).format("(MM/DD/YYYY)");
            let currentTemp = response.main.temp;
            let iconCode = response.weather[0].icon;
            let currentHumidity = response.main.humidity;
            let iconUrl ="http://openweathermap.org/img/w/" + iconCode + ".png";
            let windSpeed = response.wind.speed;
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            let headlineDiv = $("<div>");
            let cityNameH2 = $("<h2>");
            headlineDiv.addClass("d-flex")
            cityNameH2.text(cityName + " " + dateFormatted);
             cityNameH2.addClass("my-3");
             $("#append-weather-details").append(headlineDiv);
             $(headlineDiv).append(cityNameH2);
             let currentWeatherIcon = $("<img>");
             currentWeatherIcon.attr("src", iconUrl);
             currentWeatherIcon.attr("style", "width: 4rem; height: 4rem;");
             $(headlineDiv).append(currentWeatherIcon);
             let currentTempP = $("<p>")
             currentTempP.text("Temperature: " + currentTemp + "°F")
             $("#append-weather-details").append(currentTempP);
             let currentHumidityP = $("<p>")
             currentHumidityP.text("Humidity: " + currentHumidity + "%")
             $("#append-weather-details").append(currentHumidityP);
             let currentWindSpeedP = $("<p>")
             currentWindSpeedP.text("Wind Speed: " + windSpeed + " MPH")
             $("#append-weather-details").append(currentWindSpeedP);
             getFiveDayData(lat, lon);
             getUVIndex(lat, lon);
             
       });
    }
    function getFiveDayData(lat, lon){
        $.ajax({
            url : "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + key + "&units=imperial",
            method : "GET"
        }).then(function(response){
            $("#five-day-header").empty();
            $("#five-day").empty();
            let headerFiveDay = $("<h2>").text("5-Day Forecast");
            headerFiveDay.addClass("py-2 mb-0 mt-2 text-light")
            $("#five-day-header").append(headerFiveDay);
            for (let i = 1; i < 6; i++){
                let date = new Date(response.daily[i].dt);
                let dateFormatted = moment.unix(date).format("MM/DD/YYYY");
                let currentTemp = response.daily[i].temp.max;
                let iconCode = response.daily[i].weather[0].icon;
                let currentHumidity = response.daily[i].humidity;
                let iconUrl ="http://openweathermap.org/img/w/" + iconCode + ".png";
                let dailyDiv = $("<div>");
                dailyDiv.addClass("my-3")
                let dateh5 = $("<h5>");
                dateh5.text(dateFormatted);
                dailyDiv.append(dateh5);
                let iconImg = $("<img>");
                iconImg.attr("src", iconUrl);
                dailyDiv.append(iconImg);
                let tempP = $("<p>");
                tempP.text("Temp: " + currentTemp + "°F");
             dailyDiv.append(tempP);
             let humidityP = $("<p>");
             humidityP.text("Humidity: " + currentHumidity + "%");
             dailyDiv.append(humidityP);
             $("#five-day").append(dailyDiv);
             dailyDiv.addClass(" blue p-3 px-4 text-light rounded");
         }
        });
    }
    function getUVIndex(lat, lon){
        $.ajax({
            url : "https://api.openweathermap.org/data/2.5/uvi/forecast?appid="+ key +"&units=imperial&lat=" + lat + "&lon=" + lon,
            method : "GET"
        }).then(function(response){
            let UV = response[0].value;
            let currentUVDiv = $("<div>")
            let currentUVP = $("<p>")
            let currentUVSpan = $("<span>")
            currentUVP.text("UV Index: ");
             currentUVP.addClass("mb-0");
             currentUVSpan.text(UV);
             currentUVSpan.addClass("mx-2 px-2 rounded text-light");
             if (UV < 3){
                 currentUVSpan.addClass("low");
            } else if (UV >= 3 && UV < 6){
                currentUVSpan.addClass("moderate");
             } else if (UV >= 6 && UV < 8){
                 currentUVSpan.addClass("high");
             } else if (UV >= 8 && UV < 11){
                 currentUVSpan.addClass("very-high");
                } else {
                currentUVSpan.addClass("extreme");
            }
             currentUVDiv.addClass("d-flex");
             currentUVDiv.append(currentUVP);
             currentUVDiv.append(currentUVSpan);
             $("#append-weather-details").append(currentUVDiv);
            });
    }
    
    
    
    function addToLocalStorage (search){
    searchTerms.push(search);
    localStorage.setItem("searches", JSON.stringify(searchTerms));
}
function init (){
    let stringStorage = localStorage.getItem("searches")
    if (stringStorage){
        searchTerms = JSON.parse(stringStorage);
        console.log(searchTerms);
        for (let i = 0; i < searchTerms.length; i++){
            createButton(searchTerms[i]);
        }
    } else {
    }
}
function createButton(location){
    searchButton = $("<button>");
    searchButton.addClass("search-button");
    searchButton.attr("data-value", location);
    searchButton.append(location);
    $("#button-append").append(searchButton);
}
});