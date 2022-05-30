import { useEffect, useState } from "react";
import useWindowSize from "./hooks/useWindowsize";
import './App.css'

export default function Chart(props: any) {
  const { mode, data, color } = props;
  const { width, height } = useWindowSize();

  const barWidth: number = width / (data.length ?? 1);
  let svgHeight = Math.max(...data) < height ? Math.max(...data) : height - 130;

  if (mode === "bars" || mode === undefined) {
    return (
      <div>
        <div style={{ maxWidth: "100%", marginTop: "20px" }}>
          <svg height={svgHeight} width={"100%"}>
            {data.map((element: any, i: number) => {
              return (
                <rect
                  x={barWidth * i}
                  y={element}
                  height={element}
                  width={barWidth}
                  fill={color}
                />
              );
            })}
          </svg>
        </div>
      </div>
    );
  } else if (mode === "line") {
    return (
      <div>
        <div style={{ maxWidth: "100%", marginTop: "20px" }}>
          <svg height={svgHeight} width={"100%"}>
            {data.map((element: any, i: number) => {
              return (
                <line
                  x1={barWidth * i}
                  y1={svgHeight - element}
                  x2={barWidth * (i + 1)}
                  y2={svgHeight - data[i+1]}
                  stroke-width="1"
                  stroke="black"
                />
              );
            })}
          </svg>
        </div>
      </div>
    );
  }
}
