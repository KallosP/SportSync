"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./routes/user");
const game_1 = require("./routes/game");
const comment_1 = require("./routes/comment");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = path_1.default.resolve(process.env.STATIC_DIR || "public"); // Ensure an absolute path
async function setUpServer() {
    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;
    const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
    const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;
    console.log("Attempting Mongo connection at " + connectionStringRedacted);
    await mongoose_1.default.connect(connectionString);
    const app = (0, express_1.default)();
    // This is middleware allowing for JSON parsing
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(express_1.default.static(staticDir));
    app.get("/hello", (req, res) => {
        res.send("Hello, World");
    });
    (0, user_1.registerUserRoutes)(app);
    (0, game_1.registerGameRoutes)(app);
    (0, comment_1.registerCommentRoutes)(app);
    app.get("*", (req, res) => {
        console.log("none of the routes above me were matched");
        res.sendFile(path_1.default.resolve(__dirname, staticDir, "index.html"), (err) => {
            if (err) {
                console.error("Error sending index.html:", err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
    app.listen(PORT, () => {
        console.log(`SportSync server running on port: ${PORT}`);
    });
}
setUpServer();
