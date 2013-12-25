# Newton, etc.

This is the literate program part for doing Newtonesque algorithms.

## Files

*[examples/root.js](#examples "save: |jshint")


## Export


    self.rootAlgo = _"Algorithm scaffolding";

    self.newton = _"newton";

    self.secant = _"secant";

    self.numNewton = _"Close secant";

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
                    res.last = step.answer(res);
                    break;
                }
                if ( res.precision.mlt(precision) ) {
                    res.answer = step.answer(res);
                    break;
                }

                if ( ret.length >= max ) {
                    res.error = "number of steps exceeded";
                    res.last = step.answer(res);
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

## Answer

This reports the answer. It figures out whether there was an answer or not.

    function (arr) {
        var last = arr[arr.length-1];
        if (last.answer) {
            return last.answer.str("dec:100")+ "\nPrecision: "+ last.precision.str("dec:3");
        } else {
            return last.error + "\n" + last.last.str("dec:100")+ "\nPrecision: "+ last.precision.str("dec:3");
        } 
    }

## Examples

This is a program for the examples. Need some tests too.

    /*global require, console*/

    var Num = require('math-numbers');
    var int = Num.int;
    var Finder = require('../index.js');
    var solver = new Finder();
    var algo = solver.rootAlgo();
    //algo = solver.rootAlgo({maxIterations:20, precision: -60});

var report = _"reporting";

    var answer = _"answer";

    var examples = [_":examples"];

    examples.forEach(function (el) {
        console.log(el.msg);
        var newt = solver.newton(el.f, el.fd);
        console.log("Newton", answer(algo(newt, el.start) ) );
        var numNewton = solver.numNewton(el.f, el.del1, el.del2);
        console.log("Numerical Derivative Newton", answer(algo(numNewton, el.start) ) );
        var secant = solver.secant(el.f);
        console.log("Secant", answer(algo(secant, [el.start, [el.start2, el.f(el.start2)]]) ) );
    });

    var sqrt;

    var two = Num.int(2);
    sqrt = solver.sqrt(two);
    console.log("Sqrt 2, 0.5: ", answer(algo(sqrt, two ) ) );
    sqrt = solver.sqrt(two, Num.rat('1/3'));
    console.log("Sqrt 2, 1/3: ", answer(algo(sqrt, two ) ) );
    sqrt = solver.sqrt(two, Num.rat('499/1000'));
    console.log("Sqrt 2, 499/1000: ", answer(algo(sqrt, two ) ) );

    var root;
    root = solver.root(two, 3);
    console.log("Cube root 2, 2/3: ", answer(algo(root, two ) ) );
    root = solver.root(two, 3, Num.rat('1/2'));
    console.log("Cube root 2, 1/2: ", answer(algo(root, two ) ) );
    root = solver.root(two, 3, Num.rat('6/10') );
    console.log("Cube root 2, .6: ", answer(algo(root, two ) ) );
    root = solver.root(two, 3, Num.rat('9/10') );
    console.log("Cube root 2, .9: ", answer(algo(root, two ) ) );


[examples](# "js")

We want to have a couple of test examples. These will be "poly/rational" so as not to rely on the other function libraries.


    {
        msg: "square root 2",
        f: function (x) {
            return x.mul(x).sub(int(2));
        },
        fd: function (x) {
            return int(2).mul(x);
        },
        del1 : Num.rat("1/100"),
        del2 : Num.rat("-1/100"),
        start: Num.sci("2.25:100"),
        start2: Num.sci("2.15:100")
    }

[ignore]()

    ,
    {
        msg : "sine pi",
        f: function (x) {
            return x.sub(x.ipow(3).div(6)).add(x.ipow(5).div(120)).sub(x.ipow(7).div(5040));
        },
        fd :  function (x) {
        return Num.int(1).sub(x.ipow(2).div(2)).add(x.ipow(4).div(24)).sub(x.ipow(6).div(720));
        },
        del1 : Num.int("1"),
        del2 : Num.int("0"),
        start : Num.rat("3 1/4"),
        start2 : Num.rat("3")
    }
    




## Newton

This is the calculus Newton's method. It takes in a function, its derivative to deliver a "next step" function. Each step requires a value (current guess). 

f is function, fd is derivative, start 

Newton's formula is `next = current - f(current)/f'(current)` coming from `f'(current) ~~ [f(current) - f(root)]/(current - root)`. Sovle for root and we assume f(root) is zero. 

The precision is guessed to be the distance of current and next. 

To use this method, functions should have a method that generates a derivative. 

!! Distance function should be implemented in math num.
!!! Need Infinity and NaN implemented? Maybe just use float? 


    function (f, fd) {
        var ret = function (cur) {
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
        };

        ret.answer = function (res) {
            return res.next;
        };

        return ret;
    }

    



## Secant

Use a secant. This requires two initial points.

carr is the current array of needed values. It is of the form [x2, [x1, f(x1)] ]

    function (f) {
        var ret = function (carr) {
            var x1 = carr[1][0],
                f1 = carr[1][1], 
                x2 = carr[0], 
                f2, x3, slope;

            f2 = f(x2);
            
            slope = f2.sub(f1).div(x2.sub(x1));
            

            if ( slope.eq(slope.zero()) ) {  //noReciprocal() ) {
                x3 = Num.float(Infinity);
            } else {
                x3 = x2.sub( f2.div(slope) );
            }

            return {
                next : [x3, [x2, f2]],
                precision : x3.sub(x2).abs()
            };
        };

        ret.answer = function (res) {
            return res.next[0];
        };

        return ret;
    }



## Close Secant

Use numerical derivative instead. del1 and del2 are the multiplicative factors that will use the current precision levels in determining how close the points should be. initpre gives an initial precision, necessary since we scale the difference deltas. 

    function (f, del1, del2, initpre) {
        if (typeof del1 === "undefined") {
            del1 = Num.rat("1/10");
        }
        if (typeof del2 === "undefined") {
            del2 = Num.rat("-1/10");
        }
        if (typeof initpre === "undefined") {
            initpre = Num.int("1");
        }

        var ret = function (cur, ret) {
            var fval, der, next, pre, h1, h2, f1, f2;

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
        };

        ret.answer = function (res) {
            return res.next;
        };

        return ret;

    }


## Sqrt

We implement the square root finding algorithm of classic yore. Given a guess x and a number M whose square root R we want, then y = M/x  is its partner. Notice this is symmetric and that if  x > y > 0,  then x > R > y since  x*y = M = R^2 leading to  x*x > x*y = M > y*y  and so  x > M > y. This also means that x-y really is a bound on the error. 

The algorithm is   (x+y)/2 for the next guess. Seems natural. We, of course, will have a parameter c such that  c*x + (1-c) * y is the next guess. 

    function (M, c) {
        var sci1 = Num.sci(1);
        if (typeof c === "undefined") {
            c = Num.rat("1/2");
        }
        var d = Num.int(1).sub(c);
        var ret = function (x) {

            var y = M.div(x);

            var next =  c.mul(x).add(d.mul(y));

            return {
                x : x,
                y : y,
                next : next,
                precision : x.sub(y).abs().mul(sci1)
            };
        };

        ret.answer = function (res) {
            return res.next;
        };

        return ret;
    }


## Root

We implement finding n-th roots. The idea is that if x is our guess, n is the power, and M is the target so that x^n = M is our goal,  then  we define y =  M/x^(n-1) as the partner to x. Note x^(n-1)*y = M by our choice so that if y is close to x, then x is approximately the nth root of M.  

While we could get an iteration by defining a sequence of y's, it would most likely diverge. 

Assume  x > y > 0.  Then multiply by x^(n-1) to get x^n > M = R^n and so x > R. As for R > y, R^n = x^(n-1)*y > y^n.  So R > y.  Thus  x-y is again a level of the precision. 

Calculus tells us that  c*x + d*y  where c+d = 1 and d = 1/n  (so  c = (n-1)/n  ) is the right mix to get great convergence. We do a similar story to the square root, except we also pass in the n. 

    function (M, n, c) {
        var sci1 = Num.sci(1), 
            d, pow;
        if (typeof n === "number") {
            n = Num.int(n);
        }
        pow = n.sub(Num.int(1));
        if (typeof c === "undefined") {
            d = n.inv();
            c = Num.int(1).sub(d);
        } else { 
            d = Num.int(1).sub(c);
        }

        var ret = function (x) {

            var y = M.div(x.ipow(pow));

            var next =  c.mul(x).add(d.mul(y));

            return {
                x : x,
                y : y,
                next : next,
                precision : x.sub(y).abs().mul(sci1)
            };
        };

        ret.answer = function (res) {
            return res.next;
        };

        return ret;
    }



## Matrixify

!!! No longer used.

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
