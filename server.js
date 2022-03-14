// Import d'express:
const express = require("express");
const app = express();
const hotelsRouter = require("./routers/hotelRouter.js");
const restaurantsRouter = require("./routers/restaurantRouter.js");

// Déclaration qui permet des réponses en json:
app.use(express.json());

// Import des routes:
app.use("/hotels", hotelsRouter);
app.use("/restaurants", restaurantsRouter);
app.get("/", (_req, res) => {
    res.send("trippy_api")
})

// Création du serveur:
app.listen(8000, () => console.log("Listening on port 8000..."));
