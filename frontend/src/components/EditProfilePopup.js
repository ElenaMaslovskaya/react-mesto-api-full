import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

   const [name, setName] = React.useState('');
   const [description, setDescription] = React.useState('');
   const currentUser = React.useContext(CurrentUserContext);

   React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
   }, [currentUser, props.isOpen]);
   
   function handleChangeName(event) {
      setName(event.target.value);
   };

   function handleChangeDescription(event) {
      setDescription(event.target.value);
   };

   function handleSubmit(event) {
      event.preventDefault();
      props.onUpdateUser({
         name,
         about: description
      });
   };

   return (
      <PopupWithForm  //   Попап редактирования профиля пользователя
         name="user"
         title="Редактировать профиль"
         button="save"
         text="Сохранить"
         textLoading="Сохранение..."
         isOpen={props.isOpen}
         onClose={props.onClose}
         onSubmit={handleSubmit}
      >
         <input
            type="text"
            id="name"
            name="name"
            placeholder="Имя"
            className="popup__input"
            required
            minLength="2"
            maxLength="40"
            value={`${name}`}
            onChange={handleChangeName}
         />
         <span className="error" id="name-error"></span>
         <input
            type="text"
            id="job"
            name="job"
            placeholder="О себе"
            className="popup__input"
            required
            minLength="2"
            maxLength="200"
            value={`${description}`}
            onChange={handleChangeDescription}
         />
         <span className="error" id="job-error"></span>
      </PopupWithForm>
   )
}

export default EditProfilePopup;