import { createCampaign, dashboard, logout, menu, payment, profile, withdraw } from '../assets';

export const navlinks = [
    {
        name: 'dashboard',
        imgUrl: dashboard,
        link: '/',
    },
    {
        name: 'campaign',
        imgUrl: createCampaign,
        link: '/create-campaign',
    },
    // {
    //     name: 'payment',
    //     imgUrl: payment,
    //     link: '/',
    //     disabled: true,
    // },
    // {
    //     name: 'withdraw',
    //     imgUrl: withdraw,
    //     link: '/',
    //     disabled: true,
    // },
    {
        name: 'profile',
        imgUrl: profile,
        link: '/profile',
    },
    {
        name: 'investments',
        imgUrl: withdraw,
        link: '/investments',
    },
    // {
    //     name: 'proposals',
    //     imgUrl: ,
    //     link: '/proposals',
    // },
    // {
    //     name: 'logout',
    //     imgUrl: logout,
    //     link: '/',
    //     disabled: false,
    // },
];