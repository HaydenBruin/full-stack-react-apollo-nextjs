import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import { InMemoryCache } from 'apollo-cache-inmemory'

export function withApollo (PageComponent) {
  const withApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  withApollo.getInitialProps = async (context) => {
    const { AppTree } = context;
    const apolloClient = (context.apolloClient = initApolloClient());

    let pageProps = {};
    if(PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(context);
    }

    if(typeof window === "undefined") {
      if( context.res && context.res.finished) {
        return pageProps;
      }

      try {
        const { getDataFromTree } = await import('@apollo/react-ssr');
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient
            }}
          />
        )
      } catch (e) {
        console.error(e);
      }

      Head.rewind();

    }

    const apolloState = apolloClient.cache.extract();
    return {
      ...pageProps,
      apolloState
    }
  }


  return withApollo;
}

const isDev = process.env.NODE_ENV !== "production";
const url = isDev ? 'http://localhost:3000' : 'https://habittracker.now.sh'

const initApolloClient = (initialState = {}) => {
  const cache = new InMemoryCache().restore(initialState);

  const client = new ApolloClient({
    uri: `${url}/api/graphql`,
    fetch,
    cache
  })
  return client;
}