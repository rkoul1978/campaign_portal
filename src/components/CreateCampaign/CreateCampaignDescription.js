import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Input, Button, FormControl, FormLabel, Typography } from '@mui/joy';
import { Card, Box }  from '@mui/material';
import { useLocation } from "react-router-dom";
import { setCampaignTitle } from '../../actions/CampaignsAction';

const CreateCampaignDescription = ({campaignTitle, setCampaignTitle}) =>{
    
    const { state } = useLocation();
    const [campaignTitleError, setCampaignTitleError] = useState(false);

    useEffect(() =>{
        setCampaignTitle(state !== null ? state.campaignRowData[0].title : '');
    },[setCampaignTitle,state]);

    const titleChange = (e) => {
       setCampaignTitle(e.target.value);
    }

    const validateForm = () =>{
        campaignTitle === '' ? setCampaignTitleError(true) : setCampaignTitleError(false);
    }
    
    const saveDraft = () => {
        validateForm();
        if(campaignTitle !== ''){
            /* Make save draft api call */
        }
    }

    return (
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
                    Campaign Description
                </Typography>
                <FormControl orientation="vertical" sx={{ m:2,width:'50%' }}>
                    <FormLabel>Campaign Title</FormLabel>
                    <Input label="" variant="outlined" value={ campaignTitle } onInput={ titleChange } autoFocus/>
                    {
                        campaignTitleError && (
                            <div style={{ marginTop:'2px'}}>
                                <span style={{ color: "red", fontSize:'small' }}>Required</span>
                            </div> )
                    }
                </FormControl>
                <div className="row">
                    <div className="col-3">
                        <FormControl orientation="vertical" sx={{ mt:2,ml:2,mb:2,width:'50%' }}>
                            <Button onClick = { saveDraft }>Save as Draft</Button>
                        </FormControl>  
                    </div>
                    <div className="col-3">
                        <FormControl orientation="vertical" sx={{ mt:2,ml:-20,mb:2,width:'50%' }}>
                            <Button variant="outlined">Save and Continue</Button>
                        </FormControl>  
                    </div>
                </div>
            </Card>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    campaignTitle: state.campaignReducer.campaignTitle
});

const mapDispatchToProps = (dispatch) =>({
    setCampaignTitle: (title) => dispatch(setCampaignTitle(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampaignDescription);