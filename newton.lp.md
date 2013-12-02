# Newton, etc.

This is the literate program part for doing Newtonesque algorithms. 

## Export


    self.newton = _"newton";

self.sqrt = _"sqrt";

self.root = _"root";

## Readme

    
    ## Newton's Method

    This is a plugin to Math-Numbers that implements Newton's method and related algorithms:

    * newton(f, options) This does the classic Newton
    * numNewton(f, options)  This does a numerical derivative (evaluates f twice near the guess)
    * secant(f, options) This uses the previous guess and current to get the slope to use.
    * sqrt(target, options) This computes square roots by the Babylonian method, averaging the guess and target/guess together.
    * root(target, options) This can deal with arbitrary n-th root (integer) 
    * pow(n, options)  This deals with raising the function to any rational power using these techniques. Probably horrendously slow compared with log/exp

    The options 


## Newton

This is the calculus Newton's method. It takes in a function, its derivative, starting value, precision, max iterations, bounds.  Not all are necessary. 

f is function, fd is derivative, start 

Newton's formula is `next = current - f(current)/f'(current)` coming from `f'(current) ~~ [f(current) - f(root)]/(current - root)`. Sovle for root and we assume f(root) is zero. 

The precision is guessed to be the distance of current and next. 

    function (f, fd, start, options) {

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

    }

## Secant

Use a secant 

## Close Secant

Use numerical derivative instead

## Root

## Sqrt