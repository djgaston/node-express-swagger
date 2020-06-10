module.exports = app => {
  
  const Task = app.db.models.Task;

  /**
   * @swagger
   * /v1/tasks
   *   get:
   *     description: Use
   *     responses:
   *        '200':
   *          description: successful
   */
  app.route('/v1/tasks')
    .get((req, res) => {
      Task.findAll({})
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .post((req, res) => {
      Task.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

  app.route('/v1/tasks/:id')
    .get((req, res) => {
      Task.findOne({where: req.params})
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
      Task.update(req.body, {where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .delete((req, res) => {
      Task.destroy({where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(204).json({msg: error.message});
        });
    });

};