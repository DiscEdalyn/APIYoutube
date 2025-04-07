require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express()
const PORT = 3000;

//Permitir CORS
app.use(cors());
//Clave de API (cargar desde .env)
const API_KEY = process.env.YT_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

//Ruta para buscar videos
app.get("/search", async (req, res) => {
    try {
        const query = req.query.q || "Node.js tutorial";
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                part: "snippet",
                q: query,
                key: API_KEY,
                maxrResults: 5,
            },
        });
        res.json(response.data)
    } catch(error){
        res.status(500).json({error: error.message});
    }
});
//Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));