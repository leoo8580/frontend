import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.grey[100],
  },
}));

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <StyledLink to="/">
            Vaccination Tracker
          </StyledLink>
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/vaccines" sx={{ mx: 1 }}>
            Vaccines
          </Button>
          <Button color="inherit" component={Link} to="/patients" sx={{ mx: 1 }}>
            Patients
          </Button>
          <Button color="inherit" component={Link} to="/records" sx={{ mx: 1 }}>
            Records
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;