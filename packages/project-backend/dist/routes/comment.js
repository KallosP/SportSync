"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommentRoutes = registerCommentRoutes;
const CommentProvider_1 = require("../CommentProvider");
const users_1 = __importDefault(require("../models/users")); // Adjust path as needed
const games_1 = __importDefault(require("../models/games"));
function registerCommentRoutes(app) {
    const commentProvider = new CommentProvider_1.CommentProvider();
    // Add comment to game page
    app.post("/api/comment", async (req, res) => {
        const content = req.body.content;
        const userId = req.body.userId;
        const gameId = req.body.gameId;
        // Get the player document
        const user = await users_1.default.findById(userId);
        if (!user) {
            throw new Error("Player not found");
        }
        try {
            // Create comment 
            const comment = await commentProvider.createComment(content, user, gameId);
            // Add comment to game
            await games_1.default.findOneAndUpdate({ _id: gameId }, { $push: { comments: comment } });
            res.status(200).send(comment);
        }
        catch (error) {
            console.log("Error creating comment:", error);
            res.status(500).send();
        }
    });
}
