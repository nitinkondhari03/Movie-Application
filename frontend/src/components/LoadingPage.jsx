import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const LoadingPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
        width:"100%",
        backgroundColor: 'white',
        color: 'black',
      }}
    >
      <CircularProgress
        size={80}
        thickness={4}
        sx={{
          color: '#ff6f61',
          marginBottom: 3,
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold',
          letterSpacing: 1,
        }}
      >
        Welcome to Movie World
      </Typography>
   
    </Box>
  );
};

export default LoadingPage;
