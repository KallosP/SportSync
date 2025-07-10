import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import Tag from "./Tag";

export interface GameType {
	_id: string;
	img: string;
	title: string;
	sport: string;
	level: string;
	location: string;
	players: string[];
	description: string;
	organizer: string;
}

export default function GameCard(props: GameType) {
	const navigate = useNavigate();
	const sportTag = props.sport;
	const skillTag = props.level;
	const locationTag = props.location;
	const playersTag = props.players.length || 0;

	const handleClick = () => {
		console.log("Game clicked");
		navigate("/view-game", {state: {tags, ...props}});
	};

	const tags = [
		{title: sportTag, icon: null},
		{title: skillTag, icon: null},
		{title: locationTag, icon: faLocationDot},
		{title: playersTag, icon: faUser}
	];

	return (
		<button
			onClick={handleClick}
			className="w-full mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-4xl xl:max-w-5xl lg:p-5 overflow-hidden rounded-3xl dark:bg-dark-elevated-background bg-elevated-background shadow-md text-left cursor-pointer transition-all duration-300 dark:hover:bg-dark-card-hover hover:bg-card-hover ">
			<div className="lg:flex gap-8">
				<div className="md:shrink-0">
					<img
						className="lg:w-sm w-full lg:rounded-3xl object-cover "
						src={props.img}
						alt={`sport ${props.sport}`}
					/>
				</div>
				<div className="lg:p-0 p-8 overflow-hidden">
					<div className="text-4xl tracking-wide text-normal-text dark:text-dark-normal-text">
						{props.title}
					</div>
					{/* Tags */}
					<div className="mt-2 overflow-hidden">
						<ul className="flex flex-wrap gap-2 truncate">
							{tags.map((tag, index) => (
								<Tag key={index} title={tag.title ?? "Err"} icon={tag.icon} />
							))}
						</ul>
					</div>
					{/* Game Description */}
					<p className="mt-4 truncate text-normal-text dark:text-dark-normal-text">
						{props.description}
					</p>
				</div>
			</div>
		</button>
	);
}
