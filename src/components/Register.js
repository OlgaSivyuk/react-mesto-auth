import React from 'react';
import { Link } from 'react-router-dom';
//import './Register.css'

function Register() {
  return (
    <div className="register__body">
      <h3 className="register__title">Регистрация</h3>
      <form className="register__form">
        <label className="register__form-field">
          <input
            className="register__input register__input_email"
            type="email"
            placeholder="Email"
            name="email"
            // onChange={handleChange}
            // value={data.email}
            required
          />
        </label>
        <span id="error-register-email" className="register__error"></span>

        <label className="register__form-field">
          <input
            className="register__input register__input_password"
            type="password"
            placeholder="Пароль"
            name="password"
            // onChange={handleChange}
            // value={data.password}
            required
          />
        </label>
        <span id="error-register-email" className="register__error"></span>
        <button className="register__button" type="submit">Зарегистрироваться</button>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы? <Link to="signin" className="register__login-link">Войти</Link></p>
      </div>
    </div>
  );
}

export default Register