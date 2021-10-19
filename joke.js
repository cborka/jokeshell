const axios = require('axios');
chalk = require('chalk');

let jokesCounter = 1;

let jokesUrl = 'https://v2.jokeapi.dev/joke/Any';
let jokesNumber = 3;
let jokesDelay = 2;

/**
 * Displaying a joke on the screen.
 *
 * @remarks
 * This method is used in a lot of functions
 *
 * @param joke - Object
 * @param counter - Serial number of this joke
 */
function ShowJoke(joke, counter = jokesCounter) {

    console.log(chalk.blue(counter));

    if (joke.type === 'twopart') {
        console.log(chalk.red(joke.setup));
        console.log(chalk.blue(joke.delivery));

    } else {
        console.log(chalk.green(joke.joke));
    }
    console.log('--------------  ахахахаха ---------------');
}

/**
 * Request for a joke using Promise
 *
 * @remarks
 * Use function {@ShowJoke} to show joke
 */
function  getJokePromise() {

    axios.get(jokesUrl)
        .then(function (response) {

            ShowJoke(response.data);

            if (jokesCounter++ < jokesNumber ) {
                setTimeout(getJokePromise, jokesDelay*1000);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * Request for a joke using Async - await
 *
 * @remarks
 * Use function {@ShowJoke} to show joke
 */
async function getJokeAsync() {
    try {
        const response = await axios.get(jokesUrl);

        ShowJoke(response.data);

        if (jokesCounter++ < jokesNumber ) {
            setTimeout(getJokeAsync, jokesDelay*1000);
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * Tunes and runs functions for requests for a jokes
 *
 * @remarks
 * Use function {@getJokeAsync} or {@getJokePromise} for requests
 *
 * @param url - Object
 * @param j_num - Number of jokes
 * @param delay - Delay between jokes (seconds)
 * @param isAsyncAwait - What function use for requests
 */
function RunJokes(url = jokesUrl, j_num = jokesNumber, delay = jokesDelay, isAsyncAwait = false) {
    if (url) {
        jokesUrl = url;
    }
    if (j_num) {
        jokesNumber = j_num;
    }
    if (delay !== null) {
        jokesDelay = delay;
    }

    if (isAsyncAwait) {
        getJokeAsync();
    } else {
        getJokePromise();
    }
}

let joke = {ShowJoke, RunJokes};
module.exports = joke;
