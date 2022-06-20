const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    scalar Date

    type Usuario {
        id: ID!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    # Entry point into the GraphQL API
    type Query {
        ola: String
        dataHoraAtual: Date
        usuarioLogado: Usuario
    }
`

const resolvers = {
    Query: {
        ola() {
            return 'Ola mundo!'
        },
        dataHoraAtual() {
            return new Date().toLocaleDateString() +' - '+ new Date().toLocaleTimeString()
        },
        usuarioLogado() {
            return {
                id: '123',
                nome: 'Maria',
                email: 'maria@email.com',
                idade: 30,
                salario: 3000.99,
                vip: true
            }
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

