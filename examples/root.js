/*global require, console*/

var Num = require('math-numbers');
var int = Num.int;
var Finder = require('../index.js');
var solver = new Finder();
var algo = solver.rootAlgo();
var algo2 = solver.rootAlgo({maxIterations:20, precision: -60});

var report = function (arr) {
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
    };

var newtexamples = [
    [
    "square root 2",
    function (x) {
        return x.mul(x).sub(int(2));
    },
    function (x) {
        return int(2).mul(x);
    },
    Num.sci("2.25:100")
    ],
    [
    "sine pi",
    function (x) {
        return x.sub(x.ipow(3).div(6)).add(x.ipow(5).div(120)).sub(x.ipow(7).div(5040));
    },
    function (x) {
        return Num.int(1).sub(x.ipow(2).div(2)).add(x.ipow(4).div(24)).sub(x.ipow(6).div(720));
    },
    Num.rat("3 1/4")
    ]
    ];

newtexamples.forEach(function (el) {
    var newt = solver.newton(el[1], el[2]);
    console.log("Newton", el[0]);
    var res1 = algo(newt, el[3]);
    report(res1);
});