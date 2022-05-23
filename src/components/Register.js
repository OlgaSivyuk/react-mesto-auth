import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister } ) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function handleEmail(e) {
      setEmail(e.target.value);
    }
  
    function handlePassword(e) {
      setPassword(e.target.value);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      handleRegister(email, password);
    }
    
  return (
    <div className="register">
      <h3 className="register__title">Регистрация</h3>
      <form className="register__form" onSubmit={handleSubmit}>
        <label className="register__form_field">
          <input
            className="register__input register__input_email"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleEmail}
            value={email}
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
            onChange={handlePassword}
            value={password}
            required
          />
        </label>
        <span id="error-register-email" className="register__error"></span>
        <button className="register__submit" type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__signin">Уже зарегистрированы? <Link to="/signin" className="register__signin_link">Войти</Link></p>
    </div>
  );
}

export default Register