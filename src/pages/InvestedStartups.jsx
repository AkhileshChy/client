import React from 'react'
import { FundCard } from '../components';

const data = [
    {
        owner: "Alice Johnson",
        title: "Solar Energy for Rural Areas",
        description: "Providing solar-powered solutions to off-grid villages.",
        target: 50000000000000000000, // 50 ETH (assuming target is in Wei)
        deadline: "2024-12-31",
        amountCollected: 32000000000000000000, // 32 ETH (in Wei)
        image : "https://media.istockphoto.com/id/1405880267/photo/two-engineers-installing-solar-panels-on-roof.jpg?s=612x612&w=0&k=20&c=OvQDbJaTnMM4jPfIA3y5vrO88i98NZJRahZtnYFZCq0=",
        category: "Environment",
        votes: 20,
        handleClick: () => console.log("Campaign 1 clicked"),
    },
    {
        owner: "Michael Carter",
        title: "Code for the Future",
        description: "Teaching underprivileged kids how to code through workshops.",
        target: 20000000000000000000, // 20 ETH
        deadline: "2024-10-15",
        amountCollected: 12500000000000000000, // 12.5 ETH
        image: "https://images.unsplash.com/photo-1584697964150-ef57aed3037d?w=800&auto=format&fit=crop",
        category: "Education",
        votes: 35,
        handleClick: () => console.log("Campaign 2 clicked"),
    },
    {
        owner: "Dr. Emily Watson",
        title: "AI-Powered Healthcare",
        description: "Developing AI tools to diagnose diseases faster and more accurately.",
        target: 100000000000000000000, // 100 ETH
        deadline: "2024-11-30",
        amountCollected: 85000000000000000000, // 85 ETH
        image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b9?w=800&auto=format&fit=crop",
        category: "Healthcare",
        votes: 51,
        handleClick: () => console.log("Campaign 3 clicked"),
    },
];




const InvestedStartups = () => {
    return (
        <div className="bg-gradient-to-r from-[#282c34] to-[#1c1c24] p-6 rounded-lg shadow-lg">
            <h1 className="font-epilogue font-semibold text-[24px] text-[#f0f0f0] mb-4 border-b-2 border-[#8c6dfd] pb-2">
                Invested Startups (3)
            </h1>

            <div className="flex flex-wrap mt-4 gap-6">
                {/* {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[80px] h-[80px] object-contain mx-auto animate-spin"
          />
        )} */}

                {/* {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[16px] text-[#ccc]">
            No campaigns available at the moment.
          </p>
        )} */}

                {
                    data.map((d) => (
                        <FundCard
                            key={d.pId}
                            {...d}
                        // handleClick={}
                        />
                    ))
                }
            </div>

            {/* Additional visual interest */}
            {/* <div className="mt-6 text-center">
                <p className="text-[#8c6dfd] italic">Support a campaign today!</p>
            </div> */}
        </div>
    )
}

export default InvestedStartups
