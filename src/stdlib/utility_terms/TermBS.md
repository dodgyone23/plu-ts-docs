# TermBS

type definition:

```ts
type TermBS = Term<PByteString> & {

    readonly length: TermInt
    
    readonly utf8Decoded: TermStr
    
    readonly concatTerm: TermFn<[PByteString], PByteString>
    readonly concat: ( other: Term<PByteString>) => TermBS

    readonly prependTerm: TermFn<[PInt], PByteString>
    readonly prepend: ( byte: Term<PInt> ) => TermBS

    readonly subByteStringTerm: TermFn<[PInt, PInt], PByteString>
    readonly subByteString: ( fromInclusive: Term<PInt>, ofLength: Term<PInt> ) => TermBS
    
    readonly sliceTerm: TermFn<[PInt, PInt], PByteString>
    readonly slice:     ( fromInclusive: Term<PInt>, toExclusive: Term<PInt> ) => TermBS
    
    readonly atTerm:    TermFn<[PInt], PInt>
    readonly at:        ( index: Term<PInt> ) => TermInt


    readonly eqTerm:    TermFn<[PByteString], PBool>
    readonly eq:        ( other: Term<PByteString> ) => TermBool

    readonly ltTerm:    TermFn<[PByteString], PBool>
    readonly lt:        ( other: Term<PByteString> ) => TermBool

    readonly ltEqTerm:  TermFn<[PByteString], PBool>
    readonly ltEq:      ( other: Term<PByteString> ) => TermBool

    readonly gtTerm:    TermFn<[PByteString], PBool>
    readonly gt:        ( other: Term<PByteString> ) => TermBool

    readonly gtEqTerm:  TermFn<[PByteString], PBool>
    readonly gtEq:      ( other: Term<PByteString> ) => TermBool

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

or boolean expression




## eq

> parameter: `other` type: `Term<PByteString>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> peqInt.$( term ).$( other )
> ```

integer equality

## lt

> parameter: `other` type: `Term<PByteString>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> plessInt.$( term ).$( other )
> ```

returns `pBool( true )` if `term` is strictly less than `other`; `pBool( false )` otherwise

## ltEq

> parameter: `other` type: `Term<PByteString>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> plessEqInt.$( term ).$( other )
> ```

returns `pBool( true )` if `term` is less or equal to `other`; `pBool( false )` otherwise

## gt

> parameter: `other` type: `Term<PByteString>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> pgreaterInt.$( term ).$( other )
> ```

returns `pBool( true )` if `term` is strictly grather than `other`; `pBool( false )` otherwise

## gtEq

> parameter: `other` type: `Term<PByteString>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> pgreaterEqInt.$( term ).$( other )
> ```

returns `pBool( true )` if `term` is grather or equal to `other`; `pBool( false )` otherwise