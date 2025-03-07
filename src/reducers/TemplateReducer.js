const INITIAL_STATE = {
    templateData: [],
    templateName:'',
    brandDisplayName: '',
    campaignTitle:'',
    mailerID:'',
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

const templateReducer =(state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case "GET_TEMPLATE_DATA":
            return {
            ...state,
            templateData: action.templateData,
            };
        default:
            return state;
    }
}

export default templateReducer;
  