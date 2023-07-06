import { Box, Button, Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addObject, selectManagedObjects } from "../store/slices/objectManagementSlice";
import ManagedObject from "../types/ManagedObject";
import ManagedObjectDialog from "../dialogs/ManagedObjectDialog";

interface Props {
    /** the current managed objects */
    managedObjects: Record<string, ManagedObject>
    /** the string value to search */
    searchValue: string;
    /** function to change the search value */
    setSearchValue: (search: string) => void;
}

export default function Menubar(props: Props) {
    const { managedObjects, searchValue, setSearchValue } = props;
    const [createDialogVisiblity, setCreateDialogVisibility] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onNewObject = (newObject: ManagedObject) => {
        dispatch(addObject(newObject));
        setCreateDialogVisibility(false);
    };

    return (
        <Box width={1} py={1} height="50px" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {createDialogVisiblity && (<ManagedObjectDialog onSave={onNewObject} onClose={() => setCreateDialogVisibility(false)} />)}
            <Box sx={{ display: 'flex' }}>
                <Button variant="outlined" color="error" onClick={() => setCreateDialogVisibility(true)}>New Object</Button>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Autocomplete
                    sx={{ width: 200 }}
                    id="search"
                    inputValue={searchValue}
                    onInputChange={(event, newInputValue) => {
                        setSearchValue(newInputValue);
                    }}
                    freeSolo
                    options={Object.values(managedObjects).map((currentValue: ManagedObject) => currentValue.name)}
                    renderInput={(params) => <TextField {...params} label="Search" />}
                />
            </Box>
        </Box>);
}