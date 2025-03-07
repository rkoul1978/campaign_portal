const INITIAL_STATE = {
    campaignData: [],
    campaignID:'',
    brandDisplayName: '',
    campaignTitle:'',
    campaignCode:'',
    campaignType:'',
    mailerID:'',
    mailBarcodeSerialFrom:'',
    mailBarcodeSerialTo:'',
    campaignStartDate:'',
    campaignEndDate:'',
    mailpieceShape:'',
    representativeImage:'',
    rideAlongImage:'',
    TargetURL:'',
    addCampaignParams:true,
    allowSocialSharing:true,
    isLoading: false,
    isError: false,
    errorMsg: ""
};

const campaignReducer =(state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case "GET_CAMPAIGN_DATA":
            return {
                ...state,
                campaignData: action.campaignData
            };
        case "SET_CAMPAIGN_TITLE":
            return {
                ...state,
                campaignTitle:action.title
            };
        default:
            return state;
    }
}

export default campaignReducer;
  