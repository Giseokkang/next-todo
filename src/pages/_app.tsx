import React from 'react';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import configureStore from '../modules/configureStore';
import '../index.css';

const MyApp = ({ Component, pageProps, store }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

MyApp.getInitialProps = async context => {
  const { ctx, Component } = context;

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default withRedux(configureStore)(MyApp);
