const axios = require('axios');
const now = require("performance-now")

let endTime = 0;
let beginTime = 0;

// AsyncTest

function getPromiseArray (num = 10) {
    let promiseArray = [];

    for(let i=0; i<num; i++ ) {
        promiseArray.push(() => axios.get('https://v2.jokeapi.dev/joke/Any'))
    }

    return promiseArray;
}

function RunAsyncTest(num = 10) {

    beginTime = now();

    Promise.all( getPromiseArray(num)
    //    [getJokePromiseTest(), getJokePromiseTest(), getJokePromiseTest(), getJokePromiseTest(), getJokePromiseTest()]
    )
    .then(function (results) {
        endTime = now();
//        setTimeout(() => console.log("Call to AsyncTest took " + (endTime-beginTime).toFixed(3) + " milliseconds."), 3000);
        console.log("Call to AsyncTest took " + (endTime-beginTime).toFixed(3) + " milliseconds.");
    });

}


let jokesCounter = 1;
let jokesUrl = 'https://v2.jokeapi.dev/joke/Any';
let jokesNumber = 3;

function SyncTest() {
    axios.get(jokesUrl)
        .then(function (response) {

//            ShowJoke(response.data);

            if (jokesCounter++ < jokesNumber ) {
//                endTime = now();
//                console.log("SyncTest: " + (endTime-beginTime).toFixed(3) + " ms");
                SyncTest();
            } else {
                endTime = now();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function RunSyncTest(num = 10) {

    beginTime = now();
    endTime = now();
    jokesNumber = num;

    SyncTest();
    setTimeout(() => console.log("Call to SyncTest took " + (endTime-beginTime).toFixed(3) + " milliseconds."), 3000);
//    console.log("Call to SyncTest took " + (endTime-beginTime).toFixed(3) + " milliseconds.");
}


//RunAsyncTest(10);
RunSyncTest(10);

