import React from 'react'
import { FundCard } from '../components';
import { useNavigate } from 'react-router-dom';

const data = [
    {
        owner: "Alice Johnson",
        title: "Solar Energy for Rural Areas",
        description: "Providing solar-powered solutions to off-grid villages.",
        target: 50000000000000000000, // 50 ETH (assuming target is in Wei)
        deadline: "2024-12-31",
        amountCollected: 32, // 32 ETH (in Wei)
        image: "https://media.istockphoto.com/id/1405880267/photo/two-engineers-installing-solar-panels-on-roof.jpg?s=612x612&w=0&k=20&c=OvQDbJaTnMM4jPfIA3y5vrO88i98NZJRahZtnYFZCq0=",
        category: "Environment",
        votes: 3
    },
    {
        owner: "Michael Carter",
        title: "Code for the Future",
        description: "Teaching underprivileged kids how to code through workshops.",
        target: 20000000000000000000, // 20 ETH
        deadline: "2025-3-15",
        amountCollected: 12, // 12.5 ETH
        image: "https://all-digital.org/wp-content/uploads/2015/06/CodeYourFuture_w-e1525264416316.png",
        category: "Education",
        votes: 0.5
    },
    {
        owner: "Dr. Emily Watson",
        title: "AI-Powered Healthcare",
        description: "Developing AI tools to diagnose diseases faster and more accurately.",
        target: 10000000000000000000, // 100 ETH
        deadline: "2024-11-30",
        amountCollected: 8.5, // 85 ETH
        image: "https://cdn.prod.website-files.com/650c1bee516c4e723b11b29a/65206264927e177f8bd65950_651f6a5b0bcc2eb5956182ea_Top%252050%2520Healthcare%2520Companies%2520and%2520Their%2520Impact%2520on%2520the%2520Industry.webp",
        category: "Healthcare",
        votes: 4
    },
];

const demoData = [
    {
        "owner": "Bob Williams",
        "title": "AI-Powered Medical Diagnostics",
        "description": "Developing an AI system for early disease detection.",
        "target": 75000000000000000000, // 75 ETH
        "deadline": "2025-06-15",
        "amountCollected": 20, // 20 ETH
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJXQz4K5mdGOGnagaZ8eo4vZKfinsvqn1I1A&s",
        "category": "Healthcare",
        "votes": 5
    },
    {
        "owner": "Emily Davis",
        "title": "Smart Irrigation System",
        "description": "Building an IoT-based water conservation system for farmers.",
        "target": 60000000000000000000, // 60 ETH
        "deadline": "2025-03-30",
        "amountCollected": 45, // 45 ETH
        "image": "https://cdn.britannica.com/35/157635-050-69B43759/Irrigation-sprinklers.jpg",
        "category": "Agriculture",
        "votes": 7
    },
    {
        "owner": "Michael Brown",
        "title": "Electric Bikes for Urban Transport",
        "description": "Developing affordable and efficient e-bikes.",
        "target": 80000000000000000000, // 80 ETH
        "deadline": "2025-09-10",
        "amountCollected": 30, // 30 ETH
        "image": "https://www.carandbike.com/_next/image?url=https%3A%2F%2Fc.ndtvimg.com%2F2019-08%2Fuof7q3ho_revolt-rv-400-first-ride-review_625x300_28_August_19.jpg&w=3840&q=75",
        "category": "Transportation",
        "votes": 4
    },
    {
        "owner": "Sophia Martinez",
        "title": "Plastic Recycling Startup",
        "description": "Turning plastic waste into sustainable construction materials.",
        "target": 50000000000000000000, // 50 ETH
        "deadline": "2025-04-20",
        "amountCollected": 38, // 38 ETH
        "image": "https://www.researchdive.com/blogImages/ajXZntWkyh.jpeg",
        "category": "Environment",
        "votes": 6
    },
    {
        "owner": "Daniel Lee",
        "title": "Blockchain-based Identity Verification",
        "description": "Providing decentralized identity solutions for secure authentication.",
        "target": 90000000000000000000, // 90 ETH
        "deadline": "2025-07-22",
        "amountCollected": 60, // 60 ETH
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtinfKmrz7WTGEVeuj7jFyugIryUEMLkpJpw&s",
        "category": "Technology",
        "votes": 8
    },
    // {
    //     "owner": "Olivia White",
    //     "title": "Eco-Friendly Fashion",
    //     "description": "Producing sustainable and biodegradable clothing.",
    //     "target": 40000000000000000000, // 40 ETH
    //     "deadline": "2025-08-18",
    //     "amountCollected": 25, // 25 ETH
    //     "image": "https://media.istockphoto.com/id/1312267620/photo/sustainable-fashion-concept.jpg?s=612x612&w=0&k=20&c=aeQ7a2MmQ7I6r4yw8aNBlVtPyCxVzZqzSMH0bDLOsK0=",
    //     "category": "Fashion",
    //     "votes": 3
    // },
    // {
    //     "owner": "William Green",
    //     "title": "Smart Home Automation",
    //     "description": "Developing AI-powered home automation for energy efficiency.",
    //     "target": 55000000000000000000, // 55 ETH
    //     "deadline": "2025-05-05",
    //     "amountCollected": 40, // 40 ETH
    //     "image": "https://media.istockphoto.com/id/1293055166/photo/smart-home-automation-concept.jpg?s=612x612&w=0&k=20&c=UnkFffRCqf_YRavSJtpVEvHT7OH2mPB1-M4Ep6OSr1Y=",
    //     "category": "Technology",
    //     "votes": 6
    // },
    // {
    //     "owner": "Emma Thompson",
    //     "title": "EdTech for Underserved Communities",
    //     "description": "Bringing AI-powered learning to rural schools.",
    //     "target": 65000000000000000000, // 65 ETH
    //     "deadline": "2025-10-12",
    //     "amountCollected": 50, // 50 ETH
    //     "image": "https://media.istockphoto.com/id/1251691065/photo/online-education.jpg?s=612x612&w=0&k=20&c=k5F2a9w-YfMPEIEvOs7cT-8H1-JxEKkGQqUqOxAedpQ=",
    //     "category": "Education",
    //     "votes": 9
    // }
]




