# Joke Shell
####Jokes reader and tester

    Usage:
    app [options] [command]

    Options:
      -V, --version   output the version number
      -h, --help      display help for command

    Commands:
      run [options]   Run jokes logging
      test [options]  Speed test
      help [command]  display help for command
      
####The program does two things:
#####1. Displays a specified number of jokes at a specified time interval. 

    Usage: app run [options]

    Runs jokes logging

    Options:
      -n, --num <jokesnum>  Number of jokes
      -d, --delay <delay>   Delay between messages (seconds)
      -a, --asyncawait      Promise or AsyncAwait (default: promise)
      -p, --prompt          Prompt for category
      -h, --help            display help for command

#####2. Tests the speed of access to a resource in synchronous and asynchronous versions.

    Usage: app test [options]

    Options:
      -n, --num <jokesnum>  Number of jokes
      -a, --async           Is async test (default: sync)
      -h, --help            display help for command
