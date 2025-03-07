import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { FormControl, Checkbox, Button, IconButton, Typography } from '@mui/joy';
import { Card, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination }  from '@mui/material';
import { useTheme } from '@mui/system';
import PropTypes from 'prop-types';
import { FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight }   from '@mui/icons-material';
import { getTemplateData } from '../../actions/TemplatesAction';

const CampaignTemplates = ({templateData, getTemplateData}) =>{

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() =>{
        getTemplateData("https://dummyjson.com/products");
    },[getTemplateData]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const handleClick = (event, row) => {
        const selectedIndex = selectedRows.indexOf(row);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selectedRows, row);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
          newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selectedRows.slice(0, selectedIndex),
            selectedRows.slice(selectedIndex + 1),
          );
        }
        setSelectedRows(newSelected);
    }

    const isSelected = (row) => selectedRows.indexOf(row) !== -1;

    const onSelectAllClick = (event) => {
       if (event.target.checked) {
            const newSelected = templateData.map((row) => row);
            setSelectedRows(newSelected);
            return;
          }
        setSelectedRows([]);
    };

    return (
        <Box
            sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
                ml:3,
                mr:3,
                mb:2,
                mt:0.5,
                width: '100%',
                height: 'auto',
            },
            }}
         >
            <Card>
                <div className="row">
                    <div className="col-3">
                        <Typography level="h2" sx={{ fontSize: 'xl', m: 2 }}>
                            Campaigns Templates
                        </Typography>
                    </div>
                    <div className="col-3">
                        <FormControl orientation="vertical" sx={{ margin:2,width:'75%' }}>
                            <Button >Create Template</Button>
                        </FormControl>
                    </div>
                    <div className="col-3">
                        <FormControl orientation="vertical" sx={{ marginTop:2,marginLeft:-4,width:'75%' }}>
                            <Button>Create Campaign</Button>
                        </FormControl>
                    </div>
                    <div className="col-3">
                        <FormControl orientation="vertical" sx={{ marginTop:2,marginLeft:-10,width:'75%' }}>
                            <Button>Delete Template</Button>
                        </FormControl>
                    </div>
                </div> 
            </Card>
            <Card>
                <TableContainer style={{ height: '350px'}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox style={{ marginTop: 5 }}
                                        color="primary" 
                                        onChange={onSelectAllClick}
                                        checked={ selectedRows.length === templateData.length}
                                    />
                                </TableCell>
                                <TableCell style={{ width: 50 }}>
                                    <b>Title</b>
                                </TableCell>
                                <TableCell style={{ width: 50 }}>
                                    <b>Description</b>
                                </TableCell>
                                <TableCell style={{ width: 100 }}>
                                    <b>Price</b>
                                </TableCell>
                                <TableCell style={{ width: 100 }}>
                                    <b>Brand</b>
                                </TableCell>
                                <TableCell style={{ width: 100 }}>
                                    <b>Stock</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                 (rowsPerPage > 0
                                    ? templateData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : templateData
                                  ).map((row) => {
                                    const isItemSelected = isSelected(row);
                                    return (
                                        <TableRow key={row.id} selected={isItemSelected} onClick={(event) => handleClick(event, row)}>
                                            <TableCell style={{ width: 100 }} component="th" scope="row">
                                                <Checkbox color="primary" checked={isItemSelected} />
                                            </TableCell>
                                            <TableCell style={{ width: 50 }}>
                                                {row.title} 
                                            </TableCell>
                                            <TableCell style={{ width: 50 }}>
                                                {row.description} 
                                            </TableCell>
                                            <TableCell style={{ width: 100 }}>
                                                {row.price}
                                            </TableCell>
                                            <TableCell style={{ width: 100 }}>
                                                {row.brand}
                                            </TableCell>
                                            <TableCell style={{ width: 100 }}>
                                                {row.stock}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    component="div"
                    colSpan={0}
                    count={templateData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </Card>
        </Box>
    );
}

const TablePaginationActions = (props) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
        </IconButton>
      </Box>
    );
}
  
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
    templateData: state.templateReducer.templateData
});

const mapDispatchToProps = (dispatch) =>({
    getTemplateData: (url) => dispatch(getTemplateData(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignTemplates);