# TermInt

type definition:
```ts

type TermInt = Term<PInt> & {
    
    readonly addTerm:       TermFn<[PInt], PInt>
    readonly add:           ( other: Term<PInt> ) => TermInt

    readonly subTerm:       TermFn<[PInt], PInt>
    readonly sub:           ( other: Term<PInt> ) => TermInt

    readonly multTerm:      TermFn<[PInt], PInt>
    readonly mult:          ( other: Term<PInt> ) => TermInt

    readonly divTerm:       TermFn<[PInt], PInt>
    readonly div:           ( other: Term<PInt> ) => TermInt

    readonly quotTerm:      TermFn<[PInt], PInt>
    readonly quot:          ( other: Term<PInt> ) => TermInt

    readonly remainderTerm: TermFn<[PInt], PInt>
    readonly remainder:     ( other: Term<PInt> ) => TermInt

    readonly modTerm:       TermFn<[PInt], PInt>
    readonly mod:           ( other: Term<PInt> ) => TermInt

    
    readonly eqTerm:    TermFn<[PInt], PBool>
    readonly eq:        ( other: Term<PInt> ) => TermBool
        
    readonly ltTerm:    TermFn<[PInt], PBool>
    readonly lt:        ( other: Term<PInt> ) => TermBool
        
    readonly ltEqTerm:  TermFn<[PInt], PBool>
    readonly ltEq:      ( other: Term<PInt> ) => TermBool
        
    readonly gtTerm:    TermFn<[PInt], PBool>
    readonly gt:        ( other: Term<PInt> ) => TermBool
        
    readonly gtEqTerm:  TermFn<[PInt], PBool>
    readonly gtEq:      ( other: Term<PInt> ) => TermBool
        
};
```

## add

> parameter: `other` type: `Term<PInt>`
> 
> returns `TermInt`
> 
> equivalent expression:
> ```ts
> padd.$( term ).$( other )
> ```

adds `other` to the term is defined on and returns the result


## sub

> parameter: `other` type: `Term<PInt>`
> 
> returns `TermInt`
> 
> equivalent expression:
> ```ts
> psub.$( term ).$( other )
> ```

subtracts `other` to the term is defined on and returns the result

## mult

> parameter: `other` type: `Term<PInt>`
> 
> returns `TermInt`
> 
> equivalent expression:
> ```ts
> pmult.$( term ).$( other )
> ```

multiplies `other` to the term is defined on and returns the result

## div

> parameter: `other` type: `Term<PInt>`
> 
> returns `TermInt`
> 
> equivalent expression:
> ```ts
> pdiv.$( term ).$( other )
> ```

performs integer division using the term is defined on and `other` as divisor; returns the result rounded towards negative infinity:

_exaxmple_:
```ts
pInt( -20 ).div( pInt( -3 ) ) // ==  -7
```

## quot

> parameter: `other` type: `Term<PInt>`
> 
> returns `TermInt`
> 
> equivalent expression:
> ```ts
> pquot.$( term ).$( other )
> ```

performs integer division using the term is defined on and `other` as divisor; returns the quotient rounded towards zero:

_exaxmple_:
```ts
pInt( -20 ).quot( pInt( 3 ) ) // ==  -6
```

## remainder

> parameter: `other` type: `Term<PInt>`
> 
> returns `TermInt`
> 
> equivalent expression:
> ```ts
> prem.$( term ).$( other )
> ```

performs integer division using the term is defined on and `other` as divisor; returns the remainder:

_exaxmple_:
```ts
pInt( -20 ).remainder( pInt( 3 ) ) // ==  -2
```

## mod

> parameter: `other` type: `Term<PInt>`
> 
> returns `TermInt`
> 
> equivalent expression:
> ```ts
> pmod.$( term ).$( other )
> ```

returns the term the method is defined on, in modulo `other`.

_exaxmple_:
```ts
pInt( -20 ).mod( pInt( 3 ) ) // ==  1
```

## eq

> parameter: `other` type: `Term<PInt>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> peqInt.$( term ).$( other )
> ```

integer equality

## lt

> parameter: `other` type: `Term<PInt>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> plessInt.$( term ).$( other )
> ```

returns `pBool( true )` if `term` is strictly less than `other`; `pBool( false )` otherwise

## ltEq

> parameter: `other` type: `Term<PInt>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> plessEqInt.$( term ).$( other )
> ```

returns `pBool( true )` if `term` is less or equal to `other`; `pBool( false )` otherwise

## gt

> parameter: `other` type: `Term<PInt>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> pgreaterInt.$( term ).$( other )
> ```

returns `pBool( true )` if `term` is strictly grather than `other`; `pBool( false )` otherwise

## gtEq

> parameter: `other` type: `Term<PInt>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> pgreaterEqInt.$( term ).$( other )
> ```

returns `pBool( true )` if `term` is grather or equal to `other`; `pBool( false )` otherwise