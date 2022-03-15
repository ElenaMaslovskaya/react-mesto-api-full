import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";


function Card({ card, onCardClick, onCardLike, onCardDelete }) {
   const currentUser = React.useContext(CurrentUserContext);
   const isOwn = card.owner._id === currentUser._id;
   const isLiked = card.likes.some(i => i._id === currentUser._id);
   const cardDeleteButtonClassName = (`${isOwn ? 'element__remove' : 'element__remove_invisible'}`);
   const cardLikeButtonClassName = `element__like-icon ${isLiked ? "element__like-icon_active" : "element__like-icon"}`;

   function handleClick() {
      onCardClick(card);
   }

   function handleLikeClick() {
      onCardLike(card);
   }

   function handleDeleteClick() {
      onCardDelete(card);
   }

   return (
      <div className="element">
         <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
         <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
         <div className="element__like-container">
            <h2 className="element__name">{card.name}</h2>
            <div className="element__likes">
               <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
               <span className="element__likes-counter">{card.likes.length}</span>
            </div>
         </div>
      </div>
   )
};

export default Card;