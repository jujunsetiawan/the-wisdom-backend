module.exports = (sequelize, DataTypes) => {
    const PaymentLog = sequelize.define('PaymentLog', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        payment_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        raw_response: {
            type: DataTypes.JSON,
            allowNull: false
        },
        order_id: {
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
        },
    }, {
        tableName: 'payment_log',
        timestamps: true
    })

    return PaymentLog
}