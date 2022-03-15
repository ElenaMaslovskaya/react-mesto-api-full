import React from "react";
import imageSuccess from "../images/register-success.svg";
import imageFail from "../images/register-fail.svg";

function InfoTooltip(props) {

   return (
      <section className={`tooltip ${props.isOpen ? "tooltip_opened" : ""}`}>
         <div className={`tooltip__container`}>
            <button type="button" className="tooltip__close" onClick={props.onClose}></button>
            <img className="tooltip__icon" src={props.signupState ? imageSuccess : imageFail} alt="#" />
            <h2 className="tooltip__title">{props.signupState 
            ? 'Вы успешно зарегистрировались!' 
            : 'Что-то пошло не так! Попробуйте еще раз'}</h2>
         </div>
      </section>
   )
}

export default InfoTooltip;