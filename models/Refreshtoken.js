module.exports = (sequelize, DataTypes) => {
    const Refreshtoken = sequelize.define('Refreshtoken', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
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