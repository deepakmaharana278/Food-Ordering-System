import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const SalesBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/monthly-sales-summary/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="card- p-3 shadow">
      <h5 className="text-primary">Monthly Sales</h5>
      <ResponsiveContainer height={300} width="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip/>
          <Bar dataKey="sales" fill="#00bfff"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesBarChart;
