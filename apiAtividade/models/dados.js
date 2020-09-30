module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('dados', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        temperatura: {
            type: DataTypes.FLOAT,
            defaultValue: null
        },
        velocidade_vento: {
            type: DataTypes.FLOAT,
            defaultValue: null
        },
        umidade: {
            type: DataTypes.FLOAT,
            defaultValue: null
        },
        data: {
            type: DataTypes.STRING(250),
            defaultValue: null
        }
    }, 
    {
        underscored: true,
        timestamps: false
    });

    model.associate = models => {
        model.belongsTo(models.estacoes, {
            as: 'estacao',
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE'
        })
    }

    return model;
}