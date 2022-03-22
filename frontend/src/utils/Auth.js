export class Auth {
   constructor({ baseURL }) {
      this._baseURL = baseURL
   }

   _checkResponse(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
   }
   //registration
   register(email, password) {
      return fetch(`${this._baseURL}/signup`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email: email,
            password: password,
         }),
      })
         .then(res => this._checkResponse(res))
   };
   //authorisation
   authorize(email, password) {
      return fetch(`${this._baseURL}/signin`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email, password }),
      })
         .then(res => this._checkResponse(res))
   };

   getData(token) {
      return fetch(`${this._baseURL}/users/me`, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         },
      })
         .then(res => this._checkResponse(res))
   };
}

export const auth = new Auth({
   baseURL: 'https://api.maslovski.praktikum.nomoredomains.work',
   //baseURL: 'http://localhost:3001',
})