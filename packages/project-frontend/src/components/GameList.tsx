import type {GameType} from "../components/GameCard";
import GameCard from "../components/GameCard";

interface GameListProps {
	input: string;
	games: GameType[];
	filters: string[];
}

// Search Bar Logic Credit: https://dev.to/salehmubashar/search-bar-in-react-js-545l
function GameList({input, games, filters}: GameListProps) {
	const filteredData = games.filter((game) => {
		// Filter by search input
		const matchesSearch = input === "" || game.location.toLowerCase().includes(input.toLowerCase());
		// Separate sport and level filters
		const selectedSports =
			filters.filter((f) =>
				["soccer", "basketball", "baseball", "football", "volleyball", "tennis", "other"].includes(
					f
				)
			) || [];
		const selectedLevels =
			filters.filter((f) => ["competitive", "casual", "recreational"].includes(f)) || [];

		// Filter by selected sports (if any are selected)
		const matchesSportFilters =
			selectedSports.length === 0 || selectedSports.includes(game.sport.toLowerCase());

		// Filter by selected levels (if any are selected)
		const matchesLevelFilters =
			selectedLevels.length === 0 || selectedLevels.includes(game.level.toLowerCase());

		return matchesSearch && matchesSportFilters && matchesLevelFilters;
	});

	return (
		<ul className="flex flex-col w-full gap-10 mb-10 items-center mt-5">
			{filteredData.map((game) => (
				<GameCard
					key={game._id}
					_id={game._id}
					img={game.img}
					title={game.title}
					level={game.level}
					location={game.location}
					players={game.players}
					description={game.description}
					sport={game.sport}
					organizer={game.organizer}
				/>
			))}
		</ul>
	);
}

export default GameList;
