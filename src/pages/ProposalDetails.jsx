import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, ArrowLeft, Loader2 } from 'lucide-react';
import { proposals } from '../constants/proposals';

const ProposalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState(proposals.find(p => p.id === id));
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [votes, setVotes] = useState({
    yes: proposal?.yesVotes || 0,
    no: proposal?.noVotes || 0
  });

  if (!proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Proposal not found</div>
      </div>
    );
  }

  const totalCurrentVotes = votes.yes + votes.no;
  const yesPercentage = ((votes.yes / totalCurrentVotes) * 100).toFixed(1);
  const noPercentage = ((votes.no / totalCurrentVotes) * 100).toFixed(1);
  const participationPercentage = ((totalCurrentVotes / proposal.totalVotes) * 100).toFixed(1);

  const handleVote = async (isYesVote) => {
    if (hasVoted || proposal.status !== 'Continue' || isVoting) return;

    setIsVoting(true);

    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 5000));

    const newVotes = {
      yes: isYesVote ? votes.yes + 1 : votes.yes,
      no: !isYesVote ? votes.no + 1 : votes.no
    };

    setVotes(newVotes);
    setHasVoted(true);
    setIsVoting(false);

    // Check if voting threshold is reached
    const newTotalVotes = newVotes.yes + newVotes.no;
    if (newTotalVotes >= proposal.totalVotes) {
      const newStatus = newVotes.yes > newVotes.no ? 'Succeed' : 'Failed';
      setProposal(prev => ({
        ...prev,
        status: newStatus
      }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  return (
    <div className="min-h-screen p-6 relative">
      {isVoting && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1c1c24] p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 border border-gray-800">
            <div className="flex flex-col items-center">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Processing Vote
              </h3>
              <p className="text-[#808191] text-center">
                Please wait while your vote is being recorded on the blockchain...
              </p>
              <div className="w-full bg-[#2a2a30] h-2 rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-blue-500 animate-[loading_5s_ease-in-out]" />
              </div>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-[#808191] hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Proposals
      </button>

      <div className="max-w-4xl mx-auto bg-[#1c1c24] rounded-xl overflow-hidden shadow-xl">
        <div className="relative h-[300px]">
          <img 
            src={proposal.image} 
            alt={proposal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-4 py-2 rounded-full text-white font-semibold ${getStatusColor(proposal.status)}`}>
              {proposal.status}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#808191]">{proposal.category}</span>
            <span className="text-[#808191]">Due: {formatDate(proposal.deadline)}</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">{proposal.title}</h1>
          <p className="text-[#808191] text-lg mb-8">{proposal.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-[#2a2a30] p-6 rounded-xl">
                <h3 className="text-white text-xl font-semibold mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#b2b3bd]">Requested Amount:</span>
                    <span className="text-white font-semibold">{proposal.requestedAmount} ETH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#b2b3bd]">Created by:</span>
                    <span className="text-white font-semibold">{proposal.creator}</span>
                  </div>
                </div>
              </div>

              {proposal.status === 'Continue' && !hasVoted && (
                <div className="bg-[#2a2a30] p-6 rounded-xl">
                  <h3 className="text-white text-xl font-semibold mb-4">Cast Your Vote</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleVote(true)}
                      disabled={isVoting}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleVote(false)}
                      disabled={isVoting}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      <ThumbsDown className="w-5 h-5" />
                      Reject
                    </button>
                  </div>
                </div>
              )}

              {hasVoted && proposal.status !== 'Continue' && (
                <div className="bg-[#2a2a30] p-6 rounded-xl">
                  <div className={`text-xl font-semibold ${proposal.status === 'Succeed' ? 'text-green-500' : 'text-red-500'}`}>
                    Proposal has {proposal.status.toLowerCase()}!
                  </div>
                  <p className="text-[#808191] mt-2">
                    {proposal.status === 'Succeed' 
                      ? 'The proposal has been accepted by the community.'
                      : 'The proposal has been rejected by the community.'}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-[#2a2a30] p-6 rounded-xl">
              <h3 className="text-white text-xl font-semibold mb-6">Voting Statistics</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-[#1c1c24] p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ThumbsUp className="w-6 h-6 text-green-500" />
                    <span className="text-white">Yes Votes</span>
                  </div>
                  <div className="text-green-500 font-semibold">
                    {votes.yes} ({yesPercentage}%)
                  </div>
                </div>

                <div className="flex items-center justify-between bg-[#1c1c24] p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ThumbsDown className="w-6 h-6 text-red-500" />
                    <span className="text-white">No Votes</span>
                  </div>
                  <div className="text-red-500 font-semibold">
                    {votes.no} ({noPercentage}%)
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Vote Distribution</span>
                    <span className="text-[#808191]">{totalCurrentVotes} votes</span>
                  </div>
                  <div className="h-3 w-full bg-[#1c1c24] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300"
                      style={{ width: `${((votes.yes+votes.no)/proposal.totalVotes) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-[#1c1c24]">
                  <div className="text-white text-lg font-medium">
                    Total Participation
                  </div>
                  <div className="text-[#808191] text-3xl font-bold mt-2">
                    {participationPercentage}%
                  </div>
                  <div className="text-[#808191] text-sm mt-1">
                    ({totalCurrentVotes} out of {proposal.totalVotes} total votes)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetails;