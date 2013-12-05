# Solver

This is a set of tools for [Math-Numbers](https://github.com/jostylr/math-numbers) which implements solving equations, in some form or another. 

## Bisection

This is the bisection method of an interval, more or less. One can cut it up into a grid and then have a comparator function. 

* bisect(f, options)
* grid(f, options)

Amont the options is the comparator function. It should take in two values and give out which pair is more likely to contain a root.  

## Newton's Method

This is a plugin to Math-Numbers that implements Newton's method and related algorithms:

* newton(f, start, options) This does the classic Newton's method starting with start.
* numNewton(f, start, options)  This does a numerical derivative (evaluates f twice near the guess)
* secant(f, start1, start2, options) This uses the previous guess and current to get the slope to use.
* sqrt(target, options) This computes square roots by the Babylonian method, averaging the guess and target/guess together.
* root(target, options) This can deal with arbitrary n-th root (integer) 
* pow(n, options)  This deals with raising the function to any rational power using these techniques. Probably horrendously slow compared with log/exp

The options   

## Systems

We will also put in here some system solution methods, both linear and then Newtonizing other systems.