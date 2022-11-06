# partial function application

When a `plu-ts` function takes more than one argument, like the [`pTwoIntegersList` we built a moment ago](./index.md), it is possible to get new functions from the first by passing only *some* of the parameters.

since the type of `pTwoIntegersList` was something like `int -> int -> list( int )`; `pTwoIntegersList` expects *2* arguments; however if we pass only 1 the result will be a valid term of type `int -> list( int )`; which is an other `plu-ts` function!
```ts
 // this is a Term from PInt to PList<PInt>!
const pListWith42First = pTwoIntegersList.$( pInt(42) );
```

in particular the new function we get behaves just like the first but with the arguments already passed that are fixed and can't be changed

```ts
// equivalent to pTwoIntegersList.$( pInt(42) ).$( pInt( 69 ) )
const niceList = pListWith42First.$( pInt( 69 ) );
```

this not only reduces the number of new functions you need to create but is also *more efficient* than wrapping the first function inside anew lambda

```ts
// THIS IS BAD
const pInefficientListWith42First = plam( int, list( int ) )
    ( int2 =>
        pTwoIntegersList.$( pInt(42) ).$( int2 ) // BAD
    );
```

even if the compiler is smart enough to optimize some trivial cases; is best practice to avoid them