import express, {Request, Response} from "express";
import dotenv from "dotenv";
import path from "path";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { registerUserRoutes } from "./routes/user";
import { registerGameRoutes } from "./routes/game";
import { registerCommentRoutes } from "./routes/comment";
import cors from "cors";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = path.resolve(process.env.STATIC_DIR || "public"); // Ensure an absolute path
async function setUpServer() {
	const {MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME} = process.env;

	const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
	const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

	console.log("Attempting Mongo connection at " + connectionStringRedacted);

	await mongoose.connect(connectionString); 

	const app = express();

	// This is middleware allowing for JSON parsing
	app.use(express.json());
	app.use(cors());

	app.use(express.static(staticDir));

	app.get("/hello", (req: Request, res: Response) => {
		res.send("Hello, World");
	});

	registerUserRoutes(app);
	registerGameRoutes(app);
	registerCommentRoutes(app);

	//app.get("*", (req: Request, res: Response) => {
	//	console.log("none of the routes above me were matched");
	//	res.sendFile(path.join(staticDir, "index.html"), (err) => {
	//		if (err) {
	//			console.error("Error sending index.html:", err);
	//			res.status(500).send("Internal Server Error");
	//		}
	//	});
	//});

	app.listen(PORT, () => {
		console.log(`Server running at http://localhost:${PORT}`);
	});
}

setUpServer();
