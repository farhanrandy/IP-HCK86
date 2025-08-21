'use strict';
module.exports = (sequelize, DataTypes) => {
  const Resume = sequelize.define('Resume', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    contentText: DataTypes.TEXT,
  }, {});

  Resume.associate = function(models) {
    // Resume milik User
    Resume.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Resume;
};
