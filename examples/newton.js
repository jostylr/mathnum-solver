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
var one = newton(f, Num.rat("1 5/6"), {maxIterations:20, precision: -140});

one.guesses.forEach(function (el) {
    console.log(el.str("dec:100"));
});