const InvestedStartups = () => {
    const navigate = useNavigate();
    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign });
    };
    return (
        <div className="bg-gradient-to-r from-[#282c34] to-[#1c1c24] p-6 rounded-lg shadow-lg relative">
            {/* Header with Title and Register Button */}
            <div className="flex justify-center relative mb-8">
                <h1 className="font-epilogue font-bold text-[36px] text-[#1DC071] absolute left-1/2 transform -translate-x-1/2">
                    CryptoVenture
                </h1>
                <button
                    onClick={() => navigate('/register')}
                    className="bg-[#1DC071] hover:bg-[#15a85c] text-white font-semibold py-2.5 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg absolute right-0"
                >
                    Register Your Startup
                </button>
            </div>

            {/* Description Section */}
            <div className="mb-8 mt-20 text-center">
                <p className="font-epilogue text-[#9a9a9a] leading-[1.8] text-[16px] max-w-[800px] mx-auto">
                    CryptoVenture is a blockchain-powered crowdfunding and governance platform designed to revolutionize startup financing. It empowers entrepreneurs to raise funds in a decentralized and transparent manner while giving investors full control over how their contributions are utilized.
                </p>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-[#3a3a43] my-8" />

            <h1 className="font-epilogue font-semibold text-[24px] text-[#f0f0f0] mb-4 border-b-2 border-[#8c6dfd] pb-2">
                Invested Startups (3)
            </h1>

            <div className="flex flex-wrap mt-4 gap-6">
                {data.map((d) => (
                    <FundCard
                        key={d.pId}
                        {...d}
                        handleClick={() => navigate('/proposals')}
                    />
                ))}
            </div>

            <h1 className="font-epilogue font-semibold text-[24px] text-[#f0f0f0] mt-10 mb-4 border-b-2 border-[#8c6dfd] pb-2">
                Other Startups (8)
            </h1>

            <div className="flex flex-wrap mt-4 gap-6">
                {demoData.map((d) => (
                    <FundCard
                        key={d.pId}
                        {...d}
                        handleClick={() => handleNavigate(d)}
                    />
                ))}
            </div>
        </div>
    )
}

export default InvestedStartups
