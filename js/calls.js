"use strict";

function getCity(zip) {
    return new Promise(function (resolve, reject){
        $.ajax({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${zip}&sensor=true"`
        }).done(function(data){
            resolve(data);
        }).fail(function(error){
            reject(error);
        });
    });
}

function getWeather(city, state) {
    return new Promise(function (resolve, reject){
        $.ajax({
            url: `http://api.wunderground.com/api/3018d91767478a9c/conditions/q/${state}/${city}.json`
        }).done(function(data){
            resolve(data);
        }).fail(function(error){
            reject(error);
        });
    });
}

function getForcast(city, state) {
    return new Promise(function (resolve, reject){
        $.ajax({
            url: `http://api.wunderground.com/api/3018d91767478a9c/forecast10day/q/${state}/${city}.json`
        }).done(function(data){
            resolve(data);
        }).fail(function(error){
            reject(error);
        });
    });
}


module.exports = 
{
    getCity,
    getWeather,
    getForcast
};