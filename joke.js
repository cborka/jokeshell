const axios = require('axios');
chalk = require('chalk');

let jokesCounter = 1;

let jokesUrl = 'https://v2.jokeapi.dev/joke/Any';
let jokesNumber = 3;
let jokesDelay = 2;


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

function RunJokes(url = jokesUrl, j_num = jokesNumber, delay = jokesDelay) {
    if (url) {
        jokesUrl = url;
    }
    if (j_num) {
        jokesNumber = j_num;
    }
    if (delay !== null) {
        jokesDelay = delay;
    }


    console.log('jokesUrl='+jokesUrl);
    console.log('jokesNumber='+jokesNumber);
    console.log('jokesDelay='+jokesDelay);

    getJokePromise();
    //getJokeAsync();
}

//RunJokes();
//RunJokes(null,3, 0);

let joke = {ShowJoke, RunJokes};

module.exports = joke;



// for (let key in v) {
//     console.log( key + ' = ' + v[key]);
// }
