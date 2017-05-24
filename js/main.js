"use strict";

let calls = require("./calls");
let weatherTemplate = require("../templates/currentWeather.hbs");
let Handlebars = require("hbsfy/runtime");

console.log("Main.JS");
//Submit button event
$(document).on("click", "#submit-btn", function(){
    let zipCode = $("#user-input").val();
    if(checkZip(zipCode)){
        getWeather(zipCode);
    }else{
         $("#user-input").val("Please Enter a Valid Zip Code");
    }
});

//Enter keypress triggers #submit-btn event
$(document).on("keyup", function(e){
    if (e.keyCode === 13) {
       $("#submit-btn").trigger("click");
    }
});


//Checks to see if zip code is valid
function checkZip(value) {
    return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
}


//Inputs user zip code to get user city and then passes that city to get current weather. 

function getWeather(zipcode){
    calls.getCity(zipcode)
    .then(function(data){
        let city = data.results[0].address_components[1].long_name;
        let state = data.results[0].address_components[3].short_name;
        return calls.getWeather(city, state);
    })
    .then(function(data){
        let currentWeather = data.current_observation;
        console.log(data);
        $("#weather-display").html(weatherTemplate(currentWeather));

    });
}