import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {

   function handleSubmit(event) {
      event.preventDefault();
      props.onConfirm(props.card);
   };

   return (
      <PopupWithForm //Попап редактирования аватара пользователя
         name="confirm"
         title="Вы уверены?"
         button="button"
         text="Да"
         textLoading="Удаление..."
         isOpen={props.isOpen}
         onClose={props.onClose}
         onSubmit={handleSubmit}
         isLoading={props.isLoading}
      >
      </PopupWithForm>
   )
}

export default ConfirmPopup;