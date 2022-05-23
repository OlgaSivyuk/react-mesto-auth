import React from 'react';
//import './Login.css'

function Login () {
  
  return (
    <div className="login">
        <h3 className="login__title">Вход</h3>
        <form className="login__form">
          <label className="login__form-field">
          <input className="login__input login__input_email" 
            type="email" 
            placeholder="Email" 
            name="email" 
            // onChange={handleChange}
            // value={data.email} 
            required/>
          </label>
          <span
              id="error-login-email"
              className="login__error">
          </span>

          <label className="login__form-field">
          <input className="login__input login__input_password" 
            type="password" 
            placeholder="Пароль" 
            name="password" 
            // onChange={handleChange}
            // value={data.password} 
            required/>
          </label>
          <span
              id="error-login-email"
              className="login__error">
          </span>
          <button className="login__submit" type="submit">Войти</button>
        </form>
    </div>
  );
}

export default Login