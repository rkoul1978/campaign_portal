import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Input, FormControl, FormLabel, Select, Option, Button, IconButton, Typography } from '@mui/joy';
import { Card, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination }  from '@mui/material';
import { useTheme } from '@mui/system';
import PropTypes from 'prop-types';
import { FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight, ChevronRightRounded }   from '@mui/icons-material';
import { getCampaignData } from '../../actions/CampaignsAction';
import CampaignAndImages from './CampaignAndImages';

const AllCampaigns = ({campaignData, getCampaignData, handleSelect})=>{

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filter,setFilter] = useState('');
    const [campaignID, setCampaignID] = useState(null);

    useEffect(() =>{
        getCampaignData("https://dummyjson.com/products");
    },[getCampaignData]);

    const filterChange = (e) => {
        setFilter(e.target.value);
        getCampaignData('https://dummyjson.com/products/search?q='+e.target.value);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openCampaignID = (campaignID) => {
        setCampaignID(campaignID);
    }
    return(
        campaignID !== null ? <CampaignAndImages campaignID={ campaignID} setCampaignID={setCampaignID} handleSelect={handleSelect}/> :
        <Box
            sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
                marginLeft:3,
                marginRight:3,
                marginBottom:3,
                width: '100%',
                height: 'auto',
            },
            }}
         >
            <Card>
                <Typography level="h2" sx={{ fontSize: 'xl', m: 2 }}>
                    All Campaigns
                </Typography>
                <FormControl orientation="vertical" sx={{ m:2,width:'50%' }}>
                    <FormLabel>Search for a Brand Display Name, Campaign Title, Campaign Code</FormLabel>
                    <Input label="" variant="outlined" value={ filter } onInput={ filterChange } autoFocus/>
                </FormControl>
            </Card>
            <Card>
                <div className="row">
                    <div className="col-2">
                        <FormControl orientation="vertical" sx={{ m:2,width:'100%' }}>
                                <FormLabel>Sort</FormLabel>
                                <Select 
                                    value="Last Modified"
                                >
                                    <Option value='Last Modified'>
                                        Last Modified
                                    </Option>
                                </Select>
                        </FormControl>
                    </div>
                    <div className="col-2">
                        <FormControl orientation="vertical" sx={{ m:2,width:'100%' }}>
                            <FormLabel>Status</FormLabel>
                            <Select 
                                value="All"
                            >
                                <Option value='All'>
                                    All
                                </Option>
                                <Option value='Active'>
                                    Active
                                </Option>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-2">
                        <FormControl orientation="vertical" sx={{ marginTop:5.2,marginLeft:2,width:'50%' }}>
                            <Button variant="outlined">Reset</Button>
                        </FormControl>
                    </div>
                </div> 
                <TableContainer style={{ height: '350px'}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
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
                                <TableCell style={{ width: 100 }}>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                 (rowsPerPage > 0
                                    ? campaignData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : campaignData
                                  ).map((campaign) => {
                                    return (
                                        <TableRow key={campaign.id}>
                                            <TableCell style={{ width: 50 }}>
                                                {campaign.title} 
                                            </TableCell>
                                            <TableCell style={{ width: 50 }}>
                                                {campaign.description} 
                                            </TableCell>
                                            <TableCell style={{ width: 100 }}>
                                                {campaign.price}
                                            </TableCell>
                                            <TableCell style={{ width: 100 }}>
                                                {campaign.brand}
                                            </TableCell>
                                            <TableCell style={{ width: 100 }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="green" className="bi bi-circle-fill" viewBox="0 0 18 18" style={{marginRight:5}}>
                                                    <circle cx="8" cy="8" r="8"/>
                                                </svg> 
                                                {campaign.stock} 
                                            </TableCell>
                                            <TableCell>
                                                <a href="#" onClick = { () => openCampaignID(campaign.id) }>
                                                    <ChevronRightRounded style={{ fontSize:30}}/>
                                                </a>
                                                
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
                    count={campaignData.length}
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
    campaignData: state.campaignReducer.campaignData
});

const mapDispatchToProps = (dispatch) =>({
    getCampaignData: (url) => dispatch(getCampaignData(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCampaigns);