# Newton, etc.

This is the literate program part for doing Newtonesque algorithms.

## Files

*[examples/root.js](#examples "save: |jshint")


## Export

    self.rootAlgo = _"Algorithm scaffolding";

    self.newton = _"newton";



## Readme

    
    ## Newton's Method

    This is a plugin to Math-Numbers that implements Newton's method and related algorithms:

    * newton(f, start, options) This does the classic Newton's method starting with start.
    * numNewton(f, start, options)  This does a numerical derivative (evaluates f twice near the guess)
    * secant(f, start1, start2, options) This uses the previous guess and current to get the slope to use.
    * sqrt(target, options) This computes square roots by the Babylonian method, averaging the guess and target/guess together.
    * root(target, options) This can deal with arbitrary n-th root (integer) 
    * pow(n, options)  This deals with raising the function to any rational power using these techniques. Probably horrendously slow compared with log/exp

    The options 

## Algorithm scaffolding

This is the loop part of the algorithms. 

It is a factory function that will accept options to set the control of the algorithm flow. It should return a function that takes in a "next step" function and a start value. The returned function will iterate through until a stopping condition is met. If that condition is not conclusive, then an error property is set on the last object. Otherwise, it is a success and has the answer as a property.

By slipping in a {debug:function(res)}, one can inspect the process in the middle and also mutate it somewhat if desired. 

    function (options) {

        options = options || {};

        var precision = Num.int(10).ipow(options.precision || self.precision),
            max = options.maxIterations || self.maxIterations,
            time = options.time || self.time,
            debug = options.debug || self.debug;

        return function (step, start) {
            var current = start, res, temp,
                t,
                ret = [];

            while (1) {

                t = process.hrtime();
                res = step(current, ret);
                temp = res.time = process.hrtime(t); 
                ret.push(res);
                debug(res, ret);
                if  ( (temp[0] > time[0]) || ( (temp[0] === time[0] ) && ( temp[1] > time[1] )  ) ) {
                    res.error = "time per step exceeded";
                    break;
                }
                if ( res.precision.mlt(precision) ) {
                    res.answer = res.next;
                    break;
                }

                if ( ret.length >= max ) {
                    res.error = "number of steps exceeded";
                    break;
                }
                current = res.next;

            }

            return ret;
        };
    }

## Reporting

    function (arr) {
        arr.forEach(function (el) {
            var key, temp;
            for (key in el) {
                temp = el[key];
                if (temp instanceof Num) {
                    console.log(key, temp.str("dec:100") ) ;
                } else {
                    console.log(key, temp);
                }
            }
        });
    }


## Examples

    /*global require, console*/

    var Num = require('math-numbers');
    var int = Num.int;
    var Finder = require('../index.js');
    var solver = new Finder();
    var algo = solver.rootAlgo();
    var algo2 = solver.rootAlgo({maxIterations:20, precision: -60});

    var report = _"reporting";

    var examples = _":examples | matrixify";



    newtexamples.forEach(function (el) {
        var newt = solver.newton(el[1], el[2]);
        console.log("Newton", el[0]);
        var res1 = algo(newt, el[3]);
        report(res1);
var res2 = algo2(newt, el[3]);
report(res2);
    });


[examples](# "js")

We want to have a couple of test examples. These will be "poly/rational" so as not to rely on the other function libraries.


    "square root 2"

    f: function (x) {
        return x.mul(x).sub(int(2));
    }
    
    fd: function (x) {
        return int(2).mul(x);
    }
    
    start: Num.sci("2.25:100")
    ---
    "sine pi"

    function (x) {
        return x.sub(x.ipow(3).div(6)).add(x.ipow(5).div(120)).sub(x.ipow(7).div(5040));
    }

    function (x) {
        return Num.int(1).sub(x.ipow(2).div(2)).add(x.ipow(4).div(24)).sub(x.ipow(6).div(720));
    }

    Num.rat("3 1/4")
    




## Newton

This is the calculus Newton's method. It takes in a function, its derivative to deliver a "next step" function. Each step requires a value (current guess). 

f is function, fd is derivative, start 

Newton's formula is `next = current - f(current)/f'(current)` coming from `f'(current) ~~ [f(current) - f(root)]/(current - root)`. Sovle for root and we assume f(root) is zero. 

The precision is guessed to be the distance of current and next. 

To use this method, functions should have a method that generates a derivative. 

!! Distance function should be implemented in math num.
!!! Need Infinity and NaN implemented? Maybe just use float? 


    function (f, fd) {
        return function (cur) {
            var fval, der, next;

            fval = f(cur);
            der = fd(cur);
            

            if ( der.eq(der.zero()) ) {  //noReciprocal() ) {
                next = Num.float(Infinity);
            } else {
                next = cur.sub( fval.div(der) );
            }

            return {
                next : next,
                f : fval,
                fd : der,
                precision : cur.sub(next).abs()
            };
        }
    }

    



## Secant

Use a secant 

## Close Secant

Use numerical derivative instead. So we add cur+del1

    function (f, del1, del2) {
        if (typeof del1 === "undefined") {
            del1 = Num.rat("1/10");
        }
        if (typeof del1 === "undefined") {
            del2 = Num.rat("-1/10");
        }
        return function (cur, ret) {
            var fval, der, next, pre, h1, h2;

            if (ret.length) {
                pre = ret[ret.length-1].precision;
                h1 = cur.add(pre.mul(del1));
                h2 = cur.add(pre.mul(del2));
            } else {
                h1 = cur.add(del1);
                h2 = cur.add(del2);
            }

            fval = f(cur);

            f1 = f(h1);
            f2 = f(h2);
            
            der = f1.sub(f2).div(h1.sub(h2));

            if ( der.eq(der.zero()) ) {  //noReciprocal() ) {
                next = Num.float(Infinity);
            } else {
                next = cur.sub( fval.div(der) );
            }

            return {
                next : next,
                f : fval,
                fd : der,
                precision : cur.sub(next).abs()
            };
        }
    }


## Root

## Sqrt

## Matrixify

We define a command that takes a list of items separated by returns and makes an array out of them. The strings are trimmed and empty lines are ignored. This should allow for some whitespace formatting. 

    function (code) {
        var outer = code.split("\n---\n");
        if (outer[outer.length -1].trim() === "") { // in case sep1 at end
            outer.pop();
        }
        var mat = outer.map(function (el) {
            return el.trim().split(/\n\n+/);
        });

        return '[\n' + 
            mat.map(function (out) {
                return '[\n' + out.join(',\n') + '\n]';
            }).join(',\n') + 
        '\n]';
    }

[matrixify](#matrixify "define: command | | now")
