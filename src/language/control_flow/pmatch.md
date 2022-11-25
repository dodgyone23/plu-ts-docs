# pmatch

When we had our first look at [`pstruct`](../values/structs.md), we hinted at the possibility of _custom control flows_.

These are possible thanks to the `pmatch` construct.

To understand why this is extremely useful, let's take our `Toy` struct we defined looking at [`pstruct`](../values/structs.md).

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

And let's say we want to have a function that extracts the name of the mailman our dog plays with when we're out. It would look something like this:
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

What `pmatch` basically does is take a struct and returns an object with all the names of possible constructors that struct has based on its definition. Based on the actual constructor used to build the struct passed, only that branch is executed.

A `pmatch` branch gets as input the raw fields of the constructor, under the form of a Term of type `list( data )`.

Since extracting the fields might turn out to be an expensive operation to do, the `rawFields` object provides a utility function called `extract` which takes the names of the fields you _actually need_ and ignores the rest, finally making the extracted fields available in an object passed to the final function.

This way the defined function returns the name of the mailman if the Toy was actually constructed using the `Mailman` constructor; otherwise it returns an empty string.

## the underscore (`_`) wildcard

`pmatch` will force you to cover the cases for all constructors; but many times we only want to do something if the struct was built using one specific constructor without regard for any other constructors.

In fact we found ourselves in a very similar case in the example above: we want to do something only in the `Mailman` case but not in the others.

For situations like these there is the underscore (`_`) wildcard, that allows us to rewrite our function as follows:
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
This not only makes the code more readable but in the vast majority of the cases it also makes it more efficient!

## inline extracts

Now that we have a way to extract the name of the mailman from a Toy, we need to pass the actual toy to the fuction we just defined.

Using the `pmatch` function, our code would look like this:

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

This works just fine but is a lot of code just to get a field of a constructor we know is unique...

Fortunately for us, if the value is a [utility term](../values/utility_terms.md) for the `PStruct` type, what we have is actually something of type `TermStruct<{...}>`.

This utility term directly exposes the `extract` method if it notices that the struct can only be built by a single constructor.

Generally speaking, `plam` will always try to pass a [utility term](../values/utility_terms.md) if it can recognize the type; so what we have there is actually a `TermStruct<{...}>`!

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