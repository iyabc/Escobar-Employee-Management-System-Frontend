import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Attendance from '../../data/attendance.json';

export default function AttendanceTable({type}) {
  return (
    <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
                {Attendance.type.map((item) => (
                    <TableCell
                    key={item.id}
                    align={item.align}
                    style={{ minWidth: item.minWidth }}
                  >
                    {item.label}
                  </TableCell>
                ))}
            </TableRow>
            </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
