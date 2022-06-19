const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    # Entry point into the GraphQL API
    type Query {
        ola: String
    }
`

const resolvers = {
    Query: {
        ola() {
            return 'Ola mundo!'
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
})

