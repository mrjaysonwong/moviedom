import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io5';
import * as RiIcons from 'react-icons/ri';

export const routes = [
  {
    title: 'Home',
    path: '/',
    ioutline: <IoIcons.IoHomeOutline />,
    ifill: <IoIcons.IoHomeSharp />,
  },
  {
    title: 'TV Shows',
    path: '/tv-shows',
    ioutline: <RiIcons.RiMovieLine />,
    ifill: <RiIcons.RiMovieFill />,
  },
  {
    title: 'Trending',
    path: '/trending',
    ioutline: <MdIcons.MdOutlineMovieFilter />,
    ifill: <MdIcons.MdMovieFilter />,
  },
  {
    title: 'Discover',
    path: '/discover',
    ioutline: <IoIcons.IoCompassOutline />,
    ifill: <IoIcons.IoCompassSharp />,
    iclosed: <MdIcons.MdKeyboardArrowDown />,
    iopened: <MdIcons.MdKeyboardArrowUp />,
    subNav: [
      {
        title: 'Popular',
        path: '/popular',
      },
      {
        title: 'Top Rated',
        path: '/top-rated',
      },
      {
        title: 'Upcoming',
        path: '/upcoming',
      },
    ],
  },
  {
    title: 'People',
    path: '/people',
    ioutline: <IoIcons.IoPeopleOutline />,
    ifill: <IoIcons.IoPeopleSharp />,
  },
  {
    title: 'Genre',
    path: '/genre',
    ioutline: <RiIcons.RiMovie2Line />,
    ifill: <RiIcons.RiMovie2Fill />,
  },
];
