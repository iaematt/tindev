const { Schema, model } = require('mongoose');

const CombustivelSchema = new Schema ({
    cliente: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    id_ticket: {
        type: Number,
        required: true,
    },
    km_inicial: {
        type: Number,
        required: true,
    },
    km_final: {
        type: Number,
        required: true,
    },
    km_total: {
        type: Number,
        required: true,
    },
    obs: {
        type: String,
    },
}, {
    timestamps: true, 
});

module.exports = model('Combustivel', CombustivelSchema);