$(document).ready(function(){
    console.log('it works');

    const key = "69a8c21b7273a586293ec934e4d677e9";
    let location = "london,UK"
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=" + key;

    $.ajax({
        url : url,
        method : "GET"
    }).then(function(response){
        console.log(response);


    });



});
