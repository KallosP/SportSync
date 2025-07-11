"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentProvider = void 0;
const comments_1 = __importDefault(require("./models/comments"));
class CommentProvider {
    async createComment(content, user, gameId) {
        const comment = new comments_1.default({
            content: content,
            user: user,
        });
        const promise = comment.save();
        return promise;
    }
}
exports.CommentProvider = CommentProvider;
