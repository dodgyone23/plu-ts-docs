# pisJust

the `plu-ts` type is:
```ts
lam( PMaybe( tyVar("any") ), bool )
```

and what it does is really simple:

returns `pBool( true )` if the argument was constructed using the `Just` constructor of the [`PMaybe` generic struct](./index.md);

returns `pBool( false )` otherwise.