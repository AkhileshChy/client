// export interface Proposal {
//     id: string;
//     title: string;
//     description: string;
//     creator: string;
//     requestedAmount: number;
//     status: 'Continue' | 'Succeed' | 'Failed';
//     yesVotes: number;
//     noVotes: number;
//     totalVotes: number;
//     deadline: string;
//     image: string;
//     category: string;
//   }
  
  export const proposals= [
    {
      id: '1',
      title: 'Expand Solar Panel Production',
      description: 'Scaling up our manufacturing capacity is a strategic move that aligns with our long-term growth objectives. We seek the boards approval to proceed with detailed planning, financial modeling, and phased implementation. Upon approval, a dedicated task force will be established to oversee execution and ensure the successful expansion of our manufacturing operations.',
      creator: 'Green Energy Co.',
      requestedAmount: 25,
      status: 'Continue',
      yesVotes: 3,
      noVotes: 2,
      totalVotes: 6,
      deadline: '2025-04-15',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Manufacturing'
    },
    {
      id: '2',
      title: 'Solar-Powered Water Purification',
      description: 'Developing solar-powered water purification systems to provide clean drinking water in remote areas.',
      creator: 'SolarPurify Tech',
      requestedAmount: 20,
      status: 'Succeed',
      yesVotes: 8,
      noVotes: 5,
      totalVotes: 20,
      deadline: '2024-12-30',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWwp4Z2GC61hRC414-Pk1HuaEdkeN_6pRSWA&s',
      category: 'Sustainability'
    },
    {
      id: '3',
      title: 'Solar Microgrid for Rural Areas',
      description: 'Implementing decentralized solar microgrids to provide electricity to off-grid communities.',
      creator: 'BrightFuture Energy',
      requestedAmount: 30,
      status: 'Failed',
      yesVotes: 1,
      noVotes: 5,
      totalVotes: 6,
      deadline: '2024-05-20',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Energy'
    }
  ];