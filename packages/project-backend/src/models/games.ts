import mongoose from "mongoose";
import { Document } from "mongoose";
import { UsersSchema, /*UsersType*/ } from "./users";
import { CommentsSchema } from './comments';

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


const GamesSchema = new mongoose.Schema(
	{
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
            type: [UsersSchema],
            required: true,
            trim: true
        },
        img: {
            type: String,
            required: true,
            trim: true    
        },
        organizer: UsersSchema,
        comments: [CommentsSchema]
	},
	{collection: "games"}
);

const Games = mongoose.model("Games", GamesSchema);

export default Games;