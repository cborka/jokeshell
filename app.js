#!/usr/bin/env node

const commander = require('commander'),
    { prompt } = require('inquirer'),
    chalk = require('chalk'),
    joke = require('./joke'),
    test  = require('./test');

commander
    .version('1.0.0')
    .description('Jokes reader and tester')

commander
    .command('run')
    .option('-n, --num <jokesnum>', 'Number of jokes')
    .option('-d, --delay <delay>', 'Delay between messages (seconds)')
    .option('-a, --asyncawait', 'Promise or AsyncAwait (default: promise)')
    .option('-p, --prompt', 'Prompt options')
    .description('Run jokes logging')
    .action((options) => {

        //const options = commander.opts();

        if (!options.prompt) {
            joke.RunJokes(null, options.num, options.delay, options.asyncawait)
        } else {
            prompt([
                {
                    type: 'input',
                    name: 'joke',
                    message: 'New joke: ',
                },
            ]).then((options) => {
                console.log(options);
                joke.RunJokes(null, options.num, options.delay, options.asyncawait)
            })
        }

//        console.log(options);
    });

commander
    .command('test')
    .option('-n, --num <jokesnum>', 'Number of jokes')
    .option('-a, --async', 'Is async test (default: sync')
    .description('Speed test')
    .action((options) => {

//        joke.RunJokes(null, options.num, options.delay)

        if (options.async) {
            test.RunAsyncTest(options.num);
        } else {
            test.RunSyncTest(options.num);
        }
//        console.log(options);
    });

commander.parse(process.argv);
