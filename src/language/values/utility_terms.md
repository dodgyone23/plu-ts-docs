# terms with methods

Like in the case of `papp` that is meant to work with `plu-ts` function as first argument; there are functions that are meant to work with specific types

the functions can of course be used as normal but sometimes some arguments can be made implicit;

as an example the builtin `padd` is meant to work with integers

so it would be great if instead of writing
```ts
padd.$( int1 ).$( int2 )
```
we could make the first argument implicit and just do
```ts
int1.add( int2 )
```
turns out `plu-ts` implements some special terms that are extending the normal `Term` functionalities adding some methods to them.

for most of the types there is a special `Term` type with extended functionalities

normal term                 | term with methods
----------------------------|--------------------
`Term<PUnit>`               |
`Term<PInt>`                | `TermInt`
`Term<PBool>`               | `TermBool`
`Term<PByteString>`         | `TermBS`
`Term<PStr>`                | `TermStr`
`Term<PData>`               |
`Term<PList<PElemsType>>`   | `TermList<PElemsType>`
`Term<PPair<Fst,Snd>>`      |
`Term<PDelayed<PType>>`     |
`Term<PLam<In,Out>>`        |
`Term<PFn<Ins,Out>>`        | `TermFn<Ins,Out>`
`Term<Alias<PType>>`        | depends by `PType`
`Term<PStruct<StructDef>>`  | `TermStruct<StructDef>`

These are callde "**utility terms**" and are covered more in depth in the [standard library section](../../stdlib/utility_terms/index.md); but is good having in mind that these exsists as they makes our life much easier while writing a program.

## I see two properties that look similar, which one should I use?

every _utility term_ exposes two variants for each property it has; one is a plain function and the other (the one that ends with "...Term") that is the `plu-ts` version of it.

Let's take a look at the `TermInt` definition:
```ts
type TermInt = Term<PInt> & {

    readonly addTerm:       TermFn<[PInt], PInt>
    readonly add:           ( other: Term<PInt> ) => TermInt

    readonly subTerm:       TermFn<[PInt], PInt>
    readonly sub:           ( other: Term<PInt> ) => TermInt

    readonly multTerm:      TermFn<[PInt], PInt>
    readonly mult:          ( other: Term<PInt> ) => TermInt

    // 
    // ... lots of other methods
    // 
}
``` 

generally speaking you want to use the ts function version for two reasons:
1) is more readable
2) might produce slightly less code (hence is more efficient)

however the fact that is defined as a function makes it unable to be passed as argument to `plu-ts` higher oreder functions (or a normal ts functions that expects `Term<PLam>` as argument);

in that case you want to use the "...Term" alternative; which is optimized exactly for that.