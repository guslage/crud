module.exports = (sequelize, DataTypes) => {
    const estacoes = sequelize.define('estacoes', {
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

    estacoes.associate = models => {
        estacoes.hasMany(models.dados);
    }

    return estacoes;
}