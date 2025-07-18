"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGameRoutes = registerGameRoutes;
const GameProvider_1 = require("../GameProvider");
const users_1 = __importDefault(require("../models/users")); // Adjust path as needed
function registerGameRoutes(app) {
    const gameProvider = new GameProvider_1.GameProvider();
    // Create Game
    app.post("/api/game", async (req, res) => {
        try {
            const { title, sport, level, location, description, players, img, organizer } = req.body;
            // Fetch complete user documents for the players array
            const playerDocs = await Promise.all(players.map(async (playerId) => {
                const userDoc = await users_1.default.findById(playerId);
                if (!userDoc) {
                    throw new Error(`User with id ${playerId} not found`);
                }
                return userDoc;
            }));
            // Fetch complete document for the organizer
            const organizerDoc = await users_1.default.findById(organizer);
            if (!organizerDoc) {
                res.status(404).json({ message: "Organizer not found" });
                return;
            }
            // Use the embedded documents instead of raw IDs
            const game = await gameProvider.addGame(title, sport, level, location, description, playerDocs, // Array of embedded player (user) documents
            img, organizerDoc // Embedded organizer (user) document
            );
            res.status(200).send(game);
        }
        catch (err) {
            console.error("FAILED TO CREATE GAME:", err);
            res.status(500).send(err);
        }
    });
    // Get Game by Id
    app.get("/api/game/:id", (req, res) => {
        const gameId = req.params.id;
        gameProvider
            .findGame(gameId)
            .then((game) => {
            res.send(game);
        })
            .catch((err) => {
            res.status(500).send(err);
        });
    });
    // Get all created games
    app.get("/api/games", (req, res) => {
        gameProvider
            .findAllGames()
            .then((games) => {
            res.send(games);
        })
            .catch((err) => {
            res.status(500).send(err);
        });
    });
    // Add a player to a game
    app.post("/api/games/:id/player", async (req, res) => {
        const gameId = req.params.id;
        const playerId = req.body.playerId;
        // Get the player document
        const player = await users_1.default.findById(playerId);
        if (!player) {
            throw new Error("Player not found");
        }
        gameProvider
            .addPlayerToGame(gameId, player)
            .then(() => {
            res.send(player);
        })
            .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
    });
    // Delete player from game
    app.delete("/api/games/:id/player", async (req, res) => {
        const gameId = req.params.id;
        const playerId = req.body.playerId;
        // Get the player document
        const player = await users_1.default.findById(playerId);
        if (!player) {
            throw new Error("Player not found");
        }
        gameProvider
            .deletePlayerFromGame(gameId, player)
            .then(() => {
            // Send player removed from game
            res.send(player);
        })
            .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
    });
}
