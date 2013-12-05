var Num = require('math-numbers');

var Finder = function (options) {
    options = options || {};
    var self = this;

    if (options.precision) {
        self.precision = options.precision;
    }
    if (options.maxIterations) {
        self.precision = options.maxIterations;
    }

    self.newton = function (f, start, options) {
    
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
    };

    return this;

}

Finder.prototype.precision = -25;
Finder.prototype.maxIterations = 10;

module.exports = Finder;