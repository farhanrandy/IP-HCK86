'use strict';
module.exports = (sequelize, DataTypes) => {
  const SavedJob = sequelize.define('SavedJob', {
    userId: DataTypes.INTEGER,
    jobExternalId: DataTypes.STRING,
    source: DataTypes.ENUM('google'),
    jobPayload: DataTypes.JSONB,
  }, {});

  SavedJob.associate = function(models) {
    // SavedJob milik User
    SavedJob.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return SavedJob;
};
