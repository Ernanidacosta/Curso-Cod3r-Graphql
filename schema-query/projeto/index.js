const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    scalar Date

    # Entry point into the GraphQL API
    type Query {
        ola: String
        horaAtual: Date
    }
`

const resolvers = {
    Query: {
        ola() {
            return 'Ola mundo!'
        },
        horaAtual() {
            return new Date()
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
})

