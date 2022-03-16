export class Api {
   constructor(config) {
      this.source = config.source
   }
   //checking if the server's responce is ok
   _serverResponse(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
   }

   //Получить данные пользователя
   getUserInfo(token) {
      return fetch(`${this.source}/users/me`, {
         method: 'GET',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
         }
      })
         .then(res => this._serverResponse(res))
   }

   //Получить карточки
   getInitialCards(token) {
      return fetch(`${this.source}/cards`, {
         method: 'GET',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
         }
      })
         .then(res => this._serverResponse(res))
   }

   //Обновить информацию о пользователе
   updateUserInfo({ name, about }, token) {
      return fetch(`${this.source}/users/me`, {
         method: 'PATCH',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name,
            about,
         })
      })
         .then(res => this._serverResponse(res))
   }

   //Обновить аватар
   updateUserAvatar({ avatar }, token) {
      return fetch(`${this.source}/users/me/avatar`, {
         method: 'PATCH',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            avatar: avatar
         })
      })
         .then(res => this._serverResponse(res))
   }

   //Добавить новую карточку
   addNewCard({ name: place, link: source }, token) {
      return fetch(`${this.source}/cards`, {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: place,
            link: source
         })
      })
         .then(res => this._serverResponse(res))
   }

   //Удалить карточку
   deleteCard(cardId, token) {
      return fetch(`${this.source}/cards/${cardId}`, {
         method: 'DELETE',
         headers: {
            Authorization: `Bearer ${token}`,
         }
      })
         .then(res => this._serverResponse(res))
   }
   
   //лайки
   changeCardLikeStatus(cardId, isLiked, token) {
      return fetch(`${this.source}/cards/${cardId}/likes`, {
         method: `${isLiked ? "PUT" : "DELETE"}`,
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
         },
      }).then((res) => {
         return this._serverResponse(res);
      });
   }
}


export const api = new Api({
   source: 'https://api.maslovski.praktikum.nomoredomains.work',
})