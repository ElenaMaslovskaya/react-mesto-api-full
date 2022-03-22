const jwt = require('jsonwebtoken');
const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM0NjE0MTliNDU0MWY3MjI1MDM4OTAiLCJpYXQiOjE2NDc5ODAzMTUsImV4cCI6MTY0ODU4NTExNX0.J11jq5QH0o4SzKSQac5Eh07XcaFYXssACgA3vDr8sd8'; // вставьте сюда JWT, который вернул публичный сервер студента
const SECRET_KEY_DEV = 'dev-secret'; // вставьте сюда секретный ключ для разработки из кода студента
try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m', 'Всё в порядке. Секретные ключи отличаются'
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err
    );
  }
}
