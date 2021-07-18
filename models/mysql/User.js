module.exports = (connection, sequelize) => {
  const User = connection.define("user", {
    username: {
      type: sequelize.STRING,
      allowNull: false
    },
  });

  return User;
};