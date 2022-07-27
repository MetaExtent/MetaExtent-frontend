import { MdMoreHoriz, MdLanguage } from 'react-icons/md';
export const links = [
  {
    label: 'Dashboard',
    children: [
      {
        label: 'Dashboard',
        description: 'Read our documentation and FAQs, or get in touch.',
        href: '/dashboard',
        // icon: <MdAccessAlarm />,
      },
    ],
  },
  {
    label: 'Swap',
    children: [
      {
        label: 'Swap',
        description: 'Read our documentation and FAQs, or get in touch.',
        href: '/Swap',
        // icon: <MdAccessAlarm />,
      },
      {
        label: 'Liquidity',
        description: 'Discover and join your local Sketch community.',
        href: '/liquidity',
        // icon: <MdWeb />,
      },
    ],
  },
  {
    label: 'NFT',
    children: [
      {
        label: 'Marketplace ',
        description: 'Read our documentation and FAQs, or get in touch.',
        href: '/marketplace',
        // icon: <MdAccessAlarm />,
      },
      {
        label: 'Mint ',
        description: 'Discover and join your local Sketch community.',
        href: '/mint',
        // icon: <MdWeb />,
      },
      {
        label: 'Borrow ',
        description: 'Discover and join your local Sketch community.',
        href: '/borrow',
        // icon: <MdWeb />,
      },
      {
        label: 'Deposit',
        description: 'Discover and join your local Sketch community.',
        href: '/deposit',
        // icon: <MdWeb />,
      },
      // {
      //   label: 'NFT Profile',
      //   description: 'Discover and join your local Sketch community.',
      //   href: '/nft-profile',
      //   // icon: <MdWeb />,
      // },
      {
        label: 'NFT Collection',
        description: 'Discover and join your local Sketch community.',
        href: '/collection',
        // icon: <MdWeb />,
      },

    ],
  },
  {
    label: 'Info',
    children: [
      {
        label: 'NFT Airdrops',
        description: 'Read our documentation and FAQs, or get in touch.',
        href: '#',
        // icon: <MdAccessAlarm />,
      },
      {
        label: 'Governance ',
        description: 'Discover and join your local Sketch community.',
        href: '#',
        // icon: <MdWeb />,
      },
      {
        label: 'Docs',
        description: 'Discover and join your local Sketch community.',
        href: '#',
        // icon: <MdWeb />,
      },
    ],
  },
  // {
  //   icon: MdMoreHoriz,
  //   children: [
  //     {
  //       label: 'Info',
  //     },
  //     {
  //       label: 'IFO',
  //     },
  //     {
  //       label: 'Voting',
  //     },
  //     {
  //       label: 'Leaderboard',
  //     },
  //     {
  //       label: 'Blog',
  //     },
  //     {
  //       label: 'Docs',
  //     },
  //   ],
  // },
];

export const languages = [
  {
    icon: MdLanguage,
    align: 'center',
    children: [
      {
        value: 'en',
        label: 'English',
      },
      {
        value: 'sp',
        label: 'Spanish',
      },
      {
        value: 'ch',
        label: 'Chinese',
      },
    ],
  },
];
