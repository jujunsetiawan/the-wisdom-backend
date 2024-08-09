module.exports = (sequelize, DataTypes) => {
    const Lesson = sequelize.define('Lesson', {
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
        video: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chapter_id: {
            type: DataTypes.BIGINT,
            allowNull: false
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
        tableName: 'lesson',
        timestamps: true
    })

    return Lesson
}