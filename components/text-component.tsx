import * as React from 'react';

import { observer } from 'mobx-react';
import { WithStyles } from '@material-ui/core';

import { createStyles, withStyles } from '@material-ui/core/styles';

import * as _ from 'lodash';

const styles = () =>
  createStyles({
    mainDiv: {
    },
  });
interface Props extends WithStyles<typeof styles> {
  x: number;
  y: number;
  angle: number;
  text: string;
}
interface State {
  value: number;
}
class TextComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: 0,
    };
  }
  public render() {
    const { x, y, angle, text } = this.props;
    // const { classes } = this.props;
  
    return (
        <text
          x={x}
          y={y + 65}
          fontFamily="Bebas Neue"
          fontSize="13"
          transform={`rotate(${angle} ${x} ${y})`}
          textAnchor="middle"
          fill="white"
        >{text}</text>
    );
  }
}
export default withStyles(styles)((observer(TextComponent)));
