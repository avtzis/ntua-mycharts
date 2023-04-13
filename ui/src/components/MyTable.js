import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Collapse, IconButton, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import options from '../temp/chart-options1.json'

const columns = [
  { id: 'type', label: 'Type', minWidth: 50 },
  { id: 'name', label: 'Chart Name', minWidth: 100 },
  { id: 'created', label: 'Created on', minWidth: 100 },
];

function createData(type, name, created) {
  return { type, name, created };
}

const rows = [
  createData('line', 'Historic World Population by Region', '22/03/2023 14:24'),
];

const Row = props => {
  const { row, onChangePreview } = props;
  const [open, setOpen] = React.useState(false);

  const handlePreview = () => {
    onChangePreview(
      <HighchartsReact highcharts={highcharts} options={{...options, chart:{...options.chart, height: 492}}} />
    )
  }

  return (
    <React.Fragment>
      <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {column.format && typeof value === 'number'
                ? column.format(value)
                : value}
            </TableCell>
          );
        })}
        <TableCell>
          <Button onClick={handlePreview}>Preview</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{m: 1}}>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>pdf</TableCell>
                    <TableCell>png</TableCell>
                    <TableCell>svg</TableCell>
                    <TableCell>html</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{<Button variant='contained' size='small'>Download</Button>}</TableCell>
                    <TableCell>{<Button variant='contained' size='small'>Download</Button>}</TableCell>
                    <TableCell>{<Button variant='contained' size='small'>Download</Button>}</TableCell>
                    <TableCell>{<Button variant='contained' size='small'>Download</Button>}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function StickyHeadTable(props) {
  const { onChangePreview } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <Row row={row} key={row.code} onChangePreview={onChangePreview} />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}