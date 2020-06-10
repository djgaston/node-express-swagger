module.exports = app => {

  const User = app.db.models.User;

    /**
     * @swagger
     * /v1/users
     *   get:
     *     description: Use
     *     responses:
     *        '200':
     *          description: successful
     */
  app.route('/v1/users')
      .get((req, res) => {
        User.findAll({
            attributes: ['id', 'name', 'email']
        })
            .then(result => res.json(result))
            .catch(error => {
              res.status(412).json({msg: error.message});
            });
      })
      .post((req, res) => {
        User.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
              res.status(412).json({msg: error.message});
            });
      });

  app.route('/v1/users/:id')
      .get((req, res) => {
        User.findOne({where: req.params})
            .then(result => {
              if (result) {
                res.json(result);
              } else {
                res.sendStatus(404);
              }
            })
            .catch(error => {
              res.status(412).json({msg: error.message});
            });
      })
      .put((req, res) => {
        User.update(req.body, {where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error => {
              res.status(412).json({msg: error.message});
            });
      })
      .delete((req, res) => {
        User.destroy({where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error => {
              res.status(204).json({msg: error.message});
            });
      });

/*
  app.get('/users/:id', (req, res) => {
    User.findById(req.params.id, {
      attributes: ['id', 'name', 'email']
    })
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });

  app.delete('/users/:id', (req, res) => {
    User.destroy({where: {id: req.params.id}})
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });

  app.post('/users', (req, res) => {
    User.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });
*/
};