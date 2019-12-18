import { ApolloServer, gql } from 'apollo-server-micro'
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit'
import connectDb from '../../lib/mongoose'
import { habitsResolvers } from '../../src/api/habits/resolvers'
import { habitsMutations } from '../../src/api/habits/mutations'
import Habits from '../../src/api/habits/Habits.graphql'

const fakeTypeDefs = gql`
  type Query {
    sayHello: String
  }
`

const fakeResolvers = {
  Query: {
    sayHello: () => { 
      return 'Tracker app';
    }
  }
}

const resolvers = mergeResolvers([
  fakeResolvers,
  habitsResolvers,
  habitsMutations
])

const typeDefs = mergeTypeDefs([
  fakeTypeDefs,
  Habits,
])

export const config = {
  api: {
    bodyParser: false
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const server = apolloServer.createHandler({ path: "/api/graphql" })

export default connectDb(server);