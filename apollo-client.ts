import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/bswags/furtive-fig',
  cache: new InMemoryCache(),
})

export default apolloClient
