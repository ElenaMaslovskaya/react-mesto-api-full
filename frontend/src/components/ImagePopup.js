import React from "react";

function ImagePopup({ card, onClose }) {
   return (
      <section className={`popup ${card.link ? "popup_opened" : ""}`} id="image-popup">
         <div className="popup__container popup__container_image">
            <figure className="popup__figure">
               <button type="button" className="popup__close" onClick={onClose}></button>
               <img className="popup__image"
                  src={card.link} alt={card.name} />
                  <figcaption className="popup__caption">{card.name}</figcaption>
            </figure>
         </div>
      </section>
   )
};

export default ImagePopup;