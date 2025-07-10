import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";

interface TopBarProps {
	handleMenuClick: () => void;
	darkMode: boolean;
	toggleDarkMode: () => void;
}

export default function TopBar({handleMenuClick, darkMode, toggleDarkMode}: TopBarProps) {
	const location = useLocation();
	const navigate = useNavigate();

	const currentPath = location.pathname;

	const showBackButton = currentPath === "/add-game" || currentPath === "/view-game";
	const disableHamburger = currentPath !== "/search";

	function handleBack() {
		navigate("/search");
	}

	return (
		<div className="flex w-full dark:bg-dark-header-background bg-header-background h-auto items-center justify-between px-8 py-2 lg:py-2 ">
			{showBackButton ? (
				<button
					onClick={handleBack}
					type="submit"
					className="text-button-text dark:text-dark-button-text cursor-pointer transition-all duration-300 bg-button-background dark:bg-dark-button-background hover:bg-button-hover dark:hover:bg-dark-button-hover focus:bg-button-focus dark:focus:bg-dark-button-focus font-medium rounded-lg text-sm px-4 py-2 ">
					Back
				</button>
			) : (
				<button
					disabled={disableHamburger}
					onClick={handleMenuClick}
					className={`lg:opacity-0 lg:pointer-events-none ${
						disableHamburger ? "opacity-0 pointer-events-none" : ""
					} dark:focus:bg-dark-hamburger-hover focus:bg-hamburger-hover px-2 py-1 rounded-md transition-all duration-200`}>
					<FontAwesomeIcon
						icon={faBars}
						size="2x"
						className="dark:text-dark-hamburger text-hamburger"
					/>
				</button>
			)}
			<p className="text-5xl font-header dark:text-dark-header-text text-header-text">SportSync</p>
			<button
				onClick={toggleDarkMode}
				className="w-14 h-10 cursor-pointer dark:bg-dark-toggle-button dark:text-dark-toggle-button-text bg-toggle-button text-toggle-button-text rounded-full transition-all duration-300">
				{localStorage.getItem("darkMode") === "true" ? "Light" : "Dark"}
			</button>
		</div>
	);
}
