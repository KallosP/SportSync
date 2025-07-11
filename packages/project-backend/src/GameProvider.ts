import gamesModel from "./models/games";
import usersModel, { UsersType } from "./models/users";
import { /*GamesType*/ } from "./models/games";
import mongoose from "mongoose";

export class GameProvider {
	async addGame(
		title: string,
		sport: string,
		level: string,
		location: string,
		description: string,
		players: UsersType[],
		img: string,
        organizer: UsersType 
	) {
		const gameToAdd = new gamesModel({title, sport, level, location, description, players, img, organizer});
		const promise = gameToAdd.save();
		return promise;
	}

    // Get all created games
    async findAllGames() {
        return gamesModel.find(); 
    }

    // Get a game by id
	async findGame(gameId: string) {
		return gamesModel.findById(gameId);
	}

    // Update a game
	async updateGame(gameId: string, updatedGame: any/*GamesType*/) {
		return gamesModel.findOneAndUpdate({_id: gameId}, updatedGame, {new: true});
	}

	// Add Player to game
	async addPlayerToGame(gameId: string, player: UsersType) {
		// Check if player is already in game
		const game = await gamesModel.findOne({_id: gameId, players: player});
		if (game) {
			throw new Error("Player already in game");
		}

		return gamesModel.findOneAndUpdate(
			{_id: gameId},
			// Add the player (document)
			{$push: {players: player}},
			{new: true}
		);
	}

	async deletePlayerFromGame(gameId: string, player: UsersType) {
		return gamesModel.findOneAndUpdate(
			{_id: gameId},
			// Remove the player (document)
			{$pull: {players: player}},
			{new: true}
		);
	}
}
