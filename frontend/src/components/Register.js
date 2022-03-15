import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');

   function handleEmailChange(event) {
      setEmail(event.target.value);
   }

   function handlePasswordChange(event) {
      setPassword(event.target.value);
   }

   function handleSubmit(event) {
      event.preventDefault();
      props.onRegister({ email, password })
   }

   return (
      <section className="auth-content">
         <form className="auth-content__form" onSubmit={handleSubmit}>
            <h2 className="auth-content__title">
               Регистрация
            </h2>
            <input
               className="auth-content__input"
               required
               id="email"
               name="email"
               type="email"
               placeholder="Email"
               value={email}
               onChange={handleEmailChange}
               autoComplete="off"
            />
            <input
               className="auth-content__input"
               required
               id="password"
               name="password"
               type="password"
               placeholder="Пароль"
               value={password}
               onChange={handlePasswordChange}
               autoComplete="off"
               minLength="6"
               maxLength="20"
            />
            <button className="auth-content__button" type="submit">Зарегистрироваться</button>
            <Link to="/sign-in" className="auth-content__link-login">Уже зарегистрированы? Войти</Link>
         </form>
      </section>
   )

}

export default Register;