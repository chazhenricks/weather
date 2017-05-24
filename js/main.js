"use strict";

let calls = require("./calls");
let weatherTemplate = require("../templates/currentWeather.hbs"),
    threeDayTemplate = require("../templates/threeDay.hbs"),
    sevenDayTemplate = require("../templates/sevenDay.hbs");
let Handlebars = require("hbsfy/runtime");


let city = "",
    state="";

console.log("Main.JS");
// ***********************
//Handlebars Helper
// **********************

//full disclosure - I had to yank this helper from stack overflow. It allows you to use each_upto to get a specific number of items out of an array
Handlebars.registerHelper('each_upto', function(array, max, options) {
    if(!array || array.length === 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < array.length; ++i)
        result.push(options.fn(array[i]));
    return result.join('');
});




// ***********************
// Button Events
// **********************

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

$(document).on("click", "#three-day", function(){
    calls.getForcast(city, state)
    .then(function(data){
        console.log(data);
        var forecastData = data.forecast.simpleforecast;
        console.log("forcast data", forecastData);
        $("#forecast-info").html(threeDayTemplate(forecastData));
        
    });
});

$(document).on("click", "#seven-day", function(){
    calls.getForcast(city, state)
    .then(function(data){
        console.log(data);
        var forecastData = data.forecast.simpleforecast;
        console.log("forcast data", forecastData);
        $("#forecast-info").html(sevenDayTemplate(forecastData));
        
    });
});




//Checks to see if zip code is valid
function checkZip(value) {
    return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
}


//Inputs user zip code to get user city and then passes that city to get current weather. 

function getWeather(zipcode){
    calls.getCity(zipcode)
    .then(function(data){
        city = data.results[0].address_components[1].long_name;
        state = data.results[0].address_components[3].short_name;
        return calls.getWeather(city, state);
    })
    .then(function(data){
        let currentWeather = data.current_observation;
        console.log(data);
        $("#weather-display").html(weatherTemplate(currentWeather));

    });
}