# evaluate a plu-ts expression

`plu-ts` implements its own version of the [CEK machine](https://en.wikipedia.org/wiki/CEK_Machine) for the UPLC language. This allows any `plu-ts` term to be compiled to an UPLC Term and evaluated.

The function that does all of this is called `evalScript`, and that's literally all you need to evaluate a term.

`evalScript` will return an `UPLCTerm` because that's what it works with.

A `UPLCTerm` can be a lot of things, but if everything goes right you'll only encounter `UPLCConst` instances if you expect a concrete value, or some `Lambda` if you instead expect some functions. If instead the `plu-ts` term you passed as argument fails the computation you will get back an instance of `ErrorUPLC`.

To test it we'll use the `pfactorial` we defined in the [recursion section](./control_flow/recursion.md)
```ts
console.log(
    evalScript(
        pfactorial.$( 0 )
    )
); // UPLCConst { _type: [0], _value: 1n }

console.log(
    evalScript(
        pfactorial.$( 3 )
    )
); // UPLCConst { _type: [0], _value: 6n }

console.log(
    evalScript(
        pfactorial.$( 5 )
    )
); // UPLCConst { _type: [0], _value: 120n }

console.log(
    evalScript(
        pfactorial.$( 20 )
    )
); // UPLCConst { _type: [0], _value: 2432902008176640000nn }
```

`evalScript` is especially useful if you need to test your `plu-ts` code; regardless of the testing framework of your choice you will be always able to run `evalScript`.