import { MdAccountCircle, MdFavorite } from "react-icons/md";
import { FaHistory } from "react-icons/fa";

export const MenuItems = [
  {
    title: import.meta.env.VITE_REACT_APP_ACCOUNT,
    url: "/account",
    icon: <MdAccountCircle className="nav-icon" />,
  },
  {
    title: import.meta.env.VITE_REACT_APP_FAVORITES,
    url: "/favorites",
    icon: <MdFavorite className="nav-icon" />,
  },
  {
    title: import.meta.env.VITE_REACT_APP_HISTORY,
    url: "/history",
    icon: <FaHistory className="nav-icon" />,
  },
];
