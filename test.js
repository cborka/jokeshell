const axios = require('axios');
const now   = require("performance-now");
const request = require('sync-request');
const joke  = require('./joke');

let endTime = 0;
let beginTime = 0;
let jokesUrl = 'https://v2.jokeapi.dev/joke/Any';

/**
 * Returns an array of requests to the joke site.
 *
 * @remarks
 * This method is called from within a function {@RunAsyncTest | Parsing test}.
 *
 * @param num - Array size
 * @returns The array of promises
 *
 */
function getPromiseArray (num = 5) {
    let promiseArray = [];

    for(let i=0; i<num; i++ ) {
        promiseArray.push(axios.get(jokesUrl))
    }

    return promiseArray;
}

/**
 * Parsing N number of jokes asynchronously (using Promise.all ()).
 *
 * @remarks
 * This method use a function {@getPromiseArray | Forming an array of requests}.
 *
 * @param num - Number of requests
 */
function RunAsyncTest(num = 5) {

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

/**
 * Parsing N number of jokes synchronously (using sync-request library).
 *
 * @param num - Number of requests
 */
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
