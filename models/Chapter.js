module.exports = (sequelize, DataTypes) => {
    const Chapter = sequelize.define('Chapter', {
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
        course_id: {
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
        tableName: 'chapter',
        timestamps: true
    })

    Chapter.associate = (models) => {
        Chapter.hasMany(models.Lesson, { foreignKey: 'chapter_id', as: 'lesson' });  // Asosiasi hasMany
    };

    return Chapter
}