import {MongoClient} from "mongodb";
import {ObjectId} from "mongodb";
import usersModel from "./models/users";

export class UserProvider {
	async addUser(username: string, hashedPassword: string) {
		const userToAdd = new usersModel({username, hashedPassword});
		const promise = userToAdd.save();
		return promise;
	}

	async findUser(username: string) {
		return usersModel.findOne({username: username});
	}


}
