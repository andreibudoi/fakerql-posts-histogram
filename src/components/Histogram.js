import React from "react";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleLinear, scaleBand } from "@visx/scale";
import { LinearGradient } from "@visx/gradient";

const verticalMargin = 50;

// accessors
const x = (d) => d.month;
const y = (d) => d.posts;

const Histogram = ({ dataSet, width, height }) => {
    const xMax = width;
    const yMax = height - verticalMargin;

    // And then scale the graph by our data
    const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: dataSet.map(x),
        padding: 0.4,
    });
    const yScale = scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...dataSet.map(y))],
    });

    // Compose together the scale and accessor functions to get point functions
    const compose = (scale, accessor) => (dataSet) => scale(accessor(dataSet));
    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);

    return (
        <svg width={width} height={height}>
            <LinearGradient id="pink" from="#EE9DD4" to="#FBF7FB" />
            <rect width={width} height={height} fill="url(#pink)" rx={7} />
            <Group top={verticalMargin / 2}>
                <AxisLeft
                    scale={yScale}
                    top={0}
                    left={0}
                    label={"Close Price ($)"}
                    stroke={"#1b1a1e"}
                    tickTextFill={"#1b1a1e"}
                />
                {dataSet.map((d, i) => {
                    const barHeight = yMax - yPoint(d);
                    return (
                        <Group key={`bar-${i}`}>
                            <Bar
                                x={xPoint(d)}
                                y={yMax - barHeight}
                                height={barHeight}
                                width={xScale.bandwidth()}
                                fill="#E535AB"
                            />
                        </Group>
                    );
                })}
                <AxisBottom
                    scale={xScale}
                    top={yMax}
                    label={"Months"}
                    stroke={"#1b1a1e"}
                    tickTextFill={"#1b1a1e"}
                />
            </Group>
        </svg>
    );
};

export default Histogram;
