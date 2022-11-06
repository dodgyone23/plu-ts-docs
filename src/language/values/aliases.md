# aliases

In some cases it might be useful to define aliases for already existing types;

as for the current implementation aliases do not really have any specific advantage other than making your code more expressive;
currently aliases can be used everywhere the aliased type is accepted and vice-versa

> generally speaking you may want to use aliases to define a *subset* of values that are meant to have a specific meaning
>
> example: you might need a type that describes the name of a person; every name is a string; but not every string is a name;
>
> to make clear the distinction you define an alias of the `string` type to be the `Name` type

We define new aliases using the `palias` ts function

```ts
const Age = palias( int );
```
now we have a new type to represent specifically Ages.

to get a term of the aliased type you can use the `from` static method of the class you got from calling `palias`
```ts
const someAge: Term<typeof Age> = Age.from( pInt(18) ); 
```

> **_NOTE_**: in a future version aliases will be able to add constraints over the type the are alias of
> as an example whe might want to force every `Age` to be non-negative; since a negative age doesn't really make sense
>
> when an alias will be constrained `plu-ts` will check for the constraints to be met each time a term with an alias is constructed
> **and will fail the computation if the constraints are not met**

## What's the `plu-ts` type of my alias?

as explained in the [types](./types.md) section; aliases and structs have different `plu-ts` level types;

to access them we need to use the `type` static method defined in the Alias class:

```ts
const agePlutsType = Age.type;
```
so if we want to define a function that accepts an `Age` as input we would write
```ts
const pisAdult = plam( Age.type, bool )
( age => 
    pgreaterEqInt.$( age as Term<PInt> ).$( pInt(18) )
);
```