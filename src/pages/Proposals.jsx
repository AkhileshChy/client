import React from 'react';
import { useNavigate } from 'react-router-dom';
import { proposals } from '../constants/proposals';

const ProposalCard = ({ proposal }) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Succeed':
        return 'bg-green-500';
      case 'Failed':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const currentVotes = proposal.yesVotes + proposal.noVotes;
  const completionPercentage = (currentVotes / proposal.totalVotes) * 100;

  return (
    <div 
      className="bg-[#1c1c24] rounded-xl p-4 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300 relative cursor-pointer"
      onClick={() => navigate(`/proposal/${proposal.id}`)}
    >
      <div className="relative h-[200px] w-full overflow-hidden rounded-xl">
        <img 
          src={proposal.image} 
          alt={proposal.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-4 py-2 rounded-full text-white font-semibold text-sm ${getStatusColor(proposal.status)}`}>
            {proposal.status}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#808191] text-sm">{proposal.category}</span>
          <span className="text-[#808191] text-sm">Due: {formatDate(proposal.deadline)}</span>
        </div>

        <h3 className="font-epilogue font-semibold text-[20px] text-[#f0f0f0] leading-[26px] truncate">
          {proposal.title}
        </h3>
        
        <p className="mt-2 font-epilogue text-[#808191] truncate">
          {proposal.description}
        </p>

        <div className="mt-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-[#b2b3bd] font-medium">Requested Amount:</span>
            <span className="font-epilogue font-semibold text-[#f0f0f0]">{proposal.requestedAmount} ETH</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#b2b3bd] font-medium">Created by:</span>
            <span className="font-epilogue font-semibold text-[#f0f0f0]">{proposal.creator}</span>
          </div>

          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#808191] text-sm">Participation Progress</span>
              <span className="text-[#808191] text-sm">{completionPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="mt-1 text-center text-[#808191] text-sm">
              {currentVotes} out of {proposal.totalVotes} total votes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Proposals = () => {
  const activeProposals = proposals.filter(p => p.status === 'Continue').length;
  const successfulProposals = proposals.filter(p => p.status === 'Succeed').length;
  const failedProposals = proposals.filter(p => p.status === 'Failed').length;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="font-epilogue font-semibold text-[24px] text-[#f0f0f0] border-b-2 border-[#8c6dfd] pb-2">
          Active Proposals ({activeProposals})
        </h1>
        
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="bg-[#1c1c24] px-4 py-2 rounded-lg">
            <span className="text-green-500 font-semibold">{successfulProposals}</span>
            <span className="text-[#808191] ml-2">Successful</span>
          </div>
          <div className="bg-[#1c1c24] px-4 py-2 rounded-lg">
            <span className="text-red-500 font-semibold">{failedProposals}</span>
            <span className="text-[#808191] ml-2">Failed</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {proposals.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
};

export default Proposals;