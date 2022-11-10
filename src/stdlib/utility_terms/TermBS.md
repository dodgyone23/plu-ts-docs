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
## length

> returns `TermInt`
> 
> equivalent expression:
> ```ts
> plengthBs.$( term )
> ```

## utf8Decoded

> returns `TermStr`
> 
> equivalent expression:
> ```ts
> pdecodeUtf8.$( term )
> ```

## concat

> parameter: `other` type: `Term<PByteString>`
> 
> returns: `TermBS`
> 
> equivalent expression:
> ```ts
> pappendBs.$( term ).$( other )
> ```

concatenates the bytestring on which the method is defined on with the one passed as argument and returns a new bytestring as result of the operation

## prepend

> parameter: `byte` type: `Term<PInt>`
> 
> returns: `TermBS`
> 
> equivalent expression:
> ```ts
> pconsBs.$( byte ).$( term )
> ```

expects the `byte` argument to be an integer in the range `0 <= byte <= 255`

adds a single byte at the start of the term the method is defined on and returns a new bytestring as result.

## subByteString

> parameter: `fromInclusive` type: `Term<PInt>`
> 
> parameter: `ofLength` type: `Term<PInt>`
> 
> returns: `TermBS`
> 
> equivalent expression:
> ```ts
> psliceBs.$( fromInclusive ).$( ofLength ).$( term )
> ```

takes `fromInclusive` as index of the first byte to include in the result and the expected length as `ofLength` as second parameter.

returns `ofLength` bytes starting from the one at index `fromInclusive`.

somewhat more efficient than `slice` as it maps directly to the builtin `psliceBs` function.

## slice

> parameter: `fromInclusive` type: `Term<PInt>`
> 
> parameter: `toExclusive` type: `Term<PInt>`
> 
> returns: `TermBS`
> 
> equivalent expression:
> ```ts
> psliceBs.$( fromInclusive ).$( psub.$( toExclusive ).$( fromInclusive ) ).$( term )
> ```

takes `fromInclusive` as index of the first byte to include in the result
and `toExclusive` as the index of the first byte to exclude

returns the bytes specified in the range

## at

> parameter: `index` type: `Term<PInt>`
> 
> returns: `TermInt`
> 
> equivalent expression:
> ```ts
> pindexBs.$( term ).$( index )
> ```

returns an integer in range `0 <= byte <= 255` representing the byte at position `index`

## eq

> parameter: `other` type: `Term<PByteString>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> peqBs.$( term ).$( other )
> ```

bytestring equality

## lt

> parameter: `other` type: `Term<PByteString>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> plessBs.$( term ).$( other )
> ```

returns `pBool( true )` if `term` is strictly less than `other`; `pBool( false )` otherwise

> **_NOTE_** bytestrings are ordered _lexicographically_
>
> meaning that two strings are compared byte by byte
>
> if the the byte of the first bytestring is less than the byte of the second; the first is considered less;
>
> if it the two bytes are equal it checks the next
>
> if the second is less than the first; the second is considered less;

## ltEq

> parameter: `other` type: `Term<PByteString>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> plessEqBs.$( term ).$( other )
> ```

returns `pBool( true )` if `term` is less or equal than `other`; `pBool( false )` otherwise

## gt

> parameter: `other` type: `Term<PByteString>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> pgreaterBS.$( term ).$( other )
> ```

returns `pBool( true )` if `term` is strictly greater than `other`; `pBool( false )` otherwise

## gtEq

> parameter: `other` type: `Term<PByteString>`
> 
> returns: `TermBool`
> 
> equivalent expression:
> ```ts
> pgreaterEqBS.$( term ).$( other )
> ```

returns `pBool( true )` if `term` is greater or equal than `other`; `pBool( false )` otherwise