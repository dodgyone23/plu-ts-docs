# Types

## Typescript Types
- `Term` is a Typescript type defined in `plu-ts`. 
- Every value in `plu-ts` is a `Term`. In Typescript, we say each value *extends* Term (in the same way that "Dog" extends "Mammal").
- A `Term` also keeps track of the type of the value it holds. 

The possible types a `Term` can keep track of are defined in [PTypes](https://github.com/HarmonicLabs/plu-ts/tree/main/src/onchain/pluts/PTypes), and listed here:

- `PUnit` an unique value that has no real meaning; you can see it as `plu-ts` version of `undefined` or `null` in Typescript
- `PInt` a singed integer as big as you want
- `PBool` a boolean value
- `PByteString` equivalent of a `Buffer` or an [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
- `PString` equivalent of the Typescript `string`
- `PData` equivalent of the `object` type in Typescript (is the low level representation of `PStruct`s that we'll cover in a moment, so you usually won't use `PData`)
- `PList<PType>` equivalent of an Array in Typescript; note that all the elements in the list must be of the same `PType`
- `PPair<PType1, PType2>` equivalent of a Typescript tuple (`[ type1 , type2 ]`)
- `PDelayed<PType>` a delayed computation that returns a value of type `PType`, the computation can be run by passing the delayed value to the `pforce` function
- `PLam<PInput, POutput>` a function that takes one single argument of type `PInput` and returns something of type `POutput`
- `PFn<[ PInput_0 , ...PType[] ],POutput>` a function that takes multiples arguments (at least one) and returns something of type `POutput`
- `PAlias<PType>` just an alias of the provided type; it behaves exactly like the Types of its argument, so `PAlias<PInt>` is equivalent to a `PInt`. This is useful for keeping track of a different meaning the type might have.
- `PStruct<{...}>` an abstraction over `PData`, useful to construct more complex data structures.

## `plu-ts` Types

`plu-ts` would not be a strongly typed language if limited to Typescript types, because the types of Typescript are only useful during compilation to javascript; and then everything is untyped!

## Important Note:
Typescript can be compiled to Javascript. When this happens, the resulting Javascript is untyped!

## Therefore:
For this reason `plu-ts` implements its own type through some constants and functions can be imported.

In the same order of above, the `plu-ts` equivalents are:

- `PUnit` -> `unit`
- `PInt` -> `int`
- `PBool` -> `bool`
- `PByteString` -> `bs`
- `PString` -> `str`
- `PData` -> `data`
- `PList` -> `list( type )`
- `PPair` -> `pair( type1, type2 )`
- `PDelayed` -> `delayed( type )`
- `PLam` -> `lam( from, to )`
- `PFn` -> `fn([ ...inputs ], output )`
- aliases types and structs types will be retreived by the `type` static property of the classes (explained in the dedicated section for [aliases](./aliases.md) and [structs](./structs.md))