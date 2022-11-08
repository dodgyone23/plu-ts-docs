# pforce and pdelay

`plet` and `phoist` are the two main tool to use when focusing on optimizations; that is because they significantly reduce both script size and cost of execution.

Now we see `pforce` and `pdelay` which do increase slightly the size of a script but when used properly they can save you quite a bit on execution costs.

As we know `plu-ts` is strictly evaluated; meaning that the arguments are evaluated before being passed to a function.

We can opt out this behaviour using `pdelay`; which wraps a term of any type in a `delayed` type; so a term of type `int` becomes `delayed( int )` if passed to `pdelay`; a `delayed` type can be unwrapped only using `pforce`; that finally executes the term.

there are two main reasons on why we would want to do that:

- delaying the execution of some term we might not need at all
- prevent to raise unwanted [errors](../language/errors.md)

one example of use of `pforce` and `pdelay` is the `pif` function.

Infact the base if then else function is `pstrictIf`; however when we use an _if then else_ statement we only need one of the two arguments to be actually evaluated.

so when we call `pif` is just like we where doing something like:
```ts
pforce(
    pstrictIf( delayed( returnType ) )
    .$( myCondtion )
    .$(
        pdelay( caseTrue )
    )
    .$(
        pdelay( caseFalse )
    )
)
```

so that we only evaluate what we need.

not only that; if one of the two branches throws an error but we don't need it everything goes trough smootly
```ts
pforce(
    pstrictIf( delayed( int ) )
    .$( pBool( true ) )
    .$(
        pdelay( pInt( 42 ) )
    )
    .$(
        pdelay( perror( int ) )
    )
)
```
everything is ok; if instead we just used the plain `pstrictIf`
```ts
    pstrictIf( int )
    .$( pBool( true ) )
    .$( pInt( 42 ) )
    .$( perror( int ) ) // KABOOM !!!
```
this would have resulted in an error, because the error is evaluated _before_ being passed as argument