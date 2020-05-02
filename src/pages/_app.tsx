import React from 'react';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import '../index.css';
import configureStore from '../modules/configureStore';

const MyApp = ({ Component, pageProps, store }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default withRedux(configureStore)(MyApp);
