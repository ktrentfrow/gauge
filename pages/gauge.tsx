import * as React from 'react';

import { observer, inject } from 'mobx-react';
import { WithStyles } from '@material-ui/core';

import { createStyles, withStyles } from '@material-ui/core/styles';
import { Store } from '../lib/store';
import GaugeComponent from '../components/gauge-component';

import * as _ from 'lodash';

const styles = () =>
  createStyles({
    mainDiv: {
    },
  });
interface Props extends WithStyles<typeof styles> {
  store: Store;
}
interface State {
  value: number;
}
class Gauge extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: 0,
    };
  }
  public render() {
    const { store } = this.props;

    return (
      <div>
        <GaugeComponent store={store}/>
      </div>
    );
  }
}
export default withStyles(styles)(inject('store')(observer(Gauge)));
