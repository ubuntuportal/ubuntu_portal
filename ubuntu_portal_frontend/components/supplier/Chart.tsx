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
    2023: 4000,
    2024: 2400,
  },
  {
    name: "Feb",
    2023: 3000,
    2024: 1398,
  },
  {
    name: "Mar",
    2023: 2000,
    2024: 9800,
  },
  {
    name: "Apr",
    2023: 2780,
    2024: 3908,
  },
  {
    name: "May",
    2023: 1890,
    2024: 4800,
  },
  {
    name: "Jun",
    2023: 2390,
    2024: 3800,
  },
  {
    name: "Jul",
    2023: 3490,
    2024: 4300,
  },
  {
    name: "Aug",
    2023: 3490,
    2024: 4300,
  },
  {
    name: "Sep",
    2023: 3490,
    2024: 4300,
  },
  {
    name: "Oct",
    2023: 3490,
    2024: 4300,
  },
  {
    name: "Nov",
    2023: 4920,
    2024: 3920,
  },
  {
    name: "Dec",
    2023: 3490,
    2024: 4300,
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
