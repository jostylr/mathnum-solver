var exports = module.exports;

var Finder = module.Finder = function (options) {
    var self = this;
    var precision = options.precision || -25;
    var maxIterations = options.maxIterations || 10;

    self.newton = function (f, fd, start, options) {
    
        ret = {guesses : [],
            f : [],
            fd : []
        }
    
        for ( i = 0; i < n; i += 1 ) {
    
            der = fd(current);
            ret.fd.push(der);
            if ( fd.current.noReciprocal() ) {
                return {status: "failed", ;
            }
            next = current.sub( f(current).div(der) );
    
            if (
    
        }
    
    };

    return this;

}

var f = new Finder({

});

module.exports = f;