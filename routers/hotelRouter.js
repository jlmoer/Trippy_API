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
    hasSpa: Joi.boolean().required(),
    hasPool: Joi.boolean().required(),
    priceCategory: Joi.number().min(1).max(3).required(),
});

// Création de la variable qui contient les hôtels:
const hotels = [
    {
        "id": 1,
        "name": "Les trois Mousquetaires",
        "address": "22 av des Champs-Élysées",
        "city": "Paris",
        "country": "France",
        "stars": 4,
        "cuisine": "french",
        "priceCategory": 3
    },
    {
        "id": 2,
        "name": "The Fat Guy",
        "address": "47 Jackson Boulevard",
        "city": "New York",
        "country": "US",
        "stars": 5,
        "cuisine": "burger",
        "priceCategory": 1
    },
    {
        "id": 3,
        "name": "Veggies",
        "address": "77 Avenir Street",
        "city": "Sydney",
        "country": "Australia",
        "stars": 5,
        "cuisine": "vegan",
        "priceCategory": 2
    }
]

// Création des routes de base pour manipuler les données qui correspondent aux hôtels:

// Création de la route GET ("/hotels") qui retournera tous les hôtels:
router.get("/", (_req, res) => {
    res.json(hotels)
});

// Export des modules:
module.exports = router;