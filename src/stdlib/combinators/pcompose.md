# pcompose

`pcompose` type looks like this
```ts
fn([
    lam( b, c ),
    lam( a, b )
],  lam( a, c ))
```

so it takes two funcions: the first that goes from `b` to `c` and the second from `a` to `b`; and finnally returns a function from `a` to `c`.

the type should already tell us a lot of what `pcompose` is doing; in partiular we notice that the return type of the second function is the input type of the first;

not only that, the result function takes as input the same type of the second function and returns the same thing of the first.

So what `pcompose` is doing is just creating a function that is equivalent to the following expression:
```ts
fstFunc.$( sndFunc.$( a ) )
```