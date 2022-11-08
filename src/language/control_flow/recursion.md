# recursion

The other thing we are missing to have a proper language is some way to repeat the execution som code.

The functional paradigm doesn't really like things like the loops we have in typescript but that is not a big deal, because instead it likes a lot the functions, and functions can be made recursive.

> _Wait a second!_ 
>
> Don't we need to reference the same function we are defining in order to make it recursive?
>
> How do we do that if we need what we are defining while defining it?

Turns out someone else already came up with a solution for that so that we don't have to.

That solution is the **Y combinator** (actually we'll use the _Z combinator_ but whatever)

> We'll not go in the details on how it works, but if you are a curious one here's a great article that explains the [Y combinator in javascript terms](https://medium.com/swlh/y-and-z-combinators-in-javascript-lambda-calculus-with-real-code-31f25be934ec)

All you need to know is that it allows functions to have themselves as parameters, and this solves everything!

In `plu-ts` there is a special typescript function that makes `plu-ts` functions recursive, and its named, you guessed it, `precursive`.

All `precursive` requires to make a `plu-ts` function recursive is that as first parameter it can pass the function, and then we can do whatever we want with it.

So let's try to define a `plu-ts` function that caluclates the factorial of a positive number

```ts
const pfactorial = precursive(
    pfn([
        // remember that the first argument is the function itself?
        // for this reason as first type we specify
        // what will be the final type of the function
        // because what we have here IS the function
        lam( int, int ),
        int
    ],  int)
    (( self, n ) =>
        pif( int ).$(
            // here `n` is of type `TermInt`;
            // which is the utility term for integers
            // the `ltEq` property stands for the `<=` ts operator
            n.ltEq( pInt(1) )
        )
        .then( pInt(1) )
        .else(
            // n * pfactorial.$( n - 1 )
            n.mult(
                papp(
                    self,
                    n.sub( pInt(1) )
                )
            )
        )
    )
)
```

now we can use `pfactorial` just like a normal function; this is because `precursive` takes care of passing the first argument, so that the actual type of `pfactorial` is just `lam( int, int )`

the next step is learn to [evaluate expressions](../evalScript.md) so that we can be sure that `pfactorial` is working as we expect