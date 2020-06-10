module.exports = (sequelize, DataType) => {

  const Task = sequelize.define('Task', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    isDone: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isDeleted: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User);
  };

  return Task;
};