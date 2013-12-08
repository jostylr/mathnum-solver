# Newton, etc.

This is the literate program part for doing Newtonesque algorithms.

## Files

*[examples/newton.js](#newton "save: examples|jshint")


## Export


    self.newton = _"newton";

self.sqrt = _"sqrt";

self.root = _"root";

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

    function (f, start, options) {

        _":setup"

        for ( i = 0; i < n; i += 1 ) {
            ret.guesses.push(current);

            fval = f(current);
            ret.f.push(fval);

            der = fd(current);
            ret.fd.push(der);

            if ( der.eq(der.zero()) ) {  //noReciprocal() ) {
                ret.status = "horizontal tangent line";
                return ret;
            }

            next = current.sub( fval.div(der) );

            if ( current.sub(next).abs().mlt(precision)) { // current.distance(next) < precision) {
                console.log(current.sub(next).abs().sci().str("dec:50"));
                ret.status = "found within tolerance";
                console.log(next.str("dec:100"));
                ret.answer = next;
                return ret;
            }
            current = next;
        }

        ret.status = "max iterations exceeded";
        ret.next = next;
        return ret;
    }


## Newton

This is the calculus Newton's method. It takes in a function, its derivative to deliver a "next step" function. Each step requires a value (current guess). 

f is function, fd is derivative, start 

Newton's formula is `next = current - f(current)/f'(current)` coming from `f'(current) ~~ [f(current) - f(root)]/(current - root)`. Sovle for root and we assume f(root) is zero. 

The precision is guessed to be the distance of current and next. 

To use this method, functions should have a method that generates a derivative. 


    function (f, fd) {
        return function (cur) {
            fval = f(current);
            ret.f.push(fval);

            der = fd(current);
            ret.fd.push(der);

            if ( der.eq(der.zero()) ) {  //noReciprocal() ) {
                ret.status = "horizontal tangent line";
                return ret;
            }

            next = current.sub( fval.div(der) );

            if ( current.sub(next).abs().mlt(precision)) { // current.distance(next) < precision) {
                console.log(current.sub(next).abs().sci().str("dec:50"));
                ret.status = "found within tolerance";
                console.log(next.str("dec:100"));
                ret.answer = next;
                return ret;
            }
            current = next;
        }
    }

    
[setup]()

    options = options || {};

    console.log(options.precision);

    var fval, der, next, i,
        current = start,
        precision = Num.int(10).ipow(options.precision || self.precision),
        n = options.maxIterations || self.maxIterations,
        fd = f.derivative(),
        ret = {guesses : [],
            f : [],
            fd : []
        };



[examples](# "js")

We want to have a couple of test examples. This will be fairly basic and boring so as not to rely on the other function libraries.

    /*global require, console*/

    var Num = require('math-numbers');
    var int = Num.int;
    var Finder = require('../index.js');
    var newton = new Finder().newton;
    var f = function (x) {
        return x.mul(x).sub(int(2));
    };
    f.derivative = function () {
        return function (x) {
            return int(2).mul(x);
        };
    };
    var one = newton(f, Num.rat("1 5/6"), {maxIterations:20, precision: -60});


    one.guesses.forEach(function (el) {
        console.log(el.str("dec:100"));
    });

[tests](# "js")

    



## Secant

Use a secant 

## Close Secant

Use numerical derivative instead

## Root

## Sqrt