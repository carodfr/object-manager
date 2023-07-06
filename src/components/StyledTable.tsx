import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ManagedObject from '../types/ManagedObject';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import ManagedObjectDialog from '../dialogs/ManagedObjectDialog';
import { deleteObject, updateObject } from '../store/slices/objectManagementSlice';

interface Props {
  /** the current managed objects */
  managedObjects: Record<string, ManagedObject>
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ef4c51',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function StyledTable(props: Props) {
  const { managedObjects } = props;
  const [updateId, setUpdateId] = React.useState<string>('');
  const dispatch = useDispatch();

  const ManagedObjectRow = (entry: { id: string; name: string; description: string; type: string; relations: string }) => {
    const { id, name, description, type, relations } = entry;
    return (
      <StyledTableRow key={id}>
        <StyledTableCell component="th" scope="row">
          {name}
        </StyledTableCell>
        <StyledTableCell align="right">{description}</StyledTableCell>
        <StyledTableCell align="right">{type}</StyledTableCell>
        <StyledTableCell align="right">{relations}</StyledTableCell>
        <StyledTableCell align="right"><Button variant="text" onClick={() => setUpdateId(id)}>Update</Button></StyledTableCell>
        <StyledTableCell align="right"><Button variant="text" onClick={() => dispatch(deleteObject(id))}>Delete</Button></StyledTableCell>
      </StyledTableRow>);
  };

  const orderedEntries = Object.keys(managedObjects).map((currentKey: string) => {
    const id = currentKey;
    const { name, description, type, relations } = managedObjects[id];
    return { id, name, description, type: type as string, relations: relations.join(',') }
  }).sort((a, b) => a.name.localeCompare(b.name));

  const onUpdateObject = (updatedObject: ManagedObject) => {
    dispatch(updateObject({ id: updateId, updatedObject }));
    setUpdateId('');
  };


  return (
    <>
      {!!updateId && (<ManagedObjectDialog onSave={onUpdateObject} onClose={() => setUpdateId('')} initialId={updateId} />)}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Type</StyledTableCell>
              <StyledTableCell align="right">Relations</StyledTableCell>
              <StyledTableCell align="right" />
              <StyledTableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedEntries.map((entry) => ManagedObjectRow(entry))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}