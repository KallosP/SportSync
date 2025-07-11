"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = require("./users");
exports.CommentsSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    user: users_1.UsersSchema
}, { collection: "comments" });
const Comments = mongoose_1.default.model("Comments", exports.CommentsSchema);
exports.default = Comments;
