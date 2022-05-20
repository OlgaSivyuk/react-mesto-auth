import React from "react";
import logo from "../images/logo/logo.svg";

function Header() {
  return (
    <header className="header">
      <img alt="Место Россия" className="header__logo" src={logo} />
    </header>
  );
}

export default Header;
