import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Box, TextField, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useDataProvider } from 'react-admin';
import AttendanceChart from './AttendanceChart';
import AbsenChart from './AbsenChart';
import AlfaChart from './AlfaChart';
import DinasChart from './DinasChart';
import IzinChart from './IzinChart';

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);
  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await dataProvider.getList('users', {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'name', order: 'ASC' },
        filter: {},
      });
      setUsers([{ id: '', name: 'All Users' }, ...data]);
    };

    fetchUsers();
  }, [dataProvider]);

  return (
    <Box>
      <Box mb={2} display="flex" justifyContent="center" alignItems="center">
        <DatePicker
          views={['year', 'month']}
          label="Select Month"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(dayjs(newValue))}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        <TextField
          select
          label="Select User"
          value={selectedUser}
          onChange={(event) => setSelectedUser(event.target.value)}
          style={{ marginLeft: 16 }}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Card>
        <CardHeader title="Dashboard" />
        <CardContent>
          <Box mb={4}>
            <AttendanceChart selectedDate={selectedDate} selectedUser={selectedUser} />
          </Box>
          <Box display="flex" justifyContent="space-between" mb={4}>
            <Box width="48%">
              <AbsenChart selectedDate={selectedDate} selectedUser={selectedUser} />
            </Box>
            <Box width="48%">
              <AlfaChart selectedDate={selectedDate} selectedUser={selectedUser} />
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box width="48%">
              <DinasChart selectedDate={selectedDate} selectedUser={selectedUser} />
            </Box>
            <Box width="48%">
              <IzinChart selectedDate={selectedDate} selectedUser={selectedUser} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardPage;
