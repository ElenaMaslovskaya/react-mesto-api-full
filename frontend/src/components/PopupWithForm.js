import React from "react";

function PopupWithForm(props) {

   return (
      <section className={`popup ${props.isOpen ? "popup_opened" : ""}`} id={`${props.name}-popup`}>
         <div className={`popup__container popup__container_${props.name}`}>
            <button type="button" className="popup__close" onClick={props.onClose}></button>
            <h2 className="popup__title">{props.title}</h2>
            <form className="popup__form" id={`${props.name}-form`} onSubmit={props.onSubmit}>
               {props.children}
               <button type="submit" className="popup__button" id={`${props.name}-button`}>{props.text}</button>
            </form>
         </div>
      </section>
   )
}

export default PopupWithForm;