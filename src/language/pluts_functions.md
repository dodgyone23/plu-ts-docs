# plu-ts functions

just like any other values also funcitons can be transformed form the typescript world to the `plu-ts` one;

this can be done with two funcitons:

- `plam`
- `pfn`

## `plam`

just like the `lam` type, `plam` only works for funcitions with one input; donworry, `pfn` is more powerful, but `plam` will help us understand the basics

the `plam` signature is:
```ts
function plam<A extends TermType, B extends TermType >( inputType: A, outputType: B )
    : ( termFunc : ( input: Term<ToPType<A>> ) => Term<ToPType<B>> ) => Term<PLam<ToPType<A>,ToPType<B>>>
```

if it seems familiar its because it works on the same principle of `pList` we saw explaining the [simple values](./pluts_simple_values.md)

`plam` first requires to specifies the `plu-ts` types we are working with and it gives back a function ad-hoc for those types.

the function we get back gets as input a typescript funcition that tells us how to "transform" some term of type A to a term of type B; and `plam` takes care of translating that in `plu-ts` language.

## `pfn`

now that we know how the machinery works lets just look at the more useful `pfn`

the signature (a bit simplified; this is not typescript) is
```ts
function pfn<InputsTypes extends [ TermType, ...TermType[] ], OutputType extends TermType>( inputsTypes: InputsTypes, outputType: OutputType )
    : ( termFunction: ( ...inptus: PInputs ) => POutput ) => 
        Term<PFn<PInputs, POutput>>
```

and with the excpetion of an array of types as input rather than a single type we see is doing the exact same thing of `plam` but with more things

```