'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    googleId: { type: DataTypes.STRING, unique: true },
  }, {});

  User.associate = function(models) {
    // User punya banyak Resume & SavedJob
    User.hasMany(models.Resume, { foreignKey: 'userId' });
    User.hasMany(models.SavedJob, { foreignKey: 'userId' });
  };

  return User;
};
