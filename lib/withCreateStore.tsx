import { inject, observer } from 'mobx-react';
import Router from 'next/router';
import React from 'react';

import * as NProgress from 'nprogress';
import { getStore, Store } from './store';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', (url) => {
  NProgress.done();

  const store = getStore();
  if (store) {
    store.changeCurrentUrl(url);
  }
});

Router.events.on('routeChangeError', () => NProgress.done());

export default function withCreateStore(BaseComponent) {
  BaseComponent = inject('store')(BaseComponent);

  class WithCreateStore extends React.Component<{ store: Store }> {
    public static async getInitialProps(ctx) {
      const { req } = ctx;
      let baseComponentProps = {};

      if (BaseComponent.getInitialProps) {
        baseComponentProps = await BaseComponent.getInitialProps(ctx);
      }

      return {
        ...baseComponentProps,
        isServer: !!req,
      };
    }

    // public componentDidMount() {
    //   const { store } = this.props;
    //   store.pages.verifyRouterEnabled(Router);
    // }

    public render() {
      // const { store } = this.props;

      return <BaseComponent {...this.props} />;
    }
  }

  return inject('store')(observer(WithCreateStore));
}
