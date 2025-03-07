import { combineReducers } from "@reduxjs/toolkit";
import CampaignReducer from "./CampaignReducer";
import TemplateReducer from "./TemplateReducer";

const rootReducer = combineReducers({
  campaignReducer: CampaignReducer,
  templateReducer: TemplateReducer
});

export default rootReducer;