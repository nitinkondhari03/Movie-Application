import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
      <Box
      
    >
      <Typography variant="h1" >
        404
      </Typography>
      <Typography variant="h6" >
        Oops... Page Not Found.
      </Typography>
      <Link to="/">
      <Button mt="20px" variant="contained">Back Home</Button></Link>
    </Box>
  );
};

export default PageNotFound;
