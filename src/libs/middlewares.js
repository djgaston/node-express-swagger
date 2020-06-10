import express from 'express';

module.exports = app => {

  // Settings
  app.set('port', process.env.PORT || 3000);
  app.set('json spaces', 4);

  // Middlewares
  // translates POST/PUT to json format
  app.use(express.json());
  app.use((req, res, next) => {
    // delete req.body.id;
    next();
  });

};