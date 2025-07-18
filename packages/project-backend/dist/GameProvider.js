"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameProvider = void 0;
const games_1 = __importDefault(require("./models/games"));
class GameProvider {
    async addGame(title, sport, level, location, description, players, img, organizer) {
        const gameToAdd = new games_1.default({ title, sport, level, location, description, players, img, organizer });
        const promise = gameToAdd.save();
        return promise;
    }
    // Get all created games
    async findAllGames() {
        return games_1.default.find();
    }
    // Get a game by id
    async findGame(gameId) {
        return games_1.default.findById(gameId);
    }
    // Update a game
    async updateGame(gameId, updatedGame /*GamesType*/) {
        return games_1.default.findOneAndUpdate({ _id: gameId }, updatedGame, { new: true });
    }
    // Add Player to game
    async addPlayerToGame(gameId, player) {
        // Check if player is already in game
        const game = await games_1.default.findOne({ _id: gameId, players: player });
        if (game) {
            throw new Error("Player already in game");
        }
        return games_1.default.findOneAndUpdate({ _id: gameId }, 
        // Add the player (document)
        { $push: { players: player } }, { new: true });
    }
    async deletePlayerFromGame(gameId, player) {
        return games_1.default.findOneAndUpdate({ _id: gameId }, 
        // Remove the player (document)
        { $pull: { players: player } }, { new: true });
    }
    async deleteGame(gameId) {
        return games_1.default.findOneAndDelete({ _id: gameId });
    }
}
exports.GameProvider = GameProvider;
