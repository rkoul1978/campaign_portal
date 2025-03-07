import { React, useState} from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Radio, RadioGroup, FormControlLabel,  FormControl  } from '@mui/material';
import { Button, Typography } from '@mui/joy';
import { useNavigate } from "react-router-dom";

const Home = ({handleSelect})=>{

    const [open, setOpen] = useState(false);
    const [radioValue, setRadioValue] = useState('createNewCampaign');
    const navigate = useNavigate();

    const openDialog = () => {
        setOpen(true);
    };
    
    const closeDialog = () => {
        setOpen(false);
    };

    const navigateTo = () =>{
        if (radioValue === 'createNewCampaign'){
            navigate('/mcp/CreateCampaign');
            handleSelect('createCampaign');
        } else {
            navigate('/mcp/CampaignTemplates');
            handleSelect('campaignTemplate');
        }
    };

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };

    return(
    <>
    <Box sx={{ ml:5, mt:2, mb:5}}>
        <Button variant="outlined" onClick={openDialog}>
            Create a Campaign
        </Button>
    </Box>
        
    <Dialog open={open} onClose={closeDialog} maxWidth='md'>
        <DialogTitle>
            Select How to Create Your Campaign
        </DialogTitle> 
        <DialogContent>
            <FormControl>
                <RadioGroup defaultValue="createNewCampaign" name="radio-buttons-group" value={radioValue} onChange={handleRadioChange}>
                    <FormControlLabel value="createNewCampaign" control={<Radio />} 
                        label={
                            <Typography level="h1" sx={{ fontSize: 'md'}}>
                                Create a New Campaign 
                                </Typography>
                        }
                    />
                    <Typography sx={{ fontSize: 'sm', marginLeft: 4, marginBottom:2}}>
                        Create a new Informed Delivery mail campaign.
                    </Typography>
                    <FormControlLabel value="createFromTemplate" control={<Radio />} 
                        label={
                            <Typography level="h1" sx={{ fontSize: 'md'}}>
                                Create a Campaign from a Template
                                </Typography>
                        }
                    />
                    <Typography sx={{ fontSize: 'sm', marginLeft: 4}}>
                        Choose a previously saved template to create your Informed Delivery mail campaign.
                    </Typography>
                </RadioGroup>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={ navigateTo }>Continue</Button>
            <Button variant="outlined" onClick={ closeDialog  } autoFocus> Cancel </Button>
        </DialogActions>
    </Dialog>
    </>
    );
}
export default Home;