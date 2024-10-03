"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    2023: 2000,
    2024: 4400,
  },
  {
    name: "Feb",
    2023: 4000,
    2024: 2398,
  },
  {
    name: "Mar",
    2023: 8000,
    2024: 10800,
  },
  {
    name: "Apr",
    2023: 8780,
    2024: 7908,
  },
  {
    name: "May",
    2023: 7890,
    2024: 8800,
  },
  {
    name: "Jun",
    2023: 9390,
    2024: 10800,
  },
  {
    name: "Jul",
    2023: 13490,
    2024: 18300,
  },
  {
    name: "Aug",
    2023: 16490,
    2024: 23300,
  },
  {
    name: "Sep",
    2023: 13490,
    2024: 9300,
  },
  {
    name: "Oct",
    2023: 13490,
    2024: 24300,
  },
  {
    name: "Nov",
    2023: 14920,
    2024: 18920,
  },
  {
    name: "Dec",
    2023: 23490,
    2024: 34300,
  },
];

const RevenueChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Revenue</h1>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="right"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line type="monotone" dataKey="2023" stroke="green" strokeWidth={5} />
          <Line type="monotone" dataKey="2024" stroke="red" strokeWidth={5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
