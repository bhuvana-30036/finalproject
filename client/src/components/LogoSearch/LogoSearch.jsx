import React from "react";
import Logo from "../../img/1122.jpg";
import { UilSearch } from '@iconscout/react-unicons';
import './LogoSearch.css';

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" style={{ width: '50px', height: '50px' }} />
      <div className="Search">
        <input type="text" placeholder="#Explore" />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
