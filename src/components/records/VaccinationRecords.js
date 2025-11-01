import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import axios from 'axios';

const VaccinationRecords = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [formData, setFormData] = useState({
    patientId: '',
    vaccineId: '',
    dose: '',
    administered: '',
    nextDue: '',
    status: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRecords();
    fetchPatients();
    fetchVaccines();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/records');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
      setSnackbar({
        open: true,
        message: 'Error fetching records. Please try again.',
        severity: 'error'
      });
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchVaccines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vaccines');
      setVaccines(response.data);
    } catch (error) {
      console.error('Error fetching vaccines:', error);
    }
  };

  const handleOpen = (record = null) => {
    if (record && record.patient && record.vaccine) {
      setFormData({
        patientId: record.patient._id || '',
        vaccineId: record.vaccine._id || '',
        dose: record.dose || '',
        administered: record.administered ? format(new Date(record.administered), 'yyyy-MM-dd') : '',
        nextDue: record.nextDue ? format(new Date(record.nextDue), 'yyyy-MM-dd') : '',
        status: record.status || '',
      });
      setEditingId(record._id);
    } else {
      setFormData({
        patientId: '',
        vaccineId: '',
        dose: '',
        administered: '',
        nextDue: '',
        status: '',
      });
      setEditingId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      patientId: '',
      vaccineId: '',
      dose: '',
      administered: '',
      nextDue: '',
      status: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/records/${editingId}`, formData);
        setSnackbar({
          open: true,
          message: 'Record updated successfully!',
          severity: 'success'
        });
      } else {
        await axios.post('http://localhost:5000/api/records', formData);
        setSnackbar({
          open: true,
          message: 'Record added successfully!',
          severity: 'success'
        });
      }
      fetchRecords();
      handleClose();
    } catch (error) {
      console.error('Error saving record:', error);
      setSnackbar({
        open: true,
        message: 'Error saving record. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:5000/api/records/${id}`);
        setSnackbar({
          open: true,
          message: 'Record deleted successfully!',
          severity: 'success'
        });
        fetchRecords();
      } catch (error) {
        console.error('Error deleting record:', error);
        setSnackbar({
          open: true,
          message: 'Error deleting record. Please try again.',
          severity: 'error'
        });
      }
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Vaccination Records
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          startIcon={<AddIcon />}
        >
          Add Record
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell>Patient</TableCell>
              <TableCell>Vaccine</TableCell>
              <TableCell>Dose</TableCell>
              <TableCell>Administered</TableCell>
              <TableCell>Next Due</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record._id} hover>
                <TableCell>{record.patient?.name || 'Unknown Patient'}</TableCell>
                <TableCell>{record.vaccine?.name || 'Unknown Vaccine'}</TableCell>
                <TableCell>{record.dose || 'N/A'}</TableCell>
                <TableCell>
                  {record.administered ? format(new Date(record.administered), 'MMM dd, yyyy') : 'N/A'}
                </TableCell>
                <TableCell>
                  {record.nextDue ? format(new Date(record.nextDue), 'MMM dd, yyyy') : 'N/A'}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: 
                        record.status === 'Completed' ? 'success.light' :
                        record.status === 'Due' ? 'warning.light' : 'error.light',
                      color: 'white',
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      display: 'inline-block'
                    }}
                  >
                    {record.status}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(record)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(record._id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          elevation: 8,
          sx: { borderRadius: 2 }
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: 'primary.light', color: 'white' }}>
          {editingId ? 'Edit Record' : 'Add New Record'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal" required sx={{ mb: 2 }}>
              <InputLabel>Patient</InputLabel>
              <Select
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                label="Patient"
              >
                {patients.map((patient) => (
                  <MenuItem key={patient._id} value={patient._id}>
                    {patient.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required sx={{ mb: 2 }}>
              <InputLabel>Vaccine</InputLabel>
              <Select
                value={formData.vaccineId}
                onChange={(e) => setFormData({ ...formData, vaccineId: e.target.value })}
                label="Vaccine"
              >
                {vaccines.map((vaccine) => (
                  <MenuItem key={vaccine._id} value={vaccine._id}>
                    {vaccine.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Dose"
              type="number"
              value={formData.dose}
              onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
              fullWidth
              label="Administered Date"
              type="date"
              value={formData.administered}
              onChange={(e) => setFormData({ ...formData, administered: e.target.value })}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              label="Next Due Date"
              type="date"
              value={formData.nextDue}
              onChange={(e) => setFormData({ ...formData, nextDue: e.target.value })}
              margin="normal"
              variant="outlined"
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                label="Status"
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Due">Due</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={handleClose}
              variant="outlined"
              color="inherit"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              sx={{ ml: 2 }}
            >
              {editingId ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default VaccinationRecords;