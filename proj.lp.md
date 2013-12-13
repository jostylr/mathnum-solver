# [mathnum-solver](# "version: 0.0.1 | jostylr")

This is for basic project files such as README, npm management, etc.

The idea for algorithms is to have a set of functions that do the next step and then maybe a wrapping around that for a typical case. But the idea is to allow for various ways to interact with the algorithm, such as recording each step, showing progress, deciding what conditions lead to stopping, monitor length of time of a step to switch formats, etc. 

Each of the different steps should try to produce as much of the same output as possible to facilitate have the same scaffolding for the different algorithms. In fact, we can have a factory setup to produce the "next step" of the alogrithm fixing the various bits that are not going to change. 

## Files

Loading: 

* [newton](# "load : newton.lp.md")


Saving: 

* [install.js](#install "save: | jshint")
* [ghpages/index.html](#homepage "save:")
* [index.js](#main "save: | jshint")
* [README.md](#readme "save:") The standard README.
* [package.json](#npm-package "save: json  | jshint") The requisite package file for a npm project. 
* [TODO.md](#todo "save: | clean raw") A list of growing and shrinking items todo.
* [LICENSE](#license-mit "save: | clean raw") The MIT license.
* [.travis.yml](#travis "save:") A .travis.yml file for [Travis CI](https://travis-ci.org/)
* [.gitignore](#gitignore "Save:") A .gitignore file
* [.npmignore](#npmignore "Save:") A .npmignore file


## Main

So this is the actual file for the export of the Newton method and methods.


    var Num = require('math-numbers');

    var Finder = function (options) {
        options = options || {};
        var self = this;
        var option;

        for (option in options) {
            self[option] = options[option];
        }

        _"newton::export"

        return this;

    }

    Finder.prototype.precision = -25;
    Finder.prototype.maxIterations = 10;
    Finder.prototype.time = [1,0];
    Finder.prototype.debug = function () {};


    module.exports = Finder;


## homepage

This is the main welcome page for math pebbles

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Math Pebbles -- Solver</title>
            <link rel="stylesheet" href="bootstrap.css">
        </head>
        <body>
        _":body | marked"

        </body>
    </html>

[body]()

    This is a plugin for math-numbers that solves stuff. Starting out with Newton and its ilk...

## README


    # Solver

    This is a set of tools for [Math-Numbers](https://github.com/jostylr/math-numbers) which implements solving equations, in some form or another. 

    ## Bisection

    This is the bisection method of an interval, more or less. One can cut it up into a grid and then have a comparator function. 

    * bisect(f, options)
    * grid(f, options)

    Amont the options is the comparator function. It should take in two values and give out which pair is more likely to contain a root.  


    _"newton::readme"  

    ## Systems

    We will also put in here some system solution methods, both linear and then Newtonizing other systems. 



## TODO

Lots.

## Install

This is a little node script to run after the install command is used. Currently it copies math-numbers index.js to ghpages/mathnum.js

    /*global require*/
    var spawn = require('child_process').spawn;

    spawn('cp', ["node_modules/math-numbers/index.js", "ghpages/mathnum.js"]);

## NPM package

The requisite npm package file. Use `npm run-script compile` to compile the literate program.

[](# "json") 

    {
      "name": "DOCNAME",
      "description": "Another mathnum package",
      "version": "DOCVERSION",
      "homepage": "https://github.com/GHUSER/DOCNAME",
      "author": {
        "name": "James Taylor",
        "email": "GHUSER@gmail.com"
      },
      "repository": {
        "type": "git",
        "url": "git://github.com/GHUSER/DOCNAME.git"
      },
      "bugs": {
        "url": "https://github.com/GHUSER/DOCNAME/issues"
      },
      "licenses": [
        {
          "type": "MIT",
          "url": "https://github.com/GHUSER/DOCNAME/blob/master/LICENSE-MIT"
        }
      ],
      "main": "index.js",
      "engines": {
        "node": ">10.0"
      },
      "devDependencies" : {
        "literate-programming" : "~0.7.5",
        "tape" : "=2.3.0",
        "browserify" : "=2.35.4",
        "math-numbers" : ">=0.0.8"
      },
      "peerDependencies":{  
        "math-numbers" : ">=0.0.8"
      },
      "dependencies" : {
      },
      "scripts" : { 
        "test" : "node ./test/testrunner.js | grep -v -e ^ok",
        "install": "node install.js"
      },
      "private" : true, 
      "testling": {
            "files": "test/*.js",
            "browsers": {
              "ie": [ 9, 10 ],
              "firefox": [ 25, "nightly" ],
              "chrome": [ 31, "canary" ],
              "safari": [ 5.1]
            }
        }
    }

## gitignore

We should ignore node_modules (particularly the dev ones) and ghpages which is just a directory where I have the gh-pages branch repo. 

    node_modules
    ghpages

## npmignore

We should ignore test, examples, and .md files

    test
    examples
    ghpages
    *.md

## Travis

A travis.yml file for continuous test integration!

    language: node_js
    node_js:
      - "0.10"

## LICENSE MIT


The MIT License (MIT)
Copyright (c) 2013 James Taylor

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
