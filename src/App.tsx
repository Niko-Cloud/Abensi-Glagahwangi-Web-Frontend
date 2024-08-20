import React from 'react';
import { Admin, Resource } from 'react-admin';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { dataProvider } from './dataProvider/dataProvider';

import UserIcon from '@mui/icons-material/Group';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ReceiptLong from '@mui/icons-material/ReceiptLong';
import Assignment from '@mui/icons-material/Assignment';
import Fingerprint from '@mui/icons-material/Fingerprint';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import TerrainIcon from '@mui/icons-material/Terrain';
import SummarizeIcon from '@mui/icons-material/Summarize';

import { authProvider } from './auth/authProvider';

import DashboardPage from './dashboard/DashboardPage';
import { HolidayCreatePage, HolidayEditPage, HolidaysListPage } from './holidays';
import { UserListPage, userEditPage, userCreatePage, UserDetailPage } from './users';
import { PermissionListPage } from './permission/PermissionListPage';
import { DinasListPage } from './dinas/DinasListPage';

import { Tabs, Tab, Box } from '@mui/material';
import { AttendanceAllListPage } from './attendance/AttendanceAllListPage';
import { AttendanceInListPage } from './attendance/AttendanceInListPage';
import { AttendanceOutListPage } from './attendance/AttendanceOutListPage';
import { ForgotAttendanceListPage } from './forgot_attendance/ForgotAttendanceListPage';
import { OvertimeListPage } from './overtime/OvertimeListPage';
import { MapListPage } from './pengaturan/MapListPage';
import { MapEditPage } from './pengaturan/MapEditPage';
import LoginPage from '././auth/LoginPage';
import { LogListPage } from './log/logListPage';

const AttendanceTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} aria-label="attendance tabs">
        <Tab label="All" />
        <Tab label="In" />
        <Tab label="Out" />
      </Tabs>
      {value === 0 && <AttendanceAllListPage />}
      {value === 1 && <AttendanceInListPage />}
      {value === 2 && <AttendanceOutListPage />}
    </Box>
  );
};

export const App = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Admin dataProvider={dataProvider} authProvider={authProvider} dashboard={DashboardPage} loginPage={LoginPage}>
      <Resource name="users" list={UserListPage} show={UserDetailPage} recordRepresentation="name" edit={userEditPage} create={userCreatePage} icon={UserIcon} options={{ label: 'Pengguna' }} />
      <Resource name="attendance" list={AttendanceTab} icon={Fingerprint} options={{ label: 'Absensi' }} />
      <Resource name="holidays" list={HolidaysListPage} create={HolidayCreatePage} edit={HolidayEditPage} icon={CelebrationIcon} options={{ label: 'Hari Libur' }} />
      <Resource name="dinas" list={DinasListPage} icon={Assignment} options={{ label: 'Izin Dinas' }} />
      <Resource name="permissions" list={PermissionListPage} icon={ReceiptLong} options={{ label: 'Izin Non-Dinas' }} />
      <Resource name="overtimes" list={OvertimeListPage} icon={MoreTimeIcon} options={{ label: 'Jam Lembur' }} />
      <Resource name="forgot_attendance" list={ForgotAttendanceListPage} icon={SupportAgentIcon} options={{ label: 'Lupa Absensi' }} />
      <Resource name="geofence" list={MapListPage} edit={MapEditPage} icon={TerrainIcon} options={{ label: 'Pengaturan' }} />
      <Resource name="logs" list={LogListPage} icon={SummarizeIcon} options={{ label: 'Log' }} />
    </Admin>
  </LocalizationProvider>
);
