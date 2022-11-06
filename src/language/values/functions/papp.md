# papp

Lambdas and functions in general in `plu-ts` are often just constants seen from the typescript world;

however we usally know that what we have is more than just a constant and that it can take arguments.

For this particular reason we have the `papp` function (which stands  for  "*`plu-ts` applicaiton*")

and all it does is to tell typescript that we want to *apply* a term to an other, or in other words pass an argument to a function.

the type signature of papp is something like:
```ts
function papp<Input extends PType, Output extends PType>( a: Term<PLam<Input,Output>>, b: Term<Input> ): Term<Output>
```

as we'll se in the [next section](./partial_application.md); function can be _partially applied_ so, to preserve this behaviour, papp only takes two arguments

1) the function we want to pass the argument to
2) the argument

then it checks the types are matching, **_evaluates the argument and applies the result of the evaluation_** and finally returns the result.

## the "`$`" method

However having an external function to use in order to pass arguments thends to make the code hard to read;

here is an example of code if all we had was only `papp`:
```ts
papp(
    papp(
        pTwoIntegersList,
        pInt(42)
    ),
    pInt(69)
);
```

for this reason often you'll encounter Terms that have a type that looks like this
```ts
type LambdaWithApply =
    Term<PLam<SomeInput, SomeOutput>> // this is our usual type
    & { // extended with some functionalities
        $: ( input: Term<SomeInput> ) => Term<SomeOutput>
    }
```

where the `$` method definition si often nothing more than
```ts
myTerm["$"] = ( someInput: Term<SomeInput> ) => papp( myTerm, someInput );
```

this seems like it does nothing fancy; but allows to transform the previous code in something more readable like
```ts
pTwoIntegersList.$( pInt(42) ).$( pInt(69) )
```
