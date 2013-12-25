/*global require, console*/

var Num = require('math-numbers');
var int = Num.int;
var Finder = require('../index.js');
var solver = new Finder();
var algo = solver.rootAlgo();
//algo = solver.rootAlgo({maxIterations:20, precision: -60});

var answer = function (arr) {
        var last = arr[arr.length-1];
        if (last.answer) {
            return last.answer.str("dec:100")+ "\nPrecision: "+ last.precision.str("dec:3");
        } else {
            return last.error + "\n" + last.last.str("dec:100")+ "\nPrecision: "+ last.precision.str("dec:3");
        } 
    };

var examples = [{
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
    },
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
    }];

examples.forEach(function (el) {
    console.log(el.msg);
    var newt = solver.newton(el.f, el.fd);
    console.log("Newton", answer(algo(newt, el.start) ) );
    var numNewton = solver.numNewton(el.f, el.del1, el.del2);
    console.log("Numerical Derivative Newton", answer(algo(numNewton, el.start) ) );
    var secant = solver.secant(el.f);
    console.log("Secant", answer(algo(secant, [el.start, [el.start2, el.f(el.start2)]]) ) );
});