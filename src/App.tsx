import React, { useEffect } from 'react';
import './App.css';
import { Box, Typography } from '@mui/material';
import CustomFooter from './panels/CustomFooter';
import MainPanel from './panels/MainPanel';
import ConstantValues from './ConstantValues';
import { useSelector, useDispatch } from 'react-redux';
import { selectManagedObjects, importManagedObjects } from './store/slices/objectManagementSlice';

function App() {
  const managedObjects = useSelector(selectManagedObjects);
  const dispatch = useDispatch();

  /** retrieves the managed objects from the cache */
  useEffect(() => {
    const storageInformation = localStorage.getItem(ConstantValues.STORAGE_KEY);
    if (storageInformation) {
      dispatch((importManagedObjects(JSON.parse(storageInformation))));
    }
  }, []);

  /** stores the managed objects from the cache */
  useEffect(() => {
    if (Object.keys(managedObjects).length) {
      localStorage.setItem(ConstantValues.STORAGE_KEY, JSON.stringify(managedObjects));
    }
  }, [managedObjects]);

  return (
    <Box width={1} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box height="100px" sx={{ display: 'flex', backgroundColor: 'white' }}>
        <Typography variant="h1" style={{ color: '#d2052e' }}>
          ...S
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexGrow: 1, padding: 4, backgroundColor: '#ebeaf0', justifyContent: 'center' }}>
        <MainPanel />
      </Box>
      <Box height="100px" sx={{ display: 'flex', backgroundColor: '#1c1c1c' }}>
        <CustomFooter />
      </Box>
    </Box>
  );
}

export default App;
