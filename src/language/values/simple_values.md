# simple values

For most of the [types](./pluts_types.md) described there is a function to transform the Typescript version to the `plu-ts` equivalent.

Here we cover the simple ones, leaving [functions](./pluts_functions.md) and [structs](./pluts_structs.md) to be covered later.

`plu-ts` type | function name   | ts to `plu-ts` function signature
--------------|-----------------|-------------------------------------
`unit`        | `pmakeUnit`     | `pmakeUnit(): Term<PUnit>`
`int`         | `pInt`          | `pInt(x: number \ bigint): Term<PInt>`
`bool`        | `pBool`         | `pBool(x: boolean): Term<PBool>`
`bs`          | `pByteString`   | `pByteString(x: string \ ByteString \ Buffer): Term<PByteString>`
`str`         | `pStr`          | `pStr(x: string): Term<PStr>`
`data`        | `pData`         | `pData(x: Data): Term<PData>`
`list`        | `pList`         | * explained below
`pair`        | ** not supported at ts level         | ** explained below
`delayed`     | ** not supported at ts level         | ** explained below

## * `pList`

Since `PList` is a generic type the `pList` function has a slightly more complex function signature:
```ts
function pList<ElemsT extends TermType, PElemsT extends ToPType<ElemsT = ToPType<ElemsT>( elemsT: ElemsT )
    : ( elems: Term<PElemsT>[] ) => Term<PList<PElemsT>>
```

In the signature above, `TermType` is the Typescript types of `plu-ts` types (which are typescript values after all) and `ToPType` is a utility type used internally and you should not worry about it.

From the signature we can already understand that given a `plu-ts` type, `pList` returns a function ad-hoc for terms of that type; so if we want a function to get list of integers we just do:
```ts
const pListInt: ( elems: Term<PInt>[] ) => Term<PList<PInt>> = pList( int );
```
And with that we now have a function that transforms an array of terms into a list.
```ts
const intList = pListInt( [1,2,3,4].map( pInt ) );
```
You might notice that in contrast to the other functions introduced, `pListInt` that we created works with terms instead of vanilla ts values; this is because `pListInt` acts as a [macro (advanced)](../advanced/ts_macros.md)

## ** not supported

`pair` and `delayed` do not have a direct way to build a value from ts for two different reasons:

`pair`s can only be built using `data` dynamically.

`delayed` doesn't really have a Typescript value, so it only makes sense in the `plu-ts` world.