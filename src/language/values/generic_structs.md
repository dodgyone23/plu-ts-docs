# generic structs

Sometimes it might be necessary to define custom types that are able to work with any other type; often acting as containers.

A great example are lists; which can work with elements of any type; and for this reason we have `list( int )`, `list( bs )`, etc...

But lists are built into the language; how do we define our own containers?

`pgenericStruct` is meant exactly for this.

As we know [structs can have multiple constructors](./structs.md) and the same is true for generic ones; so let's try to define a type that can hold either one or two instances of the same type:

```ts
const POneOrTwo = pgenericStruct( ty => {
    return {
        One: { value: ty },
        Two: { fst: ty, snd: ty }
    };
});
```

`pgenericStruct` returns a funciton (and not a class like `pstruct` does) that takes as input as many `TermType`s as in the definition (the arguments of thefunction passed to `pgenericStruct')

and only then returns a class; which represents the actual struct type.
```ts
const OneOrTwoInts = POneOrTwo( int ),

const OneOrTwoBS = POneOrTwo( bs );

const OneOrTwoOneOrTwoInts = POneOrTwo( POneOrTwo( int ).type );
```

## But can't I just use a function that returns a new `pstruct` based on different type arguments?

<img
    src="../../assets/well_yes_but_actually_no.jpg"
    alt="Well yes, but actually no"
    style="width: 60%; margin: 0 20%;"
/>

You _could_ but each time you'd get a **different struct with the same definition**;

as an example you _could_ do something like
```ts
const makeOneOrTwo = ( ty ) => pstruct({
    One: { value: ty },
    Two: { fst: ty, snd: ty }
});
```

but now you'd get a **BRAND NEW** struct each time you call `makeOneOrTwo`; meaning that you might not be able to assign one to the other; even if the two are basically the same.

To prevent this `pgenericStruct` caches results for the same inputs; so that the same class is returned:
```ts
console.log(
    makeOneOrTwo( int ) === makeOneOrTwo( int ) // false
);

console.log(
    POneOrTwo( int ) === POneOrTwo( int ) // true
);
```

## make Typescript happy

The fact that `pgenericStruct` works with type arguments that need to be used in the struct definion makes it really hard for typescript to infer the correct types of a generic struct.

for this reason you may want to explicitly tell to typescript what is your type once instatiated; and this requires some bolireplate:
```ts
// define a type that makes clear where
// the different type arguments are supposed
// to be in the struct definition
export type POneOrTwoT<TyArg extends ConstantableTermType> = PStruct<{
    One: { value: TyArg },
    Two: { fst: TyArg, snd: TyArg }
}>

// this is the actual definiton
const _POneOrTwo = pgenericStruct( ty => {
    return {
        One: { value: ty },
        Two: { fst: ty, snd: ty }
    };
});

// this is a wrapper that is typed correctly
function POneOrTwo<Ty extends ConstantableTermType>( tyArg: Ty ): POneOrTwoT<Ty>
{
    return _POneOrTwo( tyArg ) as any;
}

// export the wrapper with the type that is defined on the actual definition.
export default Object.defineProperty(
    POneOrTwo,
    "type",
    {
        value: _POneOrTwo.type,
        writable: false,
        enumerable: true,
        configurable: false
    }
)
```

The comments should help understand why this is needed; but you can just copy the snippet above and adapt it to you generic struct.