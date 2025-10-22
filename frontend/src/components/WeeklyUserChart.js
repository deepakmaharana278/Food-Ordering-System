import React, { useEffect, useState } from "react";
import {  Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart } from "recharts";

const WeeklyUserChart = () => {

    const [data, setData] = useState([]);
    
      useEffect(() => {
        fetch("http://127.0.0.1:8000/api/weekly-user-registration/")
          .then((res) => res.json())
          .then((data) => {
            setData(data);
          });
      }, []);

  return (
    <div className="card- p-3 shadow">
          <h5 className="text-primary">Weekly New Users</h5>
          <ResponsiveContainer height={300} width="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip/>
              <Line type="monotone" dataKey="new_users" fill="#0a42cfff"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
  )
}

export default WeeklyUserChart