import { Box } from "@mui/material";
import Menubar from "../components/Menubar";
import StyledTable from "../components/StyledTable";
import { selectManagedObjects } from "../store/slices/objectManagementSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function MainPanel(){
  const [searchValue, setSearchValue] = useState<string>('');
  const managedObjects= useSelector(selectManagedObjects);
  const shownObjects = searchValue? managedObjects: managedObjects;

  return (<Box height="100px" sx={{display: 'flex', flexDirection: 'column'}}>
    <Menubar searchValue={searchValue} setSearchValue={setSearchValue} managedObjects={managedObjects}/>
    <StyledTable managedObjects={shownObjects}/>
  </Box>);
}
