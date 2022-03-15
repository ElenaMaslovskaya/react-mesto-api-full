import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
   const [title, setTitle] = React.useState('');
   const [link, setLink] = React.useState('');

   React.useEffect(() => {
      setTitle('');
      setLink('');
   }, [props.isOpen]);

   function handleChangeTitle(event) {
      setTitle(event.target.value);
   }

   function handleChangeLink(event) {
      setLink(event.target.value);
   }

   function handleSubmit(event) {
      event.preventDefault();
      props.onAddPlace({
         name: title,
         link: link
      })
   }

   return (
      <PopupWithForm //Попап добавления фотографий
         name="photo"
         title="Новое место"
         button="create"
         text="Создать"
         textLoading="Создается..."
         isOpen={props.isOpen}
         onClose={props.onClose}
         onSubmit={handleSubmit}
         isLoading={props.isLoading}
      >
         <input
            type="text"
            id="photo-name"
            name="photo-name"
            placeholder="Название"
            className="popup__input"
            required
            minLength="2"
            maxLength="30"
            value={`${title}`}
            onChange={handleChangeTitle}
         />
         <span className="error" id="photo-name-error"></span>
         <input
            type="url"
            id="link"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__input"
            required
            value={`${link}`}
            onChange={handleChangeLink}
         />
         <span className="error" id="link-error"></span>
      </PopupWithForm>
   )
};

export default AddPlacePopup;