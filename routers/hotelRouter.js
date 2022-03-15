// Import de Joi:
const Joi = require("joi");

// Import d'express:
const express = require("express");
const router = express.Router();

// Création du schéma Joi:
const schema = Joi.object({
    id: Joi.number().required(),
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
        "name": "Imperial Hotel",
        "address": "84 av des Champs-Élysées",
        "city": "Paris",
        "country": "France",
        "stars": 5,
        "hasSpa": true,
        "hasPool": true,
        "priceCategory": 3
    },
    {
        "id": 2,
        "name": "The Queen",
        "address": "3 Darwin Street",
        "city": "London",
        "country": "England",
        "stars": 4,
        "hasSpa": true,
        "hasPool": false,
        "priceCategory": 3
    },
    {
        "id": 3,
        "name": "Kiwi land",
        "address": "4587 George St.",
        "city": "Auckland",
        "country": "New-Zealand",
        "stars": 3,
        "hasSpa": false,
        "hasPool": true,
        "priceCategory": 2
    }
]

// Création des routes de base pour manipuler les données qui correspondent aux hôtels:

// Création de la route GET qui retournera tous les hôtels:
router.get("/", (req, res) => {
    let currentHotel = hotels;
    if (req.query.country) {
        currentHotel = currentHotel.filter((hotel) => {
            return (
                hotel.country.toString().toLowerCase() === req.query.country.toString().toLowerCase()
            )
        })
    }
    // console.log(req.query);
    if (req.query.priceCategory) {
        currentHotel = currentHotel.filter((hotel) => {
            return (
                hotel.priceCategory.toString() === req.query.priceCategory.toString()
            )
        })
    }
    if (req.query.hasSpa) {
        currentHotel = currentHotel.filter((hotel) => {
            return (
                hotel.hasSpa.toString() === req.query.hasSpa.toString()
            )
        })
    }
    if (req.query.hasPool) {
        currentHotel = currentHotel.filter((hotel) => {
            return (
                hotel.hasPool.toString() === req.query.hasPool.toString()
            )
        })
    }
    res.json(currentHotel)
});

// Création de la route GET qui retourne un hôtel par id:
router.get("/:id", (req, res) => {
    const hotel = hotels.find((hotel) => {
        return hotel.id === parseInt(req.params.id);
    });
    res.json({
        hotel
    })
});

// Création de la route POST qui permet d'ajouter un nouvel hôtel:
router.post("/", (req, res) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({
            message: validationResult.error,
        });
    }
    hotels.push({
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        stars: req.body.stars,
        hasSpa: req.body.hasSpa,
        hasPool: req.body.hasPool,
        priceCategory: req.body.priceCategory,
    });
    res.send("Hôtel ajouté");
});

// Création de la route PATCH qui permet de mettre à jour le nom d'un hôtel:
router.patch("/:id", (req, res) => {
    const hotel = hotels.find((hotel) => {
        return hotel.id === parseInt(req.params.id);
    });
    hotel.name = req.body.name;
    res.send("Nom modifié");
});

// Création de la route DELETE qui permet d'effacer un hôtel:
router.delete("/:id", (req, res) => {
    const hotel = hotels.find((hotel) => {
        return hotel.id === parseInt(req.params.id);
    });
    hotel.name = req.body.name;
    res.send("Hôtel supprimé");
});

// Export des modules:
module.exports = router;