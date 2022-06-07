import { useEffect, useState } from "react";
import useWindowSize from "./hooks/useWindowsize";
import "./App.scss";

export default function Chart(props: any) {
  const { mode, data, color } = props;
  const { width, height } = useWindowSize();

  const barWidth: number = width / (data.length ?? 1);
  const randomColor = (i: number) => {
    return Math.floor(Math.random() * i * 16777215).toString(16);
  };

  let svgHeight = Math.max(...data) < height ? Math.max(...data) : height - 130;

  const drawPieSlice = (
    ctx: any,
    centerX: any,
    centerY: any,
    radius: any,
    startAngle: any,
    endAngle: any,
    color: any
  ) => {
    console.log("object", startAngle, "-----", endAngle);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  };
  var canvas: HTMLCanvasElement = document.getElementById("myCanvas");
  const countSum = (arr: Array<number>, time: number) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      if (i < time) {
        sum += arr[i];
      }
    }
    return sum;
  };

  useEffect(() => {
    if (mode === "pie" && canvas && data.length > 0) {
      var ctx = canvas.getContext("2d");

      const sumData = data.reduce((total: any, num: any) => {
        return total + num;
      }, 0);
      let prevStart = 0;
      ctx?.beginPath();
      for (let i = 0; i < data.length; i++) {
        drawPieSlice(
          ctx,
          150,
          150,
          150,
          prevStart,
          (Math.PI * 2 * data[i]) / sumData + prevStart,
          "#" + randomColor(i)
        );
        prevStart = (Math.PI * 2 * data[i]) / sumData + prevStart;
      }
    }
  }, [canvas]);

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
                  y2={svgHeight - data[i + 1]}
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

  return (
    <canvas
      id="myCanvas"
      width={300}
      height={300}
      style={{ transform: "rotate(-90deg)" }}
    ></canvas>
  );
}
