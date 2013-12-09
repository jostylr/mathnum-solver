/*global require, console*/

var Num = require('math-numbers');
var int = Num.int;
var Finder = require('../index.js');
var solver = new Finder();
var algo = solver.rootAlgo();
var algo2 = solver.rootAlgo({maxIterations:20, precision: -60});

var f = function (x) {
    return x.mul(x).sub(int(2));
};
var derivative = function (x) {
        return int(2).mul(x);
};

var sqnewton = solver.newton(f, derivative);

var one = algo2(sqnewton,  Num.rat("10 5/6") );

one.forEach(function (el) {
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