const axios = require('axios');
const now   = require("performance-now");
const request = require('sync-request');
const joke  = require('./joke');


let endTime = 0;
let beginTime = 0;
let jokesUrl = 'https://v2.jokeapi.dev/joke/Any';

// AsyncTest

function getPromiseArray (num = 10) {
    let promiseArray = [];

    for(let i=0; i<num; i++ ) {
        promiseArray.push(axios.get(jokesUrl))
    }

    return promiseArray;
}

function RunAsyncTest(num = 10) {

    beginTime = now();

    Promise.all( getPromiseArray(num) )
    .then(responses => responses.forEach(
    response => joke.ShowJoke(response.data, 1)
    ))
    .then(function (results) {
        endTime = now();
        console.log("Call to AsyncTest took " + (endTime-beginTime).toFixed(3) + " milliseconds.");
    });
}


function RunSyncTest(num = 5) {
    beginTime = now();

    for(let i=0; i<num; i++ ) {
        let res = request('GET', jokesUrl);
        let data = JSON.parse(res.getBody());

        joke.ShowJoke(data, i);
    }

    endTime = now();
    console.log("Call to SyncTest took " + (endTime-beginTime).toFixed(3) + " milliseconds.");
}

let test = {RunAsyncTest, RunSyncTest};
module.exports = test;

//RunAsyncTest(5);
//RunSyncTest(5);
