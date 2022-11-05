# plu-ts

`plu-ts` is a libarary designed to build Cardano dApp in an efficient and developer friendly way;

It is composed by two main parts:

- `plu-ts/onchain`: an [eDSL](https://en.wikipedia.org/wiki/Domain-specific_language#External_and_Embedded_Domain_Specific_Languages) (embedded Doamin Specific Language) that laverages Typescript as host language; designed to generate efficient Smart Contracts;
- `plu-ts/offchan`: a set of classes and funcitons that allow to reuse the onchain types;

## Design principles

`plu-ts` was designed with the following goals in mind, in order of importance:

- Smart Copntract efficiency
- reduced script size
- developer experience
- readability

## Roadmap

- v0.1.0 :
    - [x] key syntax to buld `plu-ts` expressions
    - [x] compilation of smart contracts to valid UPLC
    - [x] standard API data structures (`PScriptContext`, etc... ) for PlutusV1 and PlutusV2 contracts
    - [x] standard library
    - [x] Terms with utility methods to simplify the developer experience ( `TermInt`, `TermBool`, etc... )
- v0.2.0 :
    - [ ] functions for standard API data structures interaction
- v0.3.0 :
    - [ ] `TermCont` implementation to mitigate the callback hell issue