module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        certificate: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM('free', 'premium'),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('draft', 'published'),
            allowNull: false
        },
        price: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        level: {
          type: DataTypes.ENUM('all-level', 'beginner', 'intermediate', 'advance'),
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT('long'),
          allowNull: true
        },
        mentor_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'course',
        timestamps: true
    });

    return Course;
}