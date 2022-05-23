import React from "react";
import { Link, Route } from 'react-router-dom';
import logo from "../images/logo/logo.svg";


function Header({email}) {
  return (
    <header className="header">
      <Route>
        <Link className="header__logo" to="/" target="_self">
          <img alt="Место Россия" className="header__img" src={logo} />
        </Link>
      </Route>

      <Route path='/signup'>
        <p className='header__email'>{email}</p>
        <Link className="header__link header__link_signin" to="/signin">Войти</Link>
      </Route>

      <Route path='/signin'>
        <p className='header__email'>{email}</p>
        <Link className="header__link header__link_signup" to="/signup">Регистрация</Link>
      </Route>

      <Route exact path='/'>
        <p className='header__email'>{email}</p>
        <Link className="header__link header__link_logout" to="/signin" >Выйти</Link>
        {/* onClick={handleLogOut} */}
      </Route>

    </header>
  );
}

export default Header;
