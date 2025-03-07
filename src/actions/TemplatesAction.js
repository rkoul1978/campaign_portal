import axios from 'axios';
export const GET_TEMPLATE_DATA = 'GET_TEMPLATE_DATA';

export const getTemplateData = (url) => {
    return async (dispatch) => {
      let payload = [];
     try {
          const { data: response } = await axios.get(url);
          payload = response.products;
      } catch (e) {
         console.log(e);
      }
      dispatch({
          type: GET_TEMPLATE_DATA,
          templateData: payload
      });
    };
};