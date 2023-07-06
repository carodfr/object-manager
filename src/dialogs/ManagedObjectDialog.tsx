import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ManagedObject from '../types/ManagedObject';
import { selectManagedObjects } from '../store/slices/objectManagementSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ManagedObjectType } from '../types/ManagedObjectType';
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';

interface Props {
  /** function to execute when the save button is pressed */
  onSave: (changedObject: ManagedObject) => void;
  /** function to execute when the close button is pressed */
  onClose: () => void;
  /** the id of the base object */
  initialId?: string;
}

export default function ManagedObjectDialog(props: Props) {
  const { onSave, onClose, initialId } = props;
  const managedObjects = useSelector(selectManagedObjects);
  const [nameField, setNameField] = React.useState<string>('');
  const [descriptionField, setDescriptionField] = React.useState<string>('');
  const [typeField, setTypeField] = React.useState<string>('');
  const [relationsField, setRelationsField] = React.useState<Array<string>>([]);

  useEffect(() => {
    if (initialId) {
      const initialObject = managedObjects[initialId];
      setNameField(initialObject.name);
      setDescriptionField(initialObject.description);
      setTypeField(initialObject.type as string);
      setRelationsField(initialObject.relations);
    }
  }, []);


  const handleReferences = (event: SelectChangeEvent<Array<string>>) => {
    const {
      target: { value },
    } = event;
    setRelationsField(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSave = () => {
    const refreshedObject: ManagedObject = {
      name: nameField,
      description: descriptionField,
      type: typeField as ManagedObjectType,
      relations: relationsField
    }
    onSave(refreshedObject);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Managed Object</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ display: 'flex' }}>
            <TextField sx={{ m: 1, width: 300 }} id="name-input" label="Name" value={nameField}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNameField(event.target.value);
              }} variant="outlined" />
          </Box>

          <Box sx={{ display: 'flex' }}>

            <TextField sx={{ m: 1, width: 300 }} id="description-input" label="Description" value={descriptionField}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDescriptionField(event.target.value);
              }} variant="outlined" />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="type-select-label">Type</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                value={typeField}
                label="Type"
                onChange={(event: SelectChangeEvent) => setTypeField(event.target.value as string)}
              >
                {[ManagedObjectType.Computer, ManagedObjectType.Desk, ManagedObjectType.Human, ManagedObjectType.Keyboard, ManagedObjectType.Server].map((currentType) => (<MenuItem value={currentType}>{currentType}</MenuItem>))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="multiple-relations-label">Relations</InputLabel>
              <Select
                labelId="multiple-relations-label"
                id="multiple-relations"
                multiple
                value={relationsField}
                onChange={handleReferences}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              >
                {Object.keys(managedObjects).map((objectId: string) => (
                  <MenuItem
                    key={managedObjects[objectId].name}
                    value={managedObjects[objectId].name}
                  >
                    {managedObjects[objectId].name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

