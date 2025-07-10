import React from "react";
import FilterItem from "./FilterItem";

interface LeftSidebarProps {
	openLeftSidebar: boolean;
	filters: string[];
	setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function LeftSidebar({openLeftSidebar, filters, setFilters}: LeftSidebarProps) {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	}

	return (
		<aside
			className={`absolute top-0 left-0 w-72 h-full shadow-lg bg-elevated-background dark:bg-dark-elevated-background duration-300 transition-transform ${
				openLeftSidebar ? "translate-x-0" : "-translate-x-full"
			} lg:translate-x-0 lg:relative lg:flex lg:flex-col z-50 overflow-y-auto`}>
			<div className="p-6 space-y-10">
				{/* Sport Filters */}
				<div className="space-y-2">
					<h1 className="text-2xl dark:text-dark-hint-text text-normal-text">Sport</h1>
					<ul className="space-y-1">
						<FilterItem id="soccer" name="Soccer" filters={filters} setFilters={setFilters} />
						<FilterItem
							id="basketball"
							name="Basketball"
							filters={filters}
							setFilters={setFilters}
						/>
						<FilterItem id="baseball" name="Baseball" filters={filters} setFilters={setFilters} />
						<FilterItem id="football" name="Football" filters={filters} setFilters={setFilters} />
						<FilterItem
							id="volleyball"
							name="Volleyball"
							filters={filters}
							setFilters={setFilters}
						/>
						<FilterItem id="tennis" name="Tennis" filters={filters} setFilters={setFilters} />
						<FilterItem id="other" name="Other" filters={filters} setFilters={setFilters} />
					</ul>
				</div>
			</div>
			<hr className="w-full border-divider dark:border-dark-divider"></hr>
			<div className="p-6 space-y-10">
				{/* Level Filters */}
				<div className="space-y-2">
					<h1 className="text-2xl dark:text-dark-hint-text text-normal-text">Level</h1>
					<ul className="space-y-1">
						<FilterItem id="casual" name="Casual" filters={filters} setFilters={setFilters} />
						<FilterItem
							id="recreational"
							name="Recreational"
							filters={filters}
							setFilters={setFilters}
						/>
						<FilterItem
							id="competitive"
							name="Competitive"
							filters={filters}
							setFilters={setFilters}
						/>
					</ul>
				</div>
			</div>
			<hr className="w-full border-divider dark:border-dark-divider"></hr>
			<div className="p-6 space-y-10">
				<button
					onClick={handleLogout}
					type="submit"
					className="w-full text-button-text dark:text-dark-button-text cursor-pointer transition-all duration-300 bg-button-background dark:bg-dark-button-background hover:bg-button-hover dark:hover:bg-dark-button-hover focus:bg-button-focus dark:focus:bg-dark-button-focus font-medium rounded-lg text-sm px-4 py-2 ">
					Log Out
				</button>
			</div>
		</aside>
	);
}
