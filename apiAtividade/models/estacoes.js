module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('estacoes', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        serial: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        lat: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        lon: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        nome: {
            type: DataTypes.STRING(100),
            defaultValue: null
        },

    },  
    {
        name: { singular: 'estacao', plural: 'estacoes'},
        underscored: true,
        timestamps: false
    });

    model.associate = models => {
        model.hasMany(models.dados);
    }

    return model;
}