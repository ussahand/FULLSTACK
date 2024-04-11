import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import storage from './storage';

// import { REACT_APP_GQL_URL } from '@env'
import constants from 'expo-constants';
// const REACT_APP_GQL_URL = 'http://10.0.0.14:4000/graphql'

const httpLink = createHttpLink({
  uri: constants.manifest.extra.REACT_APP_GQL_URL,
});

const createApolloClient = () => {
  const authLink = setContext(async (_, {headers}) => {
    const auth = await storage()
      .getItem('authorization')
      .catch(e => console.log(e))
    const accessToken = auth ? auth.token : ''
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  })
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
