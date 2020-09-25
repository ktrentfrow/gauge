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
  index: number;
  id: string;
  angle: number;
}
interface State {
  value: number;
}
class TickComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: 0,
    };
  }
  public render() {
    const { x, y, index, id, angle } = this.props;
    return (
      <use
      href={`#${id}`}
      key={`tick-${index}`}
      transform={`rotate(${angle} ${x} ${y})`}
    />
    );
  }
}
export default withStyles(styles)((observer(TickComponent)));
