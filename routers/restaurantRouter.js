// Import de Joi:
const Joi = require("joi");

// Import d'express:
const express = require("express");
const router = express.Router();

// Création du schéma Joi:
const schema = Joi.object({
    name: Joi.string().max(30).required(),
    address: Joi.string().max(30).required(),
    city: Joi.string().max(30).required(),
    country: Joi.string().max(30).required(),
    stars: Joi.number().min(1).max(5).required(),
    cuisine: Joi.string().max(30).required(),
    priceCategory: Joi.number().min(1).max(3).required(),
});

// Export des modules:
module.exports = router;