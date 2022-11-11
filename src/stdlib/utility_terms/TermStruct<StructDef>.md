# TermStruct&lt;StructDef&gt;

`TermStruct` is an other type that is unnecessarely complicated. This time because it has to mess around with the struct definition; however if we clean all tha complexity to what is strictly needed, `TermStruct` would look something like this:
```ts
type TermStruct<SDef extends ConstantableStructDefinition> = Term<PStruct<SDef>> & 
    IsSingleKey<SDef> extends true ?
    {
        extract: ( ...fields: string[] ) => {
            in: <PExprResult extends PType>
                ( expr: ( extracted: StructInstance<...> ) => Term<PExprResult> )
                 => Term<PExprResult>
        }
    }
    : {}
```

even with these semplifications it might seem a bit complex but really all is telling us is that it adds the `extract` method _only if_ the struct can only have one single constructor; and adds nothing if it has more.

Infact we already encountered [this method while introducing `pmatch`](../../language/control_flow/pmatch.md#inline-extracts); we just didn't know that it was an utility term.