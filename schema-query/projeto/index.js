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

    type Produto {
        id: ID!
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    # Entry point into the GraphQL API
    type Query {
        ola: String!
        dataHoraAtual: Date!
        usuarioLogado: Usuario
        produtoDestaque: Produto
    }
`

const resolvers = {
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },

    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto) {
                return produto.preco - (produto.desconto * produto.preco / 100)
            } else {
                return produto.preco
            }
        }
    },


    Query: {
        ola() {
            return 'Ola mundo!'
        },
        dataHoraAtual() {
            return new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString()
        },
        usuarioLogado() {
            return {
                id: '123',
                nome: 'Maria',
                email: 'maria@email.com',
                idade: 30,
                salario_real: 3000.99,
                vip: true
            }
        },
        produtoDestaque() {
            return {
                id: '1',
                nome: 'Mouse',
                preco: 200.00,
                desconto: 50.00,
            }
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
})

