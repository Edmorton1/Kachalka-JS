const express = require('express');
const knexfile = require('../db/knexfile');
const knex = require('knex'); // Импорт Knex
const crud = require('./crud');

const app = express();
const port = 5174;

// Инициализация Knex с конфигурацией
const db = knex(knexfile.development);

app.use(express.json())

crud('types', app, db)
crud('records', app, db)
crud('statistic', app, db)
crud('usertable', app, db)

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});