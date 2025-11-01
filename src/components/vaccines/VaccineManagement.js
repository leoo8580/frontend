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
  IconButton,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

const VaccineManagement = () => {
  const [vaccines, setVaccines] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [formData, setFormData] = useState({
    name: '',
    recommendedAge: '',
    doses: '',
    interval: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vaccines');
      setVaccines(response.data);
    } catch (error) {
      console.error('Error fetching vaccines:', error);
      setSnackbar({
        open: true,
        message: 'Error fetching vaccines. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleOpen = (vaccine = null) => {
    if (vaccine) {
      setFormData(vaccine);
      setEditingId(vaccine._id);
    } else {
      setFormData({
        name: '',
        recommendedAge: '',
        doses: '',
        interval: '',
      });
      setEditingId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: '',
      recommendedAge: '',
      doses: '',
      interval: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/vaccines/${editingId}`, formData);
        setSnackbar({
          open: true,
          message: 'Vaccine updated successfully!',
          severity: 'success'
        });
      } else {
        await axios.post('http://localhost:5000/api/vaccines', formData);
        setSnackbar({
          open: true,
          message: 'Vaccine added successfully!',
          severity: 'success'
        });
      }
      fetchVaccines();
      handleClose();
    } catch (error) {
      console.error('Error saving vaccine:', error);
      setSnackbar({
        open: true,
        message: 'Error saving vaccine. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vaccine?')) {
      try {
        await axios.delete(`http://localhost:5000/api/vaccines/${id}`);
        setSnackbar({
          open: true,
          message: 'Vaccine deleted successfully!',
          severity: 'success'
        });
        fetchVaccines();
      } catch (error) {
        console.error('Error deleting vaccine:', error);
        setSnackbar({
          open: true,
          message: 'Error deleting vaccine. Please try again.',
          severity: 'error'
        });
      }
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Vaccine Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          startIcon={<AddIcon />}
        >
          Add Vaccine
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell>Name</TableCell>
              <TableCell>Recommended Age</TableCell>
              <TableCell>Doses</TableCell>
              <TableCell>Interval</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vaccines.map((vaccine) => (
              <TableRow key={vaccine._id} hover>
                <TableCell>{vaccine.name}</TableCell>
                <TableCell>{vaccine.recommendedAge}</TableCell>
                <TableCell>{vaccine.doses}</TableCell>
                <TableCell>{vaccine.interval}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(vaccine)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(vaccine._id)}
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
      >
        <DialogTitle sx={{ bgcolor: 'primary.light', color: 'white' }}>
          {editingId ? 'Edit Vaccine' : 'Add New Vaccine'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Recommended Age"
              value={formData.recommendedAge}
              onChange={(e) => setFormData({ ...formData, recommendedAge: e.target.value })}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Doses"
              type="number"
              value={formData.doses}
              onChange={(e) => setFormData({ ...formData, doses: e.target.value })}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
              fullWidth
              label="Interval"
              value={formData.interval}
              onChange={(e) => setFormData({ ...formData, interval: e.target.value })}
              margin="normal"
              required
              variant="outlined"
              helperText="Enter interval between doses (e.g., '4 weeks')"
            />
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

export default VaccineManagement;