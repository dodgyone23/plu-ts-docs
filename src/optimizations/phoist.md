# phoist

Another great tool for optimizations is `phoist` and all _hoisted_ terms.

> #### **Hoisting**
>
> ( source: [MDN Docs/Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) )
>
> Hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables or classes to the top of their scope, prior to execution of the code.
>

You can think of _hoisted terms_ as terms that have been `plet`ted but in the global scope.

So once you use a hoisted term once, each time you re-use it you are adding almost _nothing_ to the script size.

You can create a hoisted term by using the `phoist` function. This allows you to reuse the term you hoisted as many times as you want.

This makes `phoist` a great tool if you need to develop a library for `plu-ts`; because is likely your functions will be used a lot.

Let's say we wanted to create a library for math functions. We definitely want to have a way to calculate factorials; we already defined `pfactorial` while introducing [recursion](../language/control_flow/recursion.md), however that definition is not great if we need to re-use it a lot because the term is always inlined.

But now we know how to fix it:
```ts
const pfactorial = phoist(
    precursive(
        pfn([
            lam( int, int ),
            int
        ],  int)
        (( self, n ) =>
            pif( int ).$(
                n.ltEq( pInt(1) )
            )
            .then( pInt(1) )
            .else(
                n.mult(
                    papp(
                        self,
                        n.sub( pInt(1) )
                    )
                )
            )
        )
    )
)
```

If you compare this definiton with the previous one you'll see that nothing has changed except for the `phoist`, that's it; now we can use `pfactorial` as many times we want.

## Can I use `phoist` everywhere?

**No**

`phoist` only accepts _closed terms_ (aka. Terms that do not contain external variables); if you pass a term that is not closed to `phoist` it **throws** a `BasePlutsError` error.

So things like:

```ts
const fancyTerm = plam( int, int )
    ( n => 
        phoist( n.mult( pInt(2) ) ); // error.
    )
```
will throw because the variable `n` comes from _outside_ the `phoist` function, hence the term is _open_ (not closed).