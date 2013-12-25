/*global require, process, module*/

var Num = require('math-numbers');

var Finder = function (options) {
    options = options || {};
    var self = this;
    var option;

    for (option in options) {
        self[option] = options[option];
    }

    self.rootAlgo = function (options) {
    
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
    };
    
    self.newton = function (f, fd) {
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
        };
    
    self.secant = function (f) {
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
        };
    
    self.numNewton = function (f, del1, del2, initpre) {
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
        
        };
    
    self.sqrt = function (M, c) {
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
        };
    
    self.root = function (M, n, c) {
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
        };

    return this;

};

Finder.prototype.precision = -25;
Finder.prototype.maxIterations = 10;
Finder.prototype.time = [1,0];
Finder.prototype.debug = function () {};

module.exports = Finder;