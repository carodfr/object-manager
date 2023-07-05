import { Box, Button, Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectManagedObjects } from "../store/slices/objectManagementSlice";
import ManagedObject from "../types/ManagedObject";

interface Props {
    /** the current managed objects */
    managedObjects:  Record<string, ManagedObject>
    /** the string value to search */
    searchValue: string;
    /** function to change the search value */
    setSearchValue: (search:string)=>void;
}

export default function Menubar(props: Props){
    const {managedObjects, searchValue, setSearchValue} = props;
    const [createDialogVisiblity, setCreateDialogVisibility] = useState<boolean>(false);
    return (
<Box height="100px" sx={{display: 'flex', flexDirection: 'row'}}>
<Box sx={{display: 'flex', flexGrow:1}}>
<Button variant="outlined" color="error">New Object</Button>
</Box>
<Box sx={{display: 'flex', flexGrow:1}}>
<Autocomplete
id="search"
freeSolo
options={Object.values(managedObjects).map((currentValue: ManagedObject) => currentValue.name)}
renderInput={(params) => <TextField {...params} label="Search" />}
/>
</Box>
</Box>);
}