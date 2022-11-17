# eDSL concepts

eDSL stands for `embedded Domain Specific Language`.

What it means can be explained by analzying the definition:

- `Language` explains that is a programming language we are talking about
- `Domain Specific` explains that the language is meant for a _specific set of tasks_. The "Domain", or specific purpose of `plu-ts` is the creation of Cardano smart contracts.
- `embedded` means that it is a language inside another language. While `plu-ts` is a language on its own, it is built inside of the Typescript language (which is called the _host language_).

## Key Idea:
When writing `plu-ts` code it is important to distinguish what parts of the code are native to Typescript and what parts are `plu-ts`.

Since Typescript is the host language, Typescript will be our starting point for learning about `plu-ts`.