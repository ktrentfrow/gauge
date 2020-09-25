import * as React from "react";

import { observer } from "mobx-react";
import { WithStyles } from "@material-ui/core";

import { createStyles, withStyles } from "@material-ui/core/styles";

import * as _ from "lodash";

const styles = () =>
  createStyles({
    mainDiv: {
    },
  });
interface Props extends WithStyles<typeof styles> {
  x: number;
  y: number;
  radius: number;
  dialWidth: number;
  progressWidth: number;
  tickWidth: string;
  tickColor: string;
  id: string;
  tickLength: number;
}
interface State {
  value: number;
}
class TickLine extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: 0,
    };
  }
  public render() {
    const { x, y, id, radius, dialWidth, progressWidth, tickLength, tickColor, tickWidth } = this.props;

    let tX1 = x + radius - Math.max(dialWidth, progressWidth) / 2;
    let tX2 = tX1 - tickLength;
return (
      <line
      id={id}
      x1={tX1}
      y1={y}
      x2={tX2}
      y2={y}
      stroke={tickColor}
      strokeWidth={tickWidth}
    />
);
  }
}
export default withStyles(styles)((observer(TickLine)));
