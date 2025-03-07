import axios from 'axios';
export const GET_CAMPAIGN_DATA = 'GET_CAMPAIGN_DATA';
export const SET_CAMPAIGN_TITLE = 'SET_CAMPAIGN_TITLE';

export const getCampaignData = (url) => {
    return async (dispatch) => {
      let payload = [];
     try {
          const { data: response } = await axios.get(url);
          payload = response.products;
      } catch (e) {
         console.log(e);
      }
      dispatch({
          type: GET_CAMPAIGN_DATA,
          campaignData: payload
      });
    };
};

export const setCampaignTitle = (title) =>{
    return (dispatch) =>{
      dispatch({
        type: SET_CAMPAIGN_TITLE,
        title:title
    });
    }
  };