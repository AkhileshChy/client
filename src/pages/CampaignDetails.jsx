import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CustomButton, CountBox, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { getDonations, contract, address, donate, getNumberOfCampaigns } = useStateContext();

  const [numberOfCampaigns, setNumberOfCampaigns] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [donators, setDonators] = useState([]);
  const [amount, setAmount] = useState("");

  const remainingDays = daysLeft(state.deadline);

  const numberOfCampaign = async () => {
    const number = await getNumberOfCampaigns(state.owner);
    setNumberOfCampaigns(number);
  };

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) {
      numberOfCampaign();
      fetchDonators();
    }
  }, [contract, address]);

  const handleDonate = async () => {
    if (!amount) return alert("Please enter amount to donate");
    const donationData = {
      ...state,
      amount,
      timestamp: new Date().toISOString(),
    };
  
    const jsonString = JSON.stringify(donationData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    // Create a download link and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = `donation_${state.pId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsLoading(true);
    await donate(state.pId, amount);
    navigate("/");
    setIsLoading(false);
  };

  const handleJoinUsClick = () => {
    window.open("https://forms.gle/xS9QESSj4Uiu6hhGA", "_blank");
  };

  return (
    <div className="bg-[#121212] text-[#e0e0e0] min-h-screen">
      {isLoading && <Loader />}

      <div className="flex flex-col items-center mt-10">
        <div className="flex flex-col items-center w-full">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-lg border border-[#3a3a43]"
          />
          <div className="relative w-full h-[5px] bg-[#4a4a4a] mt-2">
            <div
              className="absolute h-full bg-[#67cba0]"
              style={{
                width: `${calculateBarPercentage(state.target, state.amountCollected)}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>

          <div className="flex justify-between items-center w-full mt-4 px-4">
            <CountBox title="Votes" value={state.votes} />
            <CountBox title="Category" value={state.category} />
            <CountBox title="Days Left" value={remainingDays >= 0 ? remainingDays : "Ended"} />
            <CountBox title={`Raised: ${(state.amountCollected / 10 ** 18).toFixed(2)} ETH`} value={state.amountCollected} />
            <CountBox title="Total Backers" value={donators.length} />
          </div>
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#ffcc00] uppercase">Creator</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-[#ffffff] break-all">{state.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#cccccc]">{numberOfCampaigns} Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#ffcc00] uppercase">Story</h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#cccccc] leading-[26px] text-justify">{state.description}</p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#ffcc00] uppercase">Donations</h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#cccccc] leading-[26px] break-all">{item.donation}</p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#cccccc] leading-[26px] text-justify">
                  No Donators Yet. Be the one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 ">
          <h4 className="font-epilogue font-semibold text-[18px] text-[#ffcc00] uppercase">Fund</h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#cccccc]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.01"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#4a4a4a] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5624] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-[#ffcc00]">Back it because you believe in it.</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#cccccc]">
                  Support the project for no reward, just because it speaks to you.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />

              <CustomButton
                btnType="button"
                title="Join Us"
                styles="w-full bg-[#8c6dfd] mt-7"
                handleClick={handleJoinUsClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
