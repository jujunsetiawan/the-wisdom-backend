module.exports = (sequelize, DataTypes) => {
    const MyCourse = sequelize.define('MyCourse', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        course_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        user_id: {
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
        tableName: 'my_course',
        timestamps: true
    })

    MyCourse.associate = (models) => {
        MyCourse.belongsTo(models.Course, { foreignKey: 'course_id' });
    };

    return MyCourse
}