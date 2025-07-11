import {MongoClient} from "mongodb";
import {ObjectId} from "mongodb";
import commentsModel from "./models/comments";
import {UsersType} from "./models/users";

export class CommentProvider {
    async createComment(content: string, user: UsersType, gameId: string) {
        const comment = new commentsModel({
            content: content,
            user: user,
        })
        const promise = comment.save();
        return promise;
    }
}