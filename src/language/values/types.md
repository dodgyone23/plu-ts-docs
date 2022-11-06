# types

every value in `plu-ts` is a `Term` and a `Term` can keep track of the type of the value it holds;

## Typescript types

the possible types a `Term` can keep track of are:

- `PUnit` an unique value that has no real meaning; you can see it as the `undefined` or `null` of the typescript world but in `plu-ts`
- `PInt` a singed integer as big as you want
- `PBool` a boolean value
- `PByteString` equivalent of a `Buffer` or an [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
- `PString` equivalent of the typescript `string`
- `PData` eqivalent of the `object` type in typescript (is the low level representation of `PStruct`s that we'll cover in a moment, so you usually won't use `PData`)
- `PList<PType>` equvalent of an Array in typescript; note that all the elements in the list must be of the same `PType`
- `PPair<PType1, PType2>` equivalent of a typescript touple (`[ type1 , type2 ]`)
- `PDelayed<PType>` a delayed computation that returns a value of type `PType`, the computation can be run by passing the delayed value to the `pforce` function
- `PLam<PInput, POutput>` a functions that takes one single argument of type `PInput` and returns something of type `POutput`
- `PFn<[ PInput_0 , ...PType[] ],POutput>` a function that takes multiples arguments (at least one) and returns something of type `POutput`
- `PAlias<PType>` just an alias of the provided type; it behaves exactly like the Types of its argument, so `PAlias<PInt>` is equivalent to a  `PInt`; is usefull to keep track of a differen meaning that type might have
- `PStruct<{...}>` an abstraction over `PData`, useful to construct more coplex data structures.

## `plu-ts` types

`plu-ts` would not be a strongly typed language if limited to the typescript types;
that is because the types of typescript are only useful during compilation to javascript; and then everything si untyped!

for this reason `plu-ts` implements its own type through some constants and functions can be imported.

in the same order of above, the `plu-ts` equivalents are:

- `unit`
- `int`
- `bool`
- `bs`
- `str`
- `data`
- `list( type )`
- `pair( type1, type2 )`
- `delayed( type )`
- `lam( from, to )`
- `fn([ ...inputs ], output )`
- aliases types and structs types will be retreived by the `type` static property of the classes (explained in the dedicated section for [aliases](./aliases.md) and [structs](./structs.md))

### type variables

there is also a special `plu-ts` type which is the `tyVar` function

type variables are extremly useful to define polymorphic types, here some examples

```ts
const a = tyVar();
const b = tyVar();

const anyFunction = lam( a, b );

const identityFunctionType = lam( a, a );

const mkPairType = fn([ a, b ], pair( a, b ) )
```

> ### IMPORTANT
>
> `tyVar` uses [js symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) behind the scenes; so each time you call `tyVar()` you get a new *unique* type variable.
>
> That is why we immediately assigned the result to some constants
>
> If we tried to define the `identityFunctionType` type as follows we would have defined `anyFunction` type instead; which is NOT the intended behaviour
>```ts
>// THIS IS AN ERROR; NOT THE INTENDED BEHAVIOUR
>const identityFunctionType = lam( tyVar(), tyVar() ); // equivalent to lam( a, b )
>```
>

> **_NOTE_**: for some help while debugging `tyVar` takes an optional `string` as argument that works as a description; passing the same string to two type variables will still create two *differnt* type variables
