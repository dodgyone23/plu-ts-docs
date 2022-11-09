# TermBool

type definition:
```ts
type TermBool = Term<PBool> & {
    
    readonly orTerm:    TermFn<[PBool], PBool>
    readonly or:        ( other: Term<PBool> ) => TermBool

    readonly andTerm:   TermFn<[PBool], PBool>
    readonly and:       ( other: Term<PBool> ) => TermBool

}
```

## or

> parameter: `other` type: `Term<PBool>`
> 
> returns `TermBool`
> 
> equivalent expression:
> ```ts
> por.$( term ).$( other )
> ```

OR (`||`) boolean expression


## and

> parameter: `other` type: `Term<PBool>`
> 
> returns `TermBool`
> 
> equivalent expression:
> ```ts
> pand.$( term ).$( other )
> ```

AND (`&&`) boolean expression