import React from 'react';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';

const DashboardContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const DashboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: '3rem',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
  width: '100%',
});

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Typography variant="h4" gutterBottom>
        My Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
        Manage your vaccines, patients, and vaccination records
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <StyledLink to="/vaccines">
            <DashboardPaper elevation={3}>
              <IconWrapper>
                <VaccinesIcon fontSize="inherit" />
              </IconWrapper>
              <Typography variant="h6" color="primary" gutterBottom>
                Vaccines
              </Typography>
              <Typography>
                Manage vaccine information and track available vaccines
              </Typography>
            </DashboardPaper>
          </StyledLink>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledLink to="/patients">
            <DashboardPaper elevation={3}>
              <IconWrapper>
                <PeopleIcon fontSize="inherit" />
              </IconWrapper>
              <Typography variant="h6" color="primary" gutterBottom>
                Patients
              </Typography>
              <Typography>
                Register and manage patient information
              </Typography>
            </DashboardPaper>
          </StyledLink>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledLink to="/records">
            <DashboardPaper elevation={3}>
              <IconWrapper>
                <AssignmentIcon fontSize="inherit" />
              </IconWrapper>
              <Typography variant="h6" color="primary" gutterBottom>
                Records
              </Typography>
              <Typography>
                Track vaccination records and schedule appointments
              </Typography>
            </DashboardPaper>
          </StyledLink>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard;