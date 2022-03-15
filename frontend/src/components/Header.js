import logo from '../logo.svg'
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function Header(props) {
   return (
      <header className="header">
         <img className="header__logo" alt="Логотип" src={logo} />
         <nav className="header__menu">
         <Switch>
            <Route exact path='/'>
                  <span className="header__info-email">{props.email}</span>
                  <Link to='/sign-in' className='header__link' onClick={props.onSignOut}>Выйти</Link>
            </Route>
            <Route path='/sign-in'>
               <Link to='/sign-up' className='header__link '>Регистрация</Link>
            </Route>
            <Route path='/sign-up'>
               <Link to='/sign-in' className='header__link '>Войти</Link>
            </Route>
         </Switch>
         </nav>
      </header>
   )
};

export default Header;