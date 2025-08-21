'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SavedJobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jobExternalId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      source: {
        type: Sequelize.ENUM('google'),
        allowNull: false
      },
      jobPayload: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Unique composite (userId, jobExternalId, source)
    await queryInterface.addConstraint('SavedJobs', {
      fields: ['userId', 'jobExternalId', 'source'],
      type: 'unique',
      name: 'unique_savedjob_user_job_source'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SavedJobs');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_SavedJobs_source";');
  }
};
