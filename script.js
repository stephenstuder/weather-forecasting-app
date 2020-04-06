$(document).ready(function(){

    const key = "69a8c21b7273a586293ec934e4d677e9";
    let location = "london,UK"
    
    //Create and Search
    $("#search-button").on("click", function(){
        location = $("#search-input").val();
        let url = "http://api.openweathermap.org/data/2.5/forecast?q=" + location +  "&appid=" + key;
        //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
        createButton(location);
        fillDashboard(url);
    });

    //Search with Existing Button
    $("#button-append").on("click", "button", function(){
        let searchTerm = $(this).data("value");
        console.log(searchTerm);
        let url = "http://api.openweathermap.org/data/2.5/forecast?q=" + location +  "&appid=" + key;
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
        $.ajax({
            url : url,
            method : "GET"
        }).then(function(response){
            $("#append-weather-details").empty();
            let cityName = response.city.name;
            let currentTemp = response.list[0].main.temp;
            console.log(response.list[0].main);
            let cityNameH1 = $("<h1>")
            cityNameH1.text("Current Weather for: " + cityName)
            $("#append-weather-details").append(cityNameH1);
            //Build the button in then 'then' because i dont want buttons if the search fails
   
       });
       
   }



});
