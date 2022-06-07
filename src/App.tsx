import React from "react";
import Chart from "./Chart";
import Loader from "./Loader/Loader";

export default function App() {
  const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const data1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const color = "#42bcf5";
  return (
    <div>
      <Chart data={data} color={color} mode={"pie"} />
      {/* <Loader /> */}
    </div>
  );
}
