import React from "react";
import "./Header.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { Avatar } from "@material-ui/core";
import { useStateValue } from "../StateProvider";

function Header() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className='header' id="Header">
      <div className='header__left'>
        <button>
          <svg
            role="img"
            height="24"
            width="24"
            class="Svg-ytk21e-0 gFcOie IYDlXmBmmUKHveMzIPCF"
            viewBox="0 0 24 24"
          >
            <path d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"></path>
          </svg>
        </button>
        <button>
          <svg
            role="img"
            height="24"
            width="24"
            class="Svg-ytk21e-0 gFcOie IYDlXmBmmUKHveMzIPCF"
            viewBox="0 0 24 24"
          >
            <path d="M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z"></path>
          </svg>
        </button>
      </div>
      <div className='header__profile'>
        <Avatar src={user?.images[0]?.url} alt="Avatar" />
        <h5>{user?.display_name}</h5>
        <ArrowDropDownIcon />
      </div>
    </div>
  );
}

export default Header;
