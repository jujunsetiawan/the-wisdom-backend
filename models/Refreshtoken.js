module.exports = (sequelize, DataTypes) => {
    const Refreshtoken = sequelize.define('Refreshtoken', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        token: {
            type: DataTypes.TEXT('long'),
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
        tableName: 'refresh_token',
        timestamps: true
    });

    return Refreshtoken;
}