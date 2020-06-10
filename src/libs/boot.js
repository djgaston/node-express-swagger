module.exports = app => {

  // Create tables from models before starting the server
  app.db.sequelize.sync().done(() => {
    app.listen(app.get('port'), () => {
      console.log('Server on port', app.get('port'));
    });
  });

};