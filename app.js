#!/usr/bin/env node

const commander = require('commander'),
    { prompt } = require('inquirer'),
    chalk = require('chalk'),
    fs = require('fs'),
    joke = require('./joke')

commander
    .version('1.0.0')
    .description('Jokes reader')

commander
    .command('hi <myjoke>')
    .option('-j <joke>', 'My joke')
    // .alias('c')
    // .description('say Hello, world!')
    .action((myjoke,cmd) => {

        prompt([
            {
                type: 'input',
                name: 'joke',
                message: 'New joke: ',
            },
        ]).then((options) => {
            console.log(options)
            console.log(options.joke + ':::'+joke.joke)
        }).then (() => {
            console.log('Hello, world!' + myjoke);
            console.log(chalk.red('Hello, world!' + myjoke + cmd.joke));

        })

    })

commander.parse(process.argv)
