"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.UsersSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true,
        trim: true
    }
}, { collection: "users" });
const Users = mongoose_1.default.model("Users", exports.UsersSchema);
exports.default = Users;
