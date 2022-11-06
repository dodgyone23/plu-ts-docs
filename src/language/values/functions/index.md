# plu-ts functions

just like any other values also funcitons can be transformed form the typescript world to the `plu-ts` one;

this can be done with two funcitons:

- `plam`
- `pfn`

## `plam`

just like the `lam` type, `plam` only works for funcitions with one input; don't worry, `pfn` is more powerful, but `plam` will help us understand the basics

the `plam` signature is:
```ts
function plam<A extends TermType, B extends TermType >( inputType: A, outputType: B )
    : ( termFunc : ( input: Term<ToPType<A>> ) => Term<ToPType<B>> ) => Term<PLam<ToPType<A>,ToPType<B>>>
```

if it seems familiar its because it works on the same principle of `pList` we saw explaining the [simple values](./pluts_simple_values.md)

`plam` first requires to specifies the `plu-ts` types we are working with and it gives back a function ad-hoc for those types.
```ts
const makeLambdaFromIntToBool: ( tellMeHow: ( int: Term<PInt> ) => Term<PBool> ): Term<PLam<PInt, PBool>> = plam( int, bool )
```
the function we get back expects as input a typescript funcition that describe how to "transform" the input to the output.

Since the `tellMeHow` function should return a Term; we need some way to "build" a new term.

in `plu-ts` you *never* need to write anything like `new Term(...)`; rather you use `plu-ts` functions to build new `plu-ts` terms.

> *Wait what?* Aren't `plu-ts` functions also Terms? How do I build new Terms if I need other Terms to build new Terms?

fortunately for us there are some [builtin functions](../optimizations/builtins.md) that are the foundamentals of the language.
We can use these to describe the body of our lambda
```ts
const pintIsZero = makeLambdaFromIntToBool(
    someInt => peqInt.$( someInt ).$( pInt( 0 ) )
);
```
> **_NOTE_**: is convention to name `plu-ts` functions starting with a lower case "p"; indicating that we are in the `plu-ts` world and not the typescript one

here we used the `peqInt` builtin function; the `$` method is a short form for the [`papp` function](./papp.md) and is how we pass argument to a `plu-ts` function (we'll cover function application in the very next section)

what matters for now is that we succesfully transformed an `int` into a `bool` using only `plu-ts`; and we now have a new function that we can re-use when needed
```ts
pintIsZero.$( pInt(42) ) // this is a Term<PBool> equivalent to `pBool( false )`
```

## `pfn`

now that we know how the `plam` machinery works let's look at the more useful `pfn`

the signature (a bit simplified; this is not typescript) is
```ts
function pfn<InputsTypes extends [ TermType, ...TermType[] ], OutputType extends TermType>( inputsTypes: InputsTypes, outputType: OutputType )
    : ( termFunction: ( ...inptus: PInputs ) => POutput ) => 
        Term<PFn<PInputs, POutput>>
```

and with the excpetion of an array of types as input rather than a single type we see is doing the exact same thing of `plam` but with more inputs

so if we want a function that builds a `plu-ts` level function for us of type `int -> int -> list( int )` we just write
```ts
const makeListFromTwoInts = pfn( [ int, int ], list( int ) );
```

and just like the `plam` case, we use the function we just got to build a `plu-ts` one
```ts
const pTwoIntegersList = makeListFromTwoInts(
    ( int1, int2 ) => pList([ int1, int2 ])
);
```