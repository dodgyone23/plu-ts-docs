# plu-ts values

As said in [eDSL concepts](./eDSL_concepts.md) it is always possible to transform a typescript value in a `plu-ts` one;

to keep track of the difference we need a different typescript type for `plu-ts` values, so every value in `plu-ts` is a `Term` and a `Term` can keep track of the type of the value it holds;

the possible types a `Term` can keep track of are:

- `PUnit` an unique value that has no real meaning; you can see it as the `undefined` or `null` of the typescript world but in `plu-ts`
- `PInt` a singed integer as big as you want
- `PBool` represents a boolean value
- `PByteString` equivalent of a `Buffer` or an [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
- `PString` equivalent of the typescript `string`
- `PData` eqivalent of the `object` type in typescript (is the low level representation of `PStruct`s that we'll cover in a moment, so you usually won't use `PData`)
- `PList<PType>` equvalent of an Array in typescript; note that all the elements in the list must be of the same `PType`
- `PPair<PType1, PType2>` equivalent of a typescript touple (`[ type1 , type2 ]`)
- `PDelayed<PType>` represents a delayed computation that returns a value of type `PType`, the computation can be run by passing the delayed value to the `pforce` function
- `PLam<PInput, POutput>` represent a functions that takes one single argument of type `PInput` and returns something of type `POutput`
- `PFn<[ PInput_0 , ...PType[] ],POutput>` represents a function that takes multiples arguments (at least one) and returns something of type `POutput`
- `PAlias<PType>` just an alias of the provided type; it behaves exactly like the Types of its argument, so `PAlias<PInt>` is equivalent to a  `PInt`; is usefull to keep track of a differen meaning that type might have
- `PStruct<{...}>` an abstraction over `PData`, useful to construct more coplex data structures.
