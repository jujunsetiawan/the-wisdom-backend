module.exports = (sequelize, DataTypes) => {
    const ImageCourse = sequelize.define('ImageCourse', {
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
        image_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        image_url: {
          type: DataTypes.STRING,
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
        tableName: 'image_course',
        timestamps: true
    })

    return ImageCourse
}