module.exports = (connection, sequelize) => {
  const Todo = connection.define("todo", {
    subject: {
      type: sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    done: {
      type: sequelize.BOOLEAN,
      allowNull: false,
      defaultValue:false
    }
  });

  return Todo;
};