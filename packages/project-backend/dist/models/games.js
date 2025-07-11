"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = require("./users");
const comments_1 = require("./comments");
/*export interface GamesType extends Document {
    title: string;
    sport: string;
    level: string;
    location: string;
    description: string;
    players: UsersType[];
    img: string;
    user: UsersType;
}*/
const GamesSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    sport: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    players: {
        type: [users_1.UsersSchema],
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: true,
        trim: true
    },
    organizer: users_1.UsersSchema,
    comments: [comments_1.CommentsSchema]
}, { collection: "games" });
const Games = mongoose_1.default.model("Games", GamesSchema);
exports.default = Games;
