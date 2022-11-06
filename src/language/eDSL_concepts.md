# eDSL concepts

eDSL stands for `embedded Domain Specific Language`.

what it means can be explained by analizing the definition:

- `Language` explains that is a programming language we are talking about
- `Doimain Specific` explains that the language is meant for a _specific set of tasks_; in the case of `plu-ts` the "domain" is the creation of Cardano smart contracts; and this means that its primary purpose is that.
- `embedded` means that it is a language inside an other language; in particular `plu-ts` is a language on its own, and it is built inside the language of typescript (which is called the _host language_)

when writing `plu-ts` code it is important to distinguish what part of the code are typescript and what are `plu-ts` ones.

Since typescript is the host language; typescript will be our starting point to get to `plu-ts`;