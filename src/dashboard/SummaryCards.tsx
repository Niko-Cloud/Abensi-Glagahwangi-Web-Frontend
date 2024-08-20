import React, { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const SummaryCards = ({ selectedDate, selectedUser }) => {
  const dataProvider = useDataProvider();
  const [summary, setSummary] = useState({ absen: 0, alfa: 0, izin: 0, dinas: 0, lembur: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const startOfMonth = selectedDate.startOf('month').toISOString();
      const endOfMonth = selectedDate.endOf('month').toISOString();

      const attendanceFilter = { date_gte: startOfMonth, date_lte: endOfMonth };
      const overtimeFilter = { date_gte: startOfMonth, date_lte: endOfMonth };

      if (selectedUser) {
        attendanceFilter.uid = selectedUser;
        overtimeFilter.uid = selectedUser;
      }

      try {
        const [attendanceResponse, overtimeResponse] = await Promise.all([
          dataProvider.getList('attendance', {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: 'date', order: 'ASC' },
            filter: attendanceFilter,
          }),
          dataProvider.getList('overtimes', {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: 'date', order: 'ASC' },
            filter: overtimeFilter,
          })
        ]);

        const attendanceData = attendanceResponse.data;
        const overtimeData = overtimeResponse.data;

        const attendanceSummary = attendanceData.reduce((acc, record) => {
          acc[record.attendanceStatus] += 1;
          return acc;
        }, { absen: 0, alfa: 0, izin: 0, dinas: 0 });

        const totalOvertimeDuration = overtimeData.reduce((acc, record) => acc + record.duration, 0);

        setSummary({ ...attendanceSummary, lembur: totalOvertimeDuration });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [dataProvider, selectedDate, selectedUser]);

  return (
    <Grid container spacing={2}>
      {Object.keys(summary).map((key) => (
        <Grid item xs={12} sm={6} md={2.4} key={key}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Typography>
              <Typography variant="h4" component="div">
                {key === 'lembur' ? `${summary[key]} hours` : summary[key]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
