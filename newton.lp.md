# [mathnum-newton](# "version: 0.0.1 | jostylr")

This is for basic project files such as README, npm management, etc. plus Newton itself

## Files

* [install.js](#main "save: | jshint")
* [ghpages/index.html](#homepage "save:")
* [index.js](#newton "save: | jshint")
* [README.md](#readme "save:| clean raw") The standard README.
* [package.json](#npm-package "save: json  | jshint") The requisite package file for a npm project. 
* [TODO.md](#todo "save: | clean raw") A list of growing and shrinking items todo.
* [LICENSE](#license-mit "save: | clean raw") The MIT license.
* [.travis.yml](#travis "save:") A .travis.yml file for [Travis CI](https://travis-ci.org/)
* [.gitignore](#gitignore "Save:") A .gitignore file
* [.npmignore](#npmignore "Save:") A .npmignore file


## Main

So this is the actual file for the export of the Newton method and methods.

    var exports = module.exports;

    var Finder = module.Finder = function (options) {
        var self = this;
        var precision = options.precision || -25;
        var maxIterations = options.maxIterations || 10;
        var guess = function () 

        self.newton = _"newton";

        self.sqrt = _"sqrt";

        self.root = _"root";

        return this;

    }


    var f = new Finder({

    });

    module.exports = f;

## Newton

This is the calculus Newton's method. It takes in a function, its derivative, starting value, precision, max iterations, bounds.  Not all are necessary. 

f is function, fd is derivative, start 

Newton's formula is `next = current - f(current)/f'(current)` coming from `f'(current) ~~ [f(current) - f(root)]/(current - root)`. Sovle for root and we assume f(root) is zero. 

The precision is guessed to be the distance of current and next. 

    function (f, fd, start, options) {

        ret = {guesses : [],
            f : [],
            fd : []
        }



        for ( i = 0; i < n; i += 1 ) {

            der = fd(current);
            ret.fd.push(der);
            if ( fd.current.noReciprocal() ) {
                return {status: "failed", ;
            }
            next = current.sub( f(current).div(der) );

            if (

        }

    }

## Secant

## Close Secant

## homepage

This is the main welcome page for math pebbles

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Math Pebbles</title>
            <link rel="stylesheet" href="bootstrap.css">
        </head>
        <body>
        _":body | marked"

        </body>
    </html>

[body]()

  just some stuff in markdown.

## README

 # Newton's Method

This is a plugin to Math-Numbers that implements Newton's method and related algorithms.

To use, ??

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
        "browserify" : "=2.35.4"
      },
      "peerDependencies":{  
        "math-numbers" : ">=0.0.5"
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
