import React, { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

const AttendanceChart = ({ selectedDate, selectedUser }) => {
  const dataProvider = useDataProvider();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const startOfMonth = selectedDate.startOf('month').toISOString();
      const endOfMonth = selectedDate.endOf('month').toISOString();

      console.log('Fetching data for range:', startOfMonth, 'to', endOfMonth);

      const filter = { date_gte: startOfMonth, date_lte: endOfMonth };
      if (selectedUser) {
        filter.uid = selectedUser;
      }

      const { data } = await dataProvider.getList('attendance', {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'date', order: 'ASC' },
        filter,
      });

      console.log('Raw data:', data);

      const statusCountByDate = data.reduce((acc, record) => {
        const date = record.date.split('T')[0];
        if (!acc[date]) {
          acc[date] = { date, absen: 0, alfa: 0, izin: 0, dinas: 0 };
        }
        acc[date][record.attendanceStatus] += 1;
        return acc;
      }, {});

      const chartData = Object.values(statusCountByDate);
      console.log('Processed chart data:', chartData);

      setData(chartData);
    };

    fetchData();
  }, [dataProvider, selectedDate, selectedUser]);

  return (
    <Box>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(date) => dayjs(date).format('D')} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="absen" stroke="#8884d8" />
          <Line type="monotone" dataKey="alfa" stroke="#82ca9d" />
          <Line type="monotone" dataKey="izin" stroke="#ffc658" />
          <Line type="monotone" dataKey="dinas" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AttendanceChart;
