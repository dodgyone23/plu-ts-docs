# combinators

Combinators are functions that take functions as input and return new funcitons as output.

The `plu-ts` standard library exposes the most common of them so that can be [hoisted](../../optimizations/phoist.md) and reused usually at cost near to zero.

This is because often defining a combinator implies defining a "wrapping" function over the input(s) and then apply it; whereas by hoisting them we just need an application.

> **_NOTE_** since combinators may work with functions of different types; their types are [polymorphic](../../language/values/polymonrphic_types.md);
>
> In contrast to the rest of the standard library; combinators types are made polymorphic using the [tyVar](../../language/values/polymonrphic_types.md#type-variables) aproach; this is because ofthen is possible to infer the result type from the inputs themselves (which are functions)