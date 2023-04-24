import * as React from 'react';
import { Box, Collapse, IconButton, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import api from '../utilities/api';
import fileDownload from 'js-file-download';

const dateFormat = date => {
  date = new Date(date);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

const BlankPreview = () => {
  return (
    <Box sx={{height: 492, display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
  )
}

const columns = [
  { id: 'type', label: 'Type', minWidth: 50 },
  { id: 'name', label: 'Chart Name', minWidth: 100 },
  { id: 'createdOn', label: 'Created on', minWidth: 100, format: dateFormat },
];

const Row = props => {
  const { row, onChangePreview } = props;
  const [open, setOpen] = React.useState(false);

  const handlePreview = options => {
    onChangePreview(BlankPreview);
    setTimeout(() => {
      onChangePreview(
        <HighchartsReact highcharts={highcharts} options={{...options, chart:{...options.chart, height: 492, width: 730}}} />
      )
    }, 10);
  }

  const handleDownload = type => {
    axios.get(`${api}/chart/download/${row._id}?type=${type}`, {
      responseType: 'blob'
    }).then(response => {
      fileDownload(response.data, `chart-${row._id}.${type}`);
    }).catch(error => {
      console.error(error);
    });
  };

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
              {column.format ? column.format(value) : value}
            </TableCell>
          );
        })}
        <TableCell>
          <Button onClick={() => handlePreview(row.options)}>Preview</Button>
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
                    <TableCell>{<Button variant='contained' size='small' onClick={() => handleDownload('pdf')}>Download</Button>}</TableCell>
                    <TableCell>{<Button variant='contained' size='small' onClick={() => handleDownload('png')}>Download</Button>}</TableCell>
                    <TableCell>{<Button variant='contained' size='small' onClick={() => handleDownload('svg')}>Download</Button>}</TableCell>
                    <TableCell>{<Button variant='contained' size='small' onClick={() => handleDownload('html')}>Download</Button>}</TableCell>
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
  const { onChangePreview, charts } = props;
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
            {charts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <Row row={row} key={row.createdOn} onChangePreview={onChangePreview} />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={charts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}