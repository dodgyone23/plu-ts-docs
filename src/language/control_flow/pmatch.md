# pmatch

When we had our first look at [`pstruct`](../values/structs.md) we hinted to the possibility of _custom control flows_

these are possible thanks to the `pmatch` construct.

To understand why it is extreemly useful; let's take our `Toy` struct we defined looking at [`pstruct`](../values/structs.md)

```ts
const Toy = pstruct({
    Stick: {},
    Ball: {
        size: int,
        isSoft: bool
    },
    Mailman: {
        name: str,
        age: Age.type
    }
})
```

and let's say we want to have a function that extracts the name of the mailman our dog plays with when we're out, it would be something like this:
```ts
const getMailmanName = plam( Toy.type, str )
( toy =>
    pmatch( toy )
    .onMailman( rawFields =>
        rawFields.extract("name").in( mailman =>
            mailman.name
    ))
    .onStick( _ => pStr("") )
    .onBall(  _ => pStr("") )
)
```

what `pmatch` does is basically taking a struct and having a look at its definition; based on that it returns an object with all the names of possible constructors that struct has; based on the actual constructor used to build the struct passed, only that branch is executed.

A `pmatch` branch gets as input the raw fields of the constructor, under the form of a term of type `list( data )`.

since extracting the fields migth turn to be an expansive operation to do; on the `rawFields` object is defined an utility function called `extract`; which takes the names of the fields you _actually need_ and ignores the rest; and finally it makes aviable the extracted fields in an object passed to the final function.

this way the function defined returns the name of the mailman if the Toy was actually constructed using the `Mailman` constructor; otherwhise it returns an empty string

## the underscore (`_`) wildcard

`pmatch` will force you to cover the cases for all constructors; but many times we only want to do something if the struct was built using one specific constructor and then we don't really care about the others.

Infact we found ourselves in a very similar case in the example above.

We want to do something only in the `Mailman` case but not in the others.

for situations like these there is the underscore (`_`) whildcard, that allows to rewrite our function as follows
```ts
const getMailmanName = plam( Toy.type, str )
( toy =>
    pmatch( toy )
    .onMailman( rawFields =>
        rawFields.extract("name").in( mailman =>
            mailman.name
    ))
    ._( _ => pStr("") )
)
```
this not only makes the code more readable but in the vast majority of the cases it also makes it more efficient!

## inline extracts

Now that we have a way to extract the name of the mailman from a Toy; we need to pass the actual toy to the fuction we just defined.

using the `pmatch` function, our code would look like this:

```ts
// remember the definition of `Dog`
const Dog = pstruct({
    Dog: {
        name: str,
        age: Age.type,
        favouriteToy: Toy.type
    }
});

const getMailmanNameFromDog = plam( Dog.type, str )
( dog =>
    pmatch( dog )
    .onDog( rawFields =>
        rawFields.extract("favouriteToy").in( fields =>
            getMailmanName.$( fields.favouriteToy )
    ))
)
```

this works just fine but is a loot of stuff just to get a field of a constructor we know is unique...

fortunately for us, if the value is an [utility term](../values/utility_terms.md) for the `PStruct` type, what we have is actually something of type `TermStruct<{...}>`

this utility term exposes directly the `extract` method if it notices that the struct can only be built by a single constructor.

Generally speacking `plam` will always try to pass an [utility term](../values/utility_terms.md) if it can recognize the type; so what we have there is actually a `TermStruct<{...}>`!

This allows us to rewrite the function as
```ts
const getMailmanNameFromDog = plam( Dog.type, str )
( dog =>
    dog.extract("favouriteToy").in( fields =>
        getMailmanName.$( fields.favouriteToy )
    )
)
```
which is a lot cleaner!