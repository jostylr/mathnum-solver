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