import express, {Request, Response, NextFunction} from "express";
import {CommentProvider} from "../CommentProvider";
import {ObjectId} from "mongodb";
import User from "../models/users"; // Adjust path as needed
import gamesModel from "../models/games";

export function registerCommentRoutes(app: express.Application) {
	const commentProvider = new CommentProvider();

	// Add comment to game page
	app.post("/api/comment", async (req: Request, res: Response) => {
		const content = req.body.content;
		const userId = req.body.userId;
		const gameId = req.body.gameId;

		// Get the player document
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("Player not found");
		}

		try {
            // Create comment 
			const comment = await commentProvider.createComment(content, user, gameId);
            // Add comment to game
            await gamesModel.findOneAndUpdate({_id: gameId}, {$push: {comments: comment}});
            res.status(200).send(comment);
		} catch (error) {
			console.log("Error creating comment:", error);
			res.status(500).send();
		}
	});
}
