# PMaybe

definition:
```ts
const PMaybe = pgenericStruct( tyArg => {
    return {
        Just: { val: tyArg },
        Nothing: {}
    }
});
```

as we see `PMaybe` is a [`pgenericStruct`](../../language/values/generic_structs.md) with one type argument.

It rapresents an optional value.

Infact in `plu-ts` there is no such thing as the `undefined` that we have in typescript/javascript; however there are computations that can't be sure to actually return a proper value; as an example [`pfind`](../utility_terms/TermList%3CPElemsType%3E.md#find) that works with lists, might actually not find anything; in that case in typescript we might want to reutrn `undefined`; in `plu-ts` instead we just retutn `Nothing`.