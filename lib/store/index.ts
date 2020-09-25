import * as mobx from 'mobx';
import { decorate, observable } from 'mobx';
mobx.configure({ enforceActions: 'observed' });

interface IGauge {
  value: number;
}

class Store {
  public gaugeValues: IGauge = { value: 10 };

  constructor({initialState = {}}: {initialState?: any;}) {
    console.log('Initial State', initialState)
  }

}

decorate(Store, {
  gaugeValues: observable,
});

let store: Store = null;

function initStore(initialState = {}) {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return new Store({ initialState });
  } else {
    const win: any = window;

    if (!store) {
      store = new Store({ initialState });

    }

    return store || win.__STORE__;
  }
}

function getStore() {
  return (typeof window !== 'undefined' && (window as any).__STORE__) || store;
}

export { Store, initStore, getStore };
