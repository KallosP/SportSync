"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProvider = void 0;
const users_1 = __importDefault(require("./models/users"));
class UserProvider {
    async addUser(username, hashedPassword) {
        const userToAdd = new users_1.default({ username, hashedPassword });
        const promise = userToAdd.save();
        return promise;
    }
    async findUser(username) {
        return users_1.default.findOne({ username: username });
    }
}
exports.UserProvider = UserProvider;
