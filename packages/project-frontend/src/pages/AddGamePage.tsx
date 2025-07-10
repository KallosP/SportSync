import {useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import SoccerBall from "../assets/soccer-ball.jpg";
import BasketballBall from "../assets/basketball-ball.jpg";
import Baseball from "../assets/baseball.jpg";
import FootballHelmet from "../assets/football-helmet.jpg";
import Volleyball from "../assets/volleyball.jpg";
import Tennis from "../assets/tennis.jpg";
import GenericSport from "../assets/generic-sport.jpg";
import BACKEND_URL from "../constants";
import {useToken} from "../TokenContext";

interface AddGamePageProps {
	addAuthHeader: (token: string, otherHeaders?: Record<string, string>) => Record<string, string>;
}

export default function AddGamePage({addAuthHeader}: AddGamePageProps) {
	const [title, setTitle] = useState("");
	const [gameLocation, setGameLocation] = useState("");
	const [description, setDescription] = useState("");
	const [sport, setSport] = useState("");
	const [level, setLevel] = useState("Casual");
	const [img, setImg] = useState(GenericSport);
	const {token, currUserId} = useToken();

	console.log("Curr user from add game: ", currUserId);
	console.log("Token from AddGamePage: ", token);

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// FIXME: change how/where players is created/added to gameData
		const players: string[] = [];
		const gameData = {title, gameLocation, description, sport, level, img, players};

		try {
			const response = await fetch(`${BACKEND_URL}/api/game`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...addAuthHeader(token)
				},
				body: JSON.stringify({
					title: title,
					location: gameLocation,
					description: description,
					sport: sport,
					level: level,
					img: img,
					players: players,
					organizer: currUserId
				})
			});
			if (response.ok) {
				console.log("Game Added:", gameData);
				navigate("/search", {state: {token, currUserId, gameData}});
			}
		} catch (error) {
			console.log(error);
			alert("Something went wrong creating game...");
		}
	};

	const handleSportSelection = (selectedSport: string) => {
		setSport(selectedSport);
		if (selectedSport === "Soccer") setImg(SoccerBall);
		else if (selectedSport === "Basketball") setImg(BasketballBall);
		else if (selectedSport === "Baseball") setImg(Baseball);
		else if (selectedSport === "Football") setImg(FootballHelmet);
		else if (selectedSport === "Volleyball") setImg(Volleyball);
		else if (selectedSport === "Tennis") setImg(Tennis);
		else if (selectedSport === "Other") setImg(GenericSport);
		else setImg(GenericSport);
	};

	return (
		<div className="flex flex-col self-center justify-center items-center w-full p-4">
			<form
				onSubmit={handleSubmit}
				className="bg-elevated-background mb-4 dark:bg-dark-elevated-background p-6 rounded-lg shadow-lg w-full max-w-2xl">
				<h1 className="text-3xl font-semibold text-center text-normal-text dark:text-dark-normal-text mb-6">
					Create a Game
				</h1>

				{/* Game Title */}
				<div className="mb-4">
					<label className="block text-normal-text dark:text-dark-normal-text mb-1">
						Game Title
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full px-3 dark:text-dark-normal-text text-normal-text placeholder:text-hint-text py-2 border-2 border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-input-border-ring dark:focus:ring-dark-input-border-ring dark:border-dark-input-border "
						placeholder="Enter game title"
						required
					/>
				</div>

				{/* Location */}
				<div className="mb-4">
					<label className="block text-normal-text dark:text-dark-normal-text mb-1">Location</label>
					<input
						type="text"
						value={gameLocation}
						onChange={(e) => setGameLocation(e.target.value)}
						className="w-full dark:text-dark-normal-text text-normal-text px-3 placeholder:text-hint-text py-2 border-2 border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-input-border-ring dark:focus:ring-dark-input-border-ring dark:border-dark-input-border "
						placeholder="Enter location"
						required
					/>
				</div>

				{/* Description */}
				<div className="mb-4">
					<label className="block text-gray-700 dark:text-gray-200 mb-1">Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full dark:text-dark-normal-text text-normal-text resize-none px-3 placeholder:text-hint-text py-2 border-2 border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-input-border-ring dark:focus:ring-dark-input-border-ring dark:border-dark-input-border "
						placeholder="Provide a brief description of the game"
						required
					/>
				</div>

				{/* Select Sport */}
				<div className="mb-4">
					<label className="block text-gray-700 dark:text-gray-200 mb-1">Sport</label>
					<select
						value={sport}
						onChange={(e) => handleSportSelection(e.target.value)}
						className="w-full bg-gray-200 px-3 placeholder:text-hint-text py-2 border-2 border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-input-border-ring dark:focus:ring-dark-input-border-ring dark:border-dark-input-border "
						required>
						<option value="" disabled>
							Select a sport
						</option>
						<option value="Soccer">Soccer</option>
						<option value="Basketball">Basketball</option>
						<option value="Baseball">Baseball</option>
						<option value="Football">Football</option>
						<option value="Volleyball">Volleyball</option>
						<option value="Tennis">Tennis</option>
						<option value="Other">Other</option>
					</select>
				</div>

				{/* Select Level */}
				<div className="mb-4">
					<label className="block text-gray-700 dark:text-gray-200 mb-2">Level</label>
					<div className="flex gap-4">
						{["Casual", "Recreational", "Competitive"].map((lvl) => (
							<label key={lvl} className="flex items-center gap-2">
								<input
									type="radio"
									value={lvl}
									checked={level === lvl}
									onChange={(e) => setLevel(e.target.value)}
									className="accent-checkbox-checked dark:accent-dark-checkbox-checked"
								/>
								<p className="text-normal-text dark:text-dark-normal-text">{lvl}</p>
							</label>
						))}
					</div>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="my-2 w-full text-button-text dark:text-dark-button-text cursor-pointer transition-all duration-300 bg-button-background dark:bg-dark-button-background hover:bg-button-hover dark:hover:bg-dark-button-hover focus:bg-button-focus dark:focus:bg-dark-button-focus font-medium rounded-lg text-sm px-4 py-2 ">
					Create Game
				</button>
			</form>
		</div>
	);
}
