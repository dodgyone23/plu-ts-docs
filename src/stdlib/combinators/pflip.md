# pflip

`pflip` type is:
```ts
lam(
    fn([ a, b ], c ),
    fn([ b, a ], c )
)
```

and all is doing is _flipping_ the position of the first two arguments; so that the second can be passed as first.

> **_NOTE_** if you are using the `...Term` version of the `TermList` higher order functions ( `list.mapTerm`, `list.filterTerm`, `list.everyTerm`, ... ) then `pflip` is already in the scope and you can use it a cost 0.