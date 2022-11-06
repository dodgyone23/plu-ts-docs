# terms with methods

Like in the case of `papp` there are functions that are meant to work with specific types

the functions can of course be used as normal but sometimes some argument can be made implicit;

as an example the builtin `padd` is meant to work with integers

so it would be great if instead of writing
```ts
padd.$( int1 ).$( int2 )
```
we could make the first argument implicit and just do
```ts
int1.add.$( int2 )
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

> ## _Why methods are defined as properties and not as functions?_
> 
> each of the utility term above adds some `plu-ts` functions to the term
> 
> this is done to laverage [partial applicaiton](./functions/partial_application.md) and ultimately generate more efficient contracts
> 
> to be clear, it is perfectly possible to add the methods as typescript-level function so that something like the following is valid
> ```ts
> termInt.add( otherInt )
> ```
> and even if it is more readable it has two considerable drawbacks
> 
> 1) the genreated `plu-ts` code is slightly less efficient
> 2) the term cannot be passed to higher order `plu-ts` level funtions
> 
> so, in order to incentive the developer to write efficient smart contracts, all you have to add is just a "`.$`", like that
> ```ts
> termInt.add.$( otherInt )
> ```