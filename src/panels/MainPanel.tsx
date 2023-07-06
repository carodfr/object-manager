import { Box, Typography } from "@mui/material";
import Menubar from "../components/Menubar";
import StyledTable from "../components/StyledTable";
import { selectManagedObjects } from "../store/slices/objectManagementSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import ManagedObject from "../types/ManagedObject";

export default function MainPanel() {
  const [searchValue, setSearchValue] = useState<string>('');
  const managedObjects = useSelector(selectManagedObjects);
  const shownObjects = searchValue ? Object.keys(managedObjects).reduce((currentResults: Record<string, ManagedObject>, currentId: string) => {
    const currentObject: ManagedObject = managedObjects[currentId];
    if (managedObjects[currentId].name.includes(searchValue)) {
      currentResults[currentId] = currentObject;
    }
    return currentResults;
  }, {}) : managedObjects;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Menubar searchValue={searchValue} setSearchValue={setSearchValue} managedObjects={managedObjects} />
      <StyledTable managedObjects={shownObjects} />
      {!(Object.keys(shownObjects).length) && (<Typography>No entries found</Typography>)}
    </Box>);
}
