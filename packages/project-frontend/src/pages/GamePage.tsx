import GenericSport from "../assets/generic-sport.jpg";
import {useLocation} from "react-router-dom";
import Tag from "../components/Tag";
import type {TagProps} from "../components/Tag";
import CommentSection from "../components/CommentSection";
import {useState, useEffect} from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import {useToken} from "../TokenContext";
import BACKEND_URL from "../constants";

interface GamePageProps {
	addAuthHeader: (token: string) => Record<string, string>;
}

export default function GamePage({addAuthHeader}: GamePageProps) {
	const location = useLocation();
	const [isGoing, setIsGoing] = useState(false);
	const {tags, ...props} = location.state || [];
	const [isLoading, setIsLoading] = useState(false);
	const [players, setPlayers] = useState<string[]>(props.players);
	const {token, currUserId} = useToken();
	const [comments, setComments] = useState<string[]>([]);

	async function handleMarkAsGoing() {
		try {
			setIsLoading(true);
			if (isGoing) {
				// Remove player from game
				const response = await fetch(`${BACKEND_URL}/api/games/${props._id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						...addAuthHeader(token)
					},
					body: JSON.stringify({playerId: currUserId})
				});
				if (response.ok) {
					console.log("Player removed from game");
					setIsGoing(false);
					const data = await response.json();
					setPlayers(players.filter((player) => player !== data.username));
					return data;
				} else {
					console.log("Failed to remove player to game");
					throw new Error("Failed to remove player to game");
				}
			} else {
				// Add player to game
				const response = await fetch(`${BACKEND_URL}/api/games/${props._id}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						...addAuthHeader(token)
					},
					body: JSON.stringify({playerId: currUserId})
				});
				if (response.ok) {
					console.log("Player added to game");
					setIsGoing(true);
					// Add player to frontend
					const player = await response.json();
					setPlayers([...players, player.username]);
				} else {
					console.log("Failed to add player to game");
					throw new Error("Failed to add player to game");
				}
			}
		} catch (e) {
			console.log("Error modifying player in game", e);
			alert("Something went wrong...");
		} finally {
			setIsLoading(false);
		}
	}

	// FIXME: the use of the players state variable in rendering
	//		  was for frontend testing purposes. prob have to change
	//		  logic for backend
	useEffect(() => {
		const getGameData = async () => {
			try {
				const response = await fetch(`${BACKEND_URL}/api/game/${props._id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						...addAuthHeader(token)
					}
				});
				if (response.ok) {
					console.log("Got game data");
					const data = await response.json();
					console.log(data);
					data.players.map((player: any) => {
						// Check if current user marked themselves as going
						if (player._id === currUserId) {
							setIsGoing(true);
						}
						// Add fetched player to players array if not already in it
						if (!players.includes(player.username)) {
							setPlayers([...players, player.username]);
						}
					});
					const newComments = data.comments.map((comment: any) => comment.content);
					setComments(newComments);
				}
			} catch (e) {
				console.log("Error getting game data:", e);
				alert("Something went wrong viewing game...");
			}
		};

		getGameData();
	}, []);

	return (
		<div className="flex self-center justify-center items-center w-full py-4 lg:px-16">
			<div className="flex flex-4 flex-col self-center justify-center items-center w-full p-4">
				{/* Top Section - Game Info */}
				<div className="flex flex-col rounded-lg overflow-hidden w-full h-full bg-elevated-background dark:bg-dark-elevated-background">
					<img src={props.img || GenericSport} className="w-full h-[14em] object-cover" />
					{/* Game Info */}
					<div className="flex flex-col p-4">
						{/* Header */}
						<div className="flex flex-col items-start lg:flex-row justify-between lg:items-center">
							{/* Title */}
							<h1 className="text-4xl mb-2 lg:mb-0 font-semibold text-normal-text dark:text-dark-normal-text">
								{props.title || "No Title"}
							</h1>
							<div className="flex flex-wrap gap-2">
								{/* Tags */}
								<div className="flex flex-wrap gap-2">
									{tags.map((tag: TagProps, index: number) => (
										<Tag
											key={index}
											title={typeof tag.title === "number" ? players.length : tag.title}
											icon={tag.icon}
										/>
									))}
								</div>
								{/* RSVP Button */}
								<button
									onClick={() => handleMarkAsGoing()}
									className="text-button-text h-10 dark:text-dark-button-text cursor-pointer transition-all duration-300 bg-button-background dark:bg-dark-button-background hover:bg-button-hover dark:hover:bg-dark-button-hover focus:bg-button-focus dark:focus:bg-dark-button-focus font-medium rounded-lg text-sm px-4 py-2 ">
									{isLoading ? <LoadingSpinner /> : isGoing ? "Going!" : "Mark As Going"}
								</button>
							</div>
						</div>
						{/* Description/Attendees */}
						<div className="flex flex-col lg:flex-row mt-4 p-4 border border-divider box-shadow shadow-sm dark:border-dark-divider rounded-lg ">
							{/* Description */}
							<div className="flex-4 mb-4 lg:mb-0">
								<h2 className="text-3xl text-normal-text dark:text-dark-normal-text">
									Description
								</h2>
								<hr className="w-full mt-2 border-divider dark:border-dark-divider"></hr>
								<p className="mt-2 text-normal-text text-wrap break-words dark:text-dark-normal-text">
									{props.description || "No Description"}
								</p>
							</div>
							{/* Players */}
							<div className="flex-1 lg:text-center lg:border-l border-divider dark:border-dark-divider">
								<h2 className="text-3xl text-normal-text dark:text-dark-normal-text">Players</h2>
								<hr className="w-full mt-2 border-divider dark:border-dark-divider"></hr>
								<ul>
									{!players.length ? (
										<li className="mt-2 text-normal-text dark:text-dark-normal-text">No players</li>
									) : (
										players.map((player, index) => (
											<li
												key={index}
												className="mt-2 text-normal-text dark:text-dark-normal-text text-wrap break-words">
												{player}
											</li>
										))
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
				{/* Comment Section */}
				<CommentSection
					comments={comments}
					setComments={setComments}
					gameId={props._id}
					currUserId={currUserId}
					token={token}
					addAuthHeader={addAuthHeader}
				/>
			</div>
		</div>
	);
}
