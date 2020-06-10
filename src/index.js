// import express from 'express';
const express = require('express');
const app = express();

import consign from 'consign';

// import swaggerJsDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const port = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "my",
            description: "my API",
            contact: {
                name: "me"
            },
            servers: ["http://localhost:" + port]
        }
    },
    swagger: "2.0",
    basePath: "/v1",
    schemes: [
        "http",
        "https"
    ],
    consumes: [
        "application/json"
    ],
    produces: [
        "application/json"
    ],
    apis: ['.routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


// Routes
consign({cwd: __dirname})
  .include('libs/config.js')
  .then('db.js')
  .then('libs/middlewares.js')
  .then('routes')
  .then('libs/boot.js')
  .into(app);