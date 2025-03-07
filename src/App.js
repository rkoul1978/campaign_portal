import './App.css';
import { React, useState} from 'react';
import { Provider } from 'react-redux';
import  store  from './Store.js'
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Nav, Tab,} from 'react-bootstrap';
import Home from './components/Home/Home.js';
import AllCampaigns from './components/AllCampaigns/AllCampaigns.js';
import CreateCampaignDescription from './components/CreateCampaign/CreateCampaignDescription.js';
import CreateCampaignImages from './components/CreateCampaign/CreateCampaignImages.js';
import CampaignTemplates from './components/CampaignTemplates/CampaignTemplates.js';

const App =()=> {
  let path = "/mcp";
  const [currentTab, setCurrentTab] = useState("home");
 
  const handleSelect = (eventKey) => {
    setCurrentTab(eventKey);
  };
  
  return (
        <Provider store={store}>
          <BrowserRouter>
            <div className="row">
              <div className="col-1">
              </div>
              <div className="col-3">
                <h4>Mailer Campaign Portal</h4>
              </div>
              <div className="col-8">
                  <Tab.Container defaultActiveKey="home" activeKey={ currentTab} variant="pill" onSelect={ handleSelect }>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link eventKey="home" as={Link} to={`${path}/Home`}>Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="createCampaign" as={Link} to={`${path}/CreateCampaignDescription`}>Create Campaign</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="allCampaigns" as={Link} to={`${path}/AllCampaigns`}>All Campaigns</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="campaignTemplate" as={Link} to={`${path}/CampaignTemplates`}>Campaign Templates</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="images" as={Link} to={`${path}/Images`}>Images</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="reports" as={Link} to={`${path}/Reports`}>Reports</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="faqs" as={Link} to={`${path}/FAQs`}>FAQs</Nav.Link>
                            </Nav.Item>
                        </Nav>
                  </Tab.Container>
              </div>
            </div>
            <Tab.Content>
              {
                  <Routes>
                      <Route path="/" element= { <Navigate to={`${path}/Home`} /> }  />
                      <Route path={`${path}`} element= { <Navigate to={`${path}/Home`} /> }  />
                      <Route path={`${path}/Home`} element = { <Home handleSelect={handleSelect}/> } />
                      <Route path={`${path}/CreateCampaignDescription`} element = { <CreateCampaignDescription/> } />
                      <Route path={`${path}/CreateCampaignImages`} element = { <CreateCampaignImages/> } />
                      <Route path={`${path}/AllCampaigns` } element = { <AllCampaigns handleSelect={handleSelect}/> }  />
                      <Route path={`${path}/CampaignTemplates`} element = { <CampaignTemplates/> } />
                      <Route path={`${path}/Images`} element = { <></> } />
                      <Route path={`${path}/Reports`} element = { <></> } />
                      <Route path={`${path}/FAQs`} element = { <></> } />
                  </Routes>
              }
              </Tab.Content>
          </BrowserRouter>
        </Provider>
  );
}

export default App;
