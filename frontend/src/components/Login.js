import React from "react";
import { withRouter } from "react-router-dom";

function Login(props) {
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
      if (!email || !password) {
         return;
      }
      props.onLogin({ email, password })
   }

   return (
      <section className="auth-content">
         <form className="auth-content__form" onSubmit={handleSubmit}>
            <h2 className="auth-content__title">Вход</h2>
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
            <button className="auth-content__button" type="submit">Войти</button>
         </form>
      </section>
   )
}

export default withRouter(Login);