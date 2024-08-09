module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        course_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        ratting: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
            allowNull: false
        },
        note: {
            type: DataTypes.TEXT('long'),
            allowNull: true
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
        tableName: 'review',
        timestamps: true
    })

    return Review
}