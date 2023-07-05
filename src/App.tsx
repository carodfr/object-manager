import React from 'react';
import './App.css';
import { Box, Typography } from '@mui/material';
import CustomFooter from './panels/CustomFooter';
import MainPanel from './panels/MainPanel';

function App() {
  return (
<Box width={1} sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
<Box height="100px" sx={{display: 'flex', backgroundColor: 'white'}}>
  <Typography variant="h1" style={{color: '#d2052e'}}>
    ...S
  </Typography>
  </Box>
  <Box sx={{display: 'flex', flexGrow: 1, padding: 4, backgroundColor: '#ebeaf0'}}>
  <MainPanel/>
</Box>
<Box height="100px" sx={{display: 'flex', backgroundColor: '#1c1c1c'}}>
<CustomFooter/>
</Box>
</Box>
  );
}

export default App;
