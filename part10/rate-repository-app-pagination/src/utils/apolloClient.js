import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import storage from './storage';
import { relayStylePagination } from '@apollo/client/utilities';
// import { REACT_APP_GQL_URL } from '@env'
import constants from 'expo-constants';
// const REACT_APP_GQL_URL = 'http://10.0.0.14:4000/graphql'

const httpLink = createHttpLink({
  uri: constants.manifest.extra.REACT_APP_GQL_URL,
});

// o merge the existing repositories in the cache with the next set of repositories
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: { // Repository is a __typename (type Polices)
      fields: {
        reviews: relayStylePagination(),
      },
    },
    User: { // User is a --typename for me query
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
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
    // cache: new InMemoryCache(),
    cache, 
  });
};

export default createApolloClient;
