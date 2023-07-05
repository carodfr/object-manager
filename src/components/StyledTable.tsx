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

interface Props {
  /** the current managed objects */
  managedObjects:  Record<string, ManagedObject>
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


const ManagedObjectRow = (entry: {id: string; name: string; description: string; type: string; relations: string }) => {
  const {id, name, description, type, relations } = entry;
return (
  <StyledTableRow key={id}>
  <StyledTableCell component="th" scope="row">
    {name}
  </StyledTableCell>
  <StyledTableCell align="right">{description}</StyledTableCell>
  <StyledTableCell align="right">{type}</StyledTableCell>
  <StyledTableCell align="right">{relations}</StyledTableCell>
</StyledTableRow>);
};

export default function StyledTable(props: Props) {
  const {managedObjects} = props;
  const orderedEntries = Object.keys(managedObjects).map((currentKey: string)=>{
    const id = currentKey;
    const {name, description, type, relations} = managedObjects[id];
    return { id, name, description, type: type as string, relations: relations.map((relationId:string)=>managedObjects[relationId].name).join(',')}
  }).sort((a, b)=>a.name.localeCompare(b.name));
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Relations</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderedEntries.map((entry) => ManagedObjectRow(entry))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}