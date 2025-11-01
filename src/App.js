import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import VaccineManagement from './components/vaccines/VaccineManagement';
import PatientManagement from './components/patients/PatientManagement';
import VaccinationRecords from './components/records/VaccinationRecords';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00acc1',
      light: '#33bbcf',
      dark: '#007887',
    },
    secondary: {
      main: '#f50057',
      light: '#f73378',
      dark: '#ab003c',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vaccines" element={<VaccineManagement />} />
          <Route path="/patients" element={<PatientManagement />} />
          <Route path="/records" element={<VaccinationRecords />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
