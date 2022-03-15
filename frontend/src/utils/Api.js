export class Api {
   constructor(config) {
      this.source = config.source
      this.cohort = config.cohort
      this.token = config.token
   }
   //checking if the server's responce is ok
   _serverResponse(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
   }

   //Получить данные пользователя
   getUserInfo() {
      return fetch(`${this.source}/${this.cohort}/users/me`, {
         method: 'GET',
         headers: {
            authorization: this.token,
            'Content-Type': 'application/json'
         }
      })
         .then(res => this._serverResponse(res))
   }

   //Получить карточки
   getInitialCards() {
      return fetch(`${this.source}/${this.cohort}/cards`, {
         method: 'GET',
         headers: {
            authorization: this.token,
            'Content-Type': 'application/json'
         }
      })
         .then(res => this._serverResponse(res))
   }

   //Обновить информацию о пользователе
   updateUserInfo({ name, about }) {
      return fetch(`${this.source}/${this.cohort}/users/me`, {
         method: 'PATCH',
         headers: {
            authorization: this.token,
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
   updateUserAvatar({ avatar }) {
      return fetch(`${this.source}/${this.cohort}/users/me/avatar`, {
         method: 'PATCH',
         headers: {
            authorization: this.token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            avatar: avatar
         })
      })
         .then(res => this._serverResponse(res))
   }

   //Добавить новую карточку
   addNewCard({ name: place, link: source }) {
      return fetch(`${this.source}/${this.cohort}/cards`, {
         method: 'POST',
         headers: {
            authorization: this.token,
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
   deleteCard(cardId) {
      return fetch(`${this.source}/${this.cohort}/cards/${cardId}`, {
         method: 'DELETE',
         headers: {
            authorization: this.token,
         }
      })
         .then(res => this._serverResponse(res))
   }
   
   //лайки
   changeCardLikeStatus(cardId, isLiked) {
      return fetch(`${this.source}/${this.cohort}/cards/likes/${cardId}`, {
         method: `${isLiked ? "PUT" : "DELETE"}`,
         headers: {
            authorization: this.token,
            "Content-type": "application/json",
         },
      }).then((res) => {
         return this._serverResponse(res);
      });
   }
}


export const api = new Api({
   source: 'https://mesto.nomoreparties.co/v1',
   cohort: 'cohort-30',
   token: 'eb8cafe8-806f-4128-87f6-a89a8c96159b'
})