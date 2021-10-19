#!/usr/bin/env node



const commander = require('commander'),
    { prompt } = require('inquirer'),
    chalk = require('chalk'),
    joke = require('./joke'),
    test  = require('./test');

commander
    .version('1.0.0')
    .description('Jokes reader and tester');

commander
    .command('run')
    .option('-n, --num <jokesnum>', 'Number of jokes')
    .option('-d, --delay <delay>', 'Delay between messages (seconds)')
    .option('-a, --asyncawait', 'Promise or AsyncAwait (default: promise)')
    .option('-p, --prompt', 'Prompt for category')
    .description('Run jokes logging')
    .action((options) => {

        console.log(options);
        if (!options.prompt) {
            joke.RunJokes(null, options.num, options.delay, options.asyncawait)
        } else {
            let categorys = ['Programming', 'Miscellaneous', 'Dark', 'Pun', 'Spooky', 'Christmas'];

            console.log('what kind of jokes do you foresee?');
            console.log('Enter the number and press the enter key');

            for(let i=1; i<=categorys.length; i++) {
                console.log(i + ' - ' + categorys[i-1]);
            }

            prompt([
                {
                    type: 'input',
                    name: 'category',
                    message: 'Enter number: ',
                },
            ]).then((inputs) => {
                console.log(options);
                console.log(inputs);

                let url = undefined;
                if (inputs.category > 0 && inputs.category <= categorys.length) {

                    url = 'https://v2.jokeapi.dev/joke/' +categorys[inputs.category-1];
                    console.log('Ok, you like jokes about  '+ categorys[inputs.category-1]);
                }
                joke.RunJokes(url, options.num, options.delay, options.asyncawait)
            })
        }
    });

commander
    .command('test')
    .option('-n, --num <jokesnum>', 'Number of jokes')
    .option('-a, --async', 'Is async test (default: sync')
    .description('Speed test')
    .action((options) => {

        if (options.async) {
            test.RunAsyncTest(options.num);
        } else {
            test.RunSyncTest(options.num);
        }
    });

commander.parse(process.argv);
