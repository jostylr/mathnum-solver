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
            max = options.maxIterations || self.maxIterations;
            time = options.time || self.time;
    
        return function (step, start) {
            var current = start, res, temp,
                t,
                ret = [];
    
            while (1) {
    
                t = process.hrtime();
                res = step(current);
                temp = res.time = process.hrtime(t); 
                ret.push(res);
                if  ( (temp[0] > time[0]) || ( (temp[0] === time[0] ) && ( temp[1] > time[1] )  ) ) {
                    res.error = "time per step exceeded";
                    break;
                }
                if ( res.precision.mlt(precision) ) {
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
    };
    
    self.newton = function (f, fd) {
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
        };

    return this;

}

Finder.prototype.precision = -25;
Finder.prototype.maxIterations = 10;
Finder.prototype.time = [1,0];

module.exports = Finder;