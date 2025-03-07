import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Button, Typography, FormControl } from '@mui/joy';
import { Card, Divider, Box }  from '@mui/material';
import {  useNavigate } from "react-router-dom";

const CampaignAndImages = ({campaignID, setCampaignID, campaignData, handleSelect}) =>{

   const [campaignRowData, setCampaignRowData] = useState([]);
   const navigate = useNavigate();

   useEffect(() =>{
        let data = campaignData.filter(campaign => campaign.id === campaignID);
        setCampaignRowData(data);
   },[campaignData,campaignID]);

   const editCampaign = () => {
        navigate('/mcp/CreateCampaignDescription',{ state: { campaignRowData: campaignRowData }});
        handleSelect('createCampaign');    // make the 'create campaign' tab active
   }
   return (
            <Box
            sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
                margin:2,
                width: '100%',
                height: 'auto',
            },
            }}
            >
                <Card>
                    <div className="row">
                        <div className="col-2">
                            <FormControl orientation="vertical" sx={{ margin:2,width:'75%' }}>
                                <Button >Preview Campaign</Button>
                            </FormControl>
                        </div>
                        <div className="col-2">
                            <FormControl orientation="vertical" sx={{ marginTop:2,marginLeft:-4,width:'75%' }}>
                                <Button variant="outlined">Cancel Campaign</Button>
                            </FormControl>
                        </div>
                        <div className="col-2">
                            <FormControl orientation="vertical" sx={{ marginTop:2,marginLeft:-10,width:'75%' }}>
                                <Button variant="outlined" onClick={ () => setCampaignID(null)}>
                                    Back
                                </Button>
                            </FormControl>
                        </div>
                    </div> 
                    <Box sx={{ ml: 2, mt:1, mb:1, mr:2, }}>
                        <Divider style={{ border: '1px solid', borderColor: 'divider' }} />
                    </Box>
                    <div className="row">
                        <div className="col-3">
                            <Typography level="h2" sx={{ fontSize: 'xl', m: 2 }}>
                                Campaign Description
                            </Typography>
                        </div>
                        <div className="col-2">
                            <FormControl orientation="vertical" sx={{ mt:2, ml:-5, width:'75%' }}>
                                <Button variant="outlined" onClick={ editCampaign }>
                                    Edit
                                </Button>
                            </FormControl> 
                        </div>
                    </div>
                    
                    <Typography level="h4" sx={{ fontSize: 'lg', ml: 2 }}>
                        Campaign Title:
                    </Typography>
                    <Typography level="h6" sx={{ fontSize: 'sm', ml: 2, mt:0.5 }}>
                      { 
                        campaignRowData.length > 0 &&
                            campaignRowData[0].title
                      }
                    </Typography>
                </Card>
            </Box>
       
    );
}

const mapStateToProps = (state) => ({
    campaignData: state.campaignReducer.campaignData
});

export default connect(mapStateToProps)(CampaignAndImages);