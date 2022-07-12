# Issue

- when having the text that is stored in `./graphiql-not-caching-requests` in the
  graphiql playground the @envelop/response-cache plugin does not cache
requests.
- when having the test that is stored in `./graphiql-caching-requests` it will
  work just fine.

- I did stumble upon this by accident. Caching the GraphQL validation phase with
  `@envelop/parser-cache` and `@envelop/validation-cache` still work with both
files.

# Steps to Reproduce

- `yarn`
- `yarn build`
- `yarn start`
- go to `localhost:4000/graphql` and copy paste the text of
  `./graphiql-not-caching-requests`. Then run "hello" and see that it won't be
cached.
- go to `localhost:4000/graphql` and copy paste the text of
  `./graphiql-caching-requests`. Then run "hello" and see that it will be
cached.
