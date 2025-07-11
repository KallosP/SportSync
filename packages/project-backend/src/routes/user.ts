import express, {Request, Response, NextFunction} from "express";
import {UserProvider} from "../UserProvider";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function generateAccessToken(username: string) {
	return new Promise((resolve, reject) => {
		// Sign the user's token (with secret token in env)
		jwt.sign({username: username}, process.env.TOKEN_SECRET!, {expiresIn: "1d"}, (error, token) => {
			if (error) {
				reject(error);
			} else {
				resolve(token);
			}
		});
	});
}

export function authenticateUser(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers["authorization"];
	// Getting the 2nd part of the auth header (the token)
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		console.log("No token received");
		res.status(401).end();
	} else {
		jwt.verify(token, process.env.TOKEN_SECRET!, (error, decoded) => {
			if (decoded) {
				next();
			} else {
				console.log("JWT error:", error);
				res.status(401).end();
			}
		});
	}
}

export function registerUserRoutes(app: express.Application) {
	const userProvider = new UserProvider();

	// Create User - Account Creation
	app.post("/api/user", (req: Request, res: Response) => {
		const username = req.body.email;
		const pwd = req.body.password;

		const promise = userProvider.findUser(username);
		promise
			.then((retrievedUser) => {
				if (!username || !pwd) {
					res.status(400).send();
				} else if (retrievedUser) {
					// retrievedUser being true = exists
					res.status(409).send();
				} else {
					// Register the user
					bcrypt
						.genSalt(10)
						.then((salt) => bcrypt.hash(pwd, salt))
						.then((hashedPassword) => {
							return generateAccessToken(username).then((token) => {
								console.log("Token:", token);
								userProvider.addUser(username, hashedPassword).then((user) => {
									res.status(200).send({token: token, userId: user._id});
								});
							});
						});
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send("Internal server error");
			});
	});

	// Get User - Login
	app.post("/api/user/login", (req: Request, res: Response) => {
		const username = req.body.email;
		const pwd = req.body.password;

		const promise = userProvider.findUser(username);
		promise
			.then((retrievedUser) => {
				if (!retrievedUser) {
					// invalid username
					res.status(401).send("Unauthorized");
				} else {
					bcrypt
						.compare(pwd, retrievedUser.hashedPassword)
						.then((matched) => {
							if (matched) {
								generateAccessToken(username).then((token) => {
									// User's token and their ID
									res.status(200).send({token: token, userId: retrievedUser._id});
								});
							} else {
								// invalid password
								res.status(401).send("Unauthorized");
							}
						})
						.catch(() => {
							res.status(401).send("Unauthorized");
						});
				}
			})
			.catch(() => {
				res.status(400).send("Something went wrong with finding user...");
			});
	});
}
