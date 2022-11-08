# polymonrphic types

Sometimes we could have the necesstiy to desccribe the type of a function that works with multiple types.

In `plu-ts` there are 2 main ways to achieve this:

- type variables using `tyVar`
- `plu-ts` level generics


## type variables

`plu-ts` exposes a special type which is the `tyVar` function.

`tyVar` uses [js symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) behind the scenes; so each time you call `tyVar()` you get a new *unique* type variable;

for this reason when you use a type variable is a good idea to first store it in a constant:

```ts
const a = tyVar();
const b = tyVar();

const anyFunction = lam( a, b );

const identityFunctionType = lam( a, a );

const mkPairType = fn([ a, b ], pair( a, b ) )
```

If we tried to define the `identityFunctionType` type as follows we would have defined `anyFunction` type instead; which is NOT the intended behaviour
```ts
// THIS IS AN ERROR; NOT THE INTENDED BEHAVIOUR
const identityFunctionType = lam( tyVar(), tyVar() ); // equivalent to lam( a, b )
```

> **_NOTE_**: for some help while debugging `tyVar` takes an optional `string` as argument that works as a description; passing the same string to two type variables will still create two *differnt* type variables

type variables are extremly useful to define polymorphic types, however when doing so most of the times typescript is not able to infer the type of the term that we are trying to define, and you might find yourself using terms of type `Term<PType>`; which could be anything!

for this reason there is also an other way to define polimorphic types.

## `plu-ts` level generics

As we know, typescript gives us the possibility to define polymonrphic types trough generics.

In a certain way you could see generics as _functions_ that take a type as input and returns an other type.

fortunately for us `plu-ts` types are just values when seen from the typescript world, so we can have some sort of generic in `plu-ts` too!

To see how, let's try to define the previous polymonrphic types using the genric method:
```ts
const anyFunction = ( a: TermType, b: TermType ) => lam( a, b );

const identityFunctionType = ( a: TermType ) => lam( a, a );

const mkPairType = ( a: TermType, b: TermType ) => fn([ a, b ], pair( a, b ) )
```

Polymonrphic types defined as functions have also the advatage of being fully defined once the type arguments are passed

This works great, but there's still a problem though... Typescript doesn't infer these types too!

That is because `TermType` is the generic type for all `plu-ts` types; so when typescript tries to infer the type of the term, it sees the most generic of all, and once again thiks we wnat to use the anonymus `PType`.

To finally solve the problem we need to make the functions generic too:
```ts
const anyFunction = <A extends TermType, B extends TermType>( a: A, b: B ) => lam( a, b );

const identityFunctionType = <A extends TermType>( a: A ) => lam( a, a );

const mkPairType = <A extends TermType, B extends TermType>( a: A, b: B ) => fn([ a, b ], pair( a, b ) )
```
This way typescript first infers the specific `TermType` we are passing, and with that is able to determine the exact type of the Term.

We'll see that due to the way generic works, and the fact that from the type safety perspective are more reliable, most of the [`plu-ts` functions](./functions//index.md) in the [standard library](../../stdlib/index.md) that are polymorphic will use the generic way rather than relaying on type variables; 

this is done expecially in the case the type requires a type variable as return type, a notable example is `pif` which is of type `bool -> a -> a -> a`.