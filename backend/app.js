const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { validateUser, validateLogin } = require('./middlewares/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const users = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({
  origin: 'https://maslovski.praktikum.nomoredomains.xyz',
  credentials: true,
}));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

// подключаем rate-limiter
app.use(limiter);

app.use(requestLogger); // подключаем логгер запросов

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post('/signup', validateUser, createUser);
app.post('/signin', validateLogin, login);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use('/', users);
app.use('/', cards);

app.use(errorLogger); // подключаем логгер ошибок

app.use(() => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
