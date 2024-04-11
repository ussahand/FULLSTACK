import { NativeRouter } from 'react-router-native'
import { ApolloProvider } from '@apollo/client'

import { Text } from 'react-native'

import Main from './src/Main'
import createApolloClient from './src/utils/apolloClient'
const apolloClient = createApolloClient()

export default function App() {
  return(
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main/>
        {/* <Text>hhhhhhhhhhhhhhhhhhhhhhh</Text> */}
      </ApolloProvider>
    </NativeRouter>
)}
