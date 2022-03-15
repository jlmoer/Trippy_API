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
    cuisine: Joi.string().max(30).required(),
    priceCategory: Joi.number().min(1).max(3).required(),
});

// Création de la variable qui contient les restaurants:
const restaurants = [
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

// Création des routes de base pour manipuler les données qui correspondent aux restaurants:

// Création de la route GET qui retournera tous les restaurants:
router.get("/", (req, res) => {
    let currentRestaurant = restaurants;
    if (req.query.country) {
        currentRestaurant = currentRestaurant.filter((restaurant) => {
            return (
                restaurant.country.toLowerCase() === req.query.country.toLowerCase()
            )
        })
    }
    if (req.query.priceCategory) {
        currentRestaurant = currentRestaurant.filter((restaurant) => {
            return (
                restaurant.priceCategory.toString() === req.query.priceCategory.toString()
            )
        })
    }
    res.json(currentRestaurant)
});

// Création de la route GET qui retourne un restaurant par id:
router.get("/:id", (req, res) => {
    const restaurant = restaurants.find((restaurant) => {
        return restaurant.id === parseInt(req.params.id);
    });
    res.json({
        restaurant
    });
});

// Création de la route POST qui permet d'ajouter un nouveau restaurant:
router.post("/", (req, res) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({
            message: validationResult.error,
        });
    }
    restaurants.push({
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        stars: req.body.stars,
        cuisine: req.body.cuisine,
        priceCategory: req.body.priceCategory,
    });
    res.send("Restaurant ajouté");
});

// Création de la route PATCH  qui permet de mettre à jour le nom d'un restaurant:
router.patch("/:id", (req, res) => {
    const restaurant = restaurants.find((restaurant) => {
        return restaurant.id === parseInt(req.params.id);
    });
    restaurant.name = req.body.name;
    res.send("Nom modifié");
});

// Création de la route DELETE qui permet d'effacer un restaurant:
router.delete("/:id", (req, res) => {
    const restaurant = restaurants.find((restaurant) => {
        return restaurant.id === parseInt(req.params.id);
    });
    restaurant.name = req.body.name;
    res.send("Restaurant supprimé");
});

// Advanced CRUDs:

// Trouver les restaurants situés dans un certain pays:


// Export des modules:
module.exports = router;