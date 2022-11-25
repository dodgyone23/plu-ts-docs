# if then else

As a solution to _condtitional code execution_ `plu-ts` exposes an _if then else_ construct.

However, since everything in `plu-ts` is an expression, the _if then else_ construct does not allow stuff that in typescript would have been written as
```ts
if( my_condition )
{
    doSomething();
}
```
because we don't really know what to do if the condtion is false.

So the _if then else_ we have in `plu-ts` is more similar to the typescript ` ? : ` ternary operator, so at the end of the day, _if then else_ is just a function.

Let's look at a simple _if then else_ construct:
```ts
pif( int ).$( pBool( true ) )
.then( pInt(42) )
.else( pInt(69) )
```

This `plu-ts` expression checks the condition (`pBool(true)`) and if it is a `Term<Bool>` equivalent to `true` it returns `pInt(42)` otherwhise it returns `pInt(69)`.

### Why `pif` is a typescript function and not a constant like other `plu-ts` funcitons?

Since the type of _if then else_ is something like `bool -> a -> a -> a`, we need to specify the type of `a` _prior_ to the actual expression.

This ensures _type safety_ so that Typescript can warn you if one of the results is not of the type you expect it to be.

## What happens if one of the two branches raises an error?

`plu-ts` is a _strict language_ as we saw while having a look at [`papp`](../values/functions/papp.md); that means that arguments are evaluated _prior_ being passed to a function.

**what happens if one of the argument returns an error?**

The answer is _what you expect to happen_. Or, to be more precise, if the error rose in the branch selected by the boolean, the computation results in an error; if not it returns the result.

This is because even if by default functions are strict, `pif` is _lazy_; meaning that it evaluates only the argument it needs and not the others.

This is done using [`pforce` and `pdelay`](../../optimizations/pfroce_and_pdelay.md) so the compiled funcion is a bit larger than the one you'd expect.

> if you don't need _lazyness_ you can use the `pstrictIf` function that emits slightly less code but evaluates both the arguments.
> 
> so something like
> ```ts
> pstrictIf( int ).$( pBool( true ) )
> .$( pInt(42) )
> .$( pInt(69) )
> ```
> is just fine but something like
> ```ts
> // this results in an error, even if the conditional is true
> pstrictIf( int ).$( pBool( true ) )
> .then( pInt(42) )
> .else( perror( int ) ) // KABOOM
> ```
> generally speaking you should always prefer the plain `pif`