const express = require("express");

function crud(path, app, db) {
    app.use(express.json());
  
    try {
      // Получение всех записей
      app.get(`/api/${path}`, async (req, res) => {
        const obj = await db(path).orderBy('id','desc');
        res.json(obj);
      });
  
      // Получение записи по ID
      app.get(`/api/${path}/:id`, async (req, res) => {
        const id = req.params.id;
        const obj = await db(path).select("*").where({ id: id });
        res.json(obj);
      });
  
      // Создание записи
      app.post(`/api/${path}`, async (req, res) => {
        try {
          const info = req.body;
          await db(path).insert(info);
          res.json(info);
        } catch (err) {
          console.log(err)
        }
      });
  
      // Обновление записи
      app.put(`/api/${path}/:id`, async (req, res) => {
        try {
          const id = req.params.id;
          const info = req.body;
          await db(path).select("*").where({ id: id }).update(info);
          res.json(info);
        } catch (err) {
          console.log(err)
        }
      });
  
      // Удаление записи
      app.delete(`/api/${path}/:id`, async (req, res) => {
        try {
          const id = req.params.id;
          await db(path).select("*").where({ id: id }).delete();
          res.json("Deleted");
        } catch (err) {
          console.log(err)
        } 
      });
    } catch (err) {
      console.log(err);
    }
  }

module.exports = crud;
