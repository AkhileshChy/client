import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home, Profile, CreateCampaign, CampaignDetails } from "./pages";
import { Navbar, Sidebar } from "./components";
import News from "./pages/News";
import LandingPage from "./pages/Landingpage";
import InvestedStartups from "./pages/InvestedStartups";
import Proposals from "./pages/proposals";
import ProposalDetails from "./pages/ProposalDetails";

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1208px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/investments" element={<InvestedStartups />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/proposal/:id" element={<ProposalDetails />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
