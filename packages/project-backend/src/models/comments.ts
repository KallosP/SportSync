import mongoose from "mongoose";
import { Document } from "mongoose";
import { UsersSchema, /*UsersType*/ } from "./users";

export const CommentsSchema = new mongoose.Schema(
	{
        content: {
            type: String,
            required: true,
            trim: true
        },
        user: UsersSchema
	},
	{collection: "comments"}
);

const Comments = mongoose.model("Comments", CommentsSchema);

export default Comments;