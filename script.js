$(document).ready(function(){
    console.log('it works');

    const key = "69a8c21b7273a586293ec934e4d677e9";
    let location = "london,UK"
    
    //button listener
    $("#search-button").on("click", function(){
        location = $("#search-input").val();
        let url = "http://api.openweathermap.org/data/2.5/weather?q=" + location +  "&APPID=" + key;
        appendButton();
        fillDashboard(url);
    })

function appendButton(){

}

    //call API and build div
   function fillDashboard(url){
       $.ajax({
           url : url,
           method : "GET"
       }).then(function(response){
           console.log(response);
   
   
       });
       
   }



});
