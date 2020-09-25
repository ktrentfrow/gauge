import React from 'react';

// import { getUser } from './api/public';
// import { getInitialData } from './api/user';
import { getStore, initStore, Store } from './store';

export default function withStore(App) {
  class AppWithMobx extends React.Component {
    public static async getInitialProps(appContext) {
      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext);
      }

      // if store initialized already, do not load data again
      if (getStore()) {
        return appProps;
      }

      const { ctx } = appContext;
      // let user = null;
      // try {
      //   user = ctx.req ? ctx.req.user : await getUser();
      // } catch (error) {
      //   console.log('ERROR GETTING USER');
      //   console.log(error);
      // }

      const initialData = {};

      // if (user) {
      //   try {
      //     initialData = await getInitialData({
      //       headers: {
      //         cookie: ctx.req.headers.cookie,
      //       },
      //     });
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }

      return {
        ...appProps,
        initialState: {
          // user,
          // chatRoomSlug: 'after-hours',
          currentUrl: ctx.asPath,
          ...initialData,
        },
      };
    }

    private store: Store;

    constructor(props) {
      super(props);

      // eslint-disable-next-line
      this.store = initStore(props.initialState);
    }

    public render() {
      return <App {...this.props} mobxStore={this.store} />;
    }
  }

  return AppWithMobx;
}
