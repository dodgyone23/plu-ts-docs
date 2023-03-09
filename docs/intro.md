---
sidebar_position: 1
---

# plu-ts

Built with ❤️ by [Harmonic Laboratories](https://www.harmoniclabs.tech/)

This documentation is for `plu-ts` v0.2.0^, if you are using a previous version check for changes in the [changelog](https://github.com/HarmonicLabs/plu-ts/blob/main/CHANGELOG.md).

## Introduction

`plu-ts` is a library designed for building Cardano dApps in an efficient and developer friendly way.

It is composed of two main parts:

- `plu-ts/onchain`: an [eDSL](https://en.wikipedia.org/wiki/Domain-specific_language#External_and_Embedded_Domain_Specific_Languages) (embedded Doamin Specific Language) that leverages Typescript as the host language; designed to generate efficient Smart Contracts.
- `plu-ts/offchain`: a set of classes and functions that allow reuse of onchain types.

# Getting started

see [Getting Started](./Getting%20Started) to begin your jurney in plu-ts

## Design principles

`plu-ts` was designed with the following goals in mind, in order of importance:

- Smart Contract efficiency
- reduced script size
- developer experience
- readability

## Roadmap

- v0.1.* :
    - [x] key syntax to build `plu-ts` expressions
    - [x] compilation of smart contracts to valid UPLC
    - [x] standard API data structures (`PScriptContext`, etc... ) for PlutusV1 and PlutusV2 contracts
    - [x] standard library
    - [x] Terms with utility methods to simplify the developer experience ( `TermInt`, `TermBool`, etc... )
- v0.2.* :
    - [x] `plu-ts/offchain`
      - [x] ledger types implementaiton
      - [x] `TxBuilder` API
- v0.3.* :
    - [ ] onchain optimizations
        - [ ] introduction of an IR
        - [ ] satatic AST analysis
    - [ ] improved developer experience
