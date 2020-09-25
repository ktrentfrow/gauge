import * as React from "react";

import { observer, inject } from "mobx-react";
import { WithStyles } from "@material-ui/core";

import { createStyles, withStyles } from "@material-ui/core/styles";
import { Store } from "../lib/store";
import TextComponent from "./text-component";
import TickLine from "./tick-line";
import TickComponent from "./tick-component";

import * as _ from "lodash";

const styles = () =>
  createStyles({
    mainDiv: {
      // maxHeight: '90vh',
    },
    mainNeedle: {
      height: "117px",
      width: "12px",
      backgroundSize: "cover",
    },
    radialProgressTickLabels: {
      // transform: `rotate(180deg)`,
      fontFamily: "Bebas Neue",
      fontSize: "13px",
      fill: "white",
    },
  });
interface Props extends WithStyles<typeof styles> {
  store: Store;
}
interface State {
  value: number;
}
class GaugeComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: 0,
    };
  }
  public render() {
    const TICK_ID1 = "tick";
    const TICK_ID2 = "tick2";
    const { classes } = this.props;
    const defineTick = (opts) => {
      return (
        <TickLine
          x={opts.cX}
          y={opts.cY}
          id={TICK_ID1}
          radius={opts.radius}
          dialWidth={opts.dialWidth}
          progressWidth={20}
          tickWidth={opts.tickWidth}
          tickColor="white"
          tickLength={14}
        />
      );
    };
    const defineShortTick = (opts) => {
      return (
        <TickLine
          x={opts.cX}
          y={opts.cY}
          id={TICK_ID2}
          radius={opts.radius}
          dialWidth={opts.dialWidth}
          progressWidth={20}
          tickWidth={opts.tickWidth}
          tickColor="white"
          tickLength={8}
        />
      );
    };
    const defineGradient = (_) => {
      return (
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgb(73,79,83)" stopOpacity="0" />
          <stop offset="100%" stopColor="rgb(17,15,15)" stopOpacity="1" />
        </radialGradient>
      );
    };

    const renderText = (opts) => {
      return (
        <g>
          <TextComponent x={opts.cX} y={opts.cY} angle={40} text="0" />
          <TextComponent x={opts.cX} y={opts.cY} angle={70} text="1" />
          <TextComponent x={opts.cX} y={opts.cY} angle={100} text="2" />
          <TextComponent x={opts.cX} y={opts.cY} angle={130} text="3" />
          <TextComponent x={opts.cX} y={opts.cY} angle={160} text="4" />
          <TextComponent x={opts.cX} y={opts.cY} angle={190} text="5" />
          <TextComponent x={opts.cX} y={opts.cY} angle={220} text="6" />
          <TextComponent x={opts.cX} y={opts.cY} angle={250} text="7" />
          <TextComponent x={opts.cX} y={opts.cY} angle={280} text="8" />
          <TextComponent x={opts.cX} y={opts.cY} angle={310} text="9" />
        </g>
      );
    };

    const renderTicks = (opts) => {
      let tickAngles = [];
      for (let i = 0; i <= 360; i += 15) {
        if (i < 50 || i > 130) {
          const id = i % 10 === 0 ? TICK_ID2 : TICK_ID1;
          tickAngles.push({ angle: i, id });
        }
      }
      return (
        <g className="ticks">
          {tickAngles.map((tick, idx) => {
            return (
              <TickComponent
                key={idx}
                x={opts.cX}
                y={opts.cY}
                index={idx}
                id={tick.id}
                angle={tick.angle}
              />
            );
          })}
        </g>
      );
    };
    const renderNeedle = (opts) => {
      return (
        <image
          className={classes.mainNeedle}
          xlinkHref="/static/img/needle.png"
          x="49%"
          y="17%"
          transform={`rotate(${opts.currentValue} ${opts.cX} ${opts.cY})`}
        ></image>
      );
    };

    // TODO: Get bebas font displaying
    //       Orient numbers on dial correctly
    //       Add gauge from main page and ability to change parameters
    //       Get/Set values from store
    //       Drive needle with prop values or from store
    let opts = Object.assign({}, this.props);

    let size = 237;
    let dialWidth = 20;
    let tickWidth = 2;
    let cX = size / 2;
    let currentValue = 10;
    let cY = size / 2;
    let radius = (size - 2 * dialWidth) / 2;
    let diameter = 2 * radius;
    let circumference = 2 * Math.PI * radius;
    let progressFont = "Times New Roman";
    opts = Object.assign(opts, {
      cX,
      cY,
      currentValue,
      progressFont,
      radius,
      tickWidth,
      dialWidth,
      diameter,
      circumference,
    });
    return (
      <div>
        <div>
          <div>
            <svg height="237" width="237" viewBox="0 0 240 240">
              <defs>
                {defineTick(opts)}
                {defineShortTick(opts)}
                {defineGradient(opts)}
              </defs>
              <circle cx="50%" cy="50%" r="45%" stroke="black" />
              <circle cx="50%" cy="50%" r="35px" fill="rgb(26, 26, 26)" />
              <circle cx="50%" cy="50%" r="20px" fill="url(#grad1)" />
              <image
                className={classes.mainDiv}
                xlinkHref="/static/img/ring.png"
              ></image>
              <image
                className={classes.mainDiv}
                xlinkHref="/static/img/uxlogo.png"
                x="45%"
                y="75%"
                height="30"
                width="30"
              ></image>
              <g>
                {renderTicks(opts)}
                {renderText(opts)}
                {renderNeedle(opts)}
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(inject("store")(observer(GaugeComponent)));
