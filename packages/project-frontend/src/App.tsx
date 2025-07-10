import "./App.css";
import SearchPage from "./pages/SearchPage";
import TopBar from "./components/TopBar";
import LoginPage from "./pages/LoginPage";
import AddGamePage from "./pages/AddGamePage";
import GamePage from "./pages/GamePage";
import {useState} from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import BACKEND_URL from "./constants";
import {INVALID_TOKEN} from "./TokenContext";
import {useToken} from "./TokenContext";

function App() {
	const [openLeftSidebar, setOpenLeftSidebar] = useState(false);
	const [darkMode, setDarkMode] = useState(false);

	const [accountCreated, setAccountCreated] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [createNewAccount, setCreateNewAccount] = useState(false);

	const {token, currUserId} = useToken();

	function handleMenuClick() {
		setOpenLeftSidebar(!openLeftSidebar);
		console.log("CLICKED", openLeftSidebar);
	}

	function toggleDarkMode() {
		setDarkMode(!darkMode);
		localStorage.setItem("darkMode", JSON.stringify(!darkMode));
	}

	function addAuthHeader(token: string, otherHeaders = {}) {
		if (token === INVALID_TOKEN) {
			return otherHeaders;
		} else {
			return {
				...otherHeaders,
				Authorization: `Bearer ${token}`
			};
		}
	}

	async function createUser(creds: {email: string; password: string}) {
		try {
			const response = await fetch(`${BACKEND_URL}/api/user`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(creds)
			});
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				const errorData = await response.json();
				throw new Error(errorData.message || "Account creation failed");
			}
		} catch (e) {
			console.log("Error creating user:", e);
			throw new Error("Account creation failed");
		}
	}

	async function loginUser(creds: {email: string; password: string}) {
		try {
			const response = await fetch(`${BACKEND_URL}/api/user/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(creds)
			});
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				const errorText = await response.text();
				throw new Error(errorText || "Account creation failed");
			}
		} catch (e) {
			console.log("Error logging in user:", e);
			throw new Error("Login failed");
		}
	}

	return (
		<Router>
			<div
				className={`flex ${
					localStorage.getItem("darkMode") === "true" ? "dark" : ""
				} flex-col h-screen bg-background dark:bg-dark-background duration-300 transition-all overflow-y-scroll`}>
				<TopBar
					handleMenuClick={() => handleMenuClick()}
					darkMode={darkMode}
					toggleDarkMode={() => toggleDarkMode()}
				/>
				<Routes>
					<Route
						path="/"
						element={
							<LoginPage
								email={email}
								setEmail={setEmail}
								password={password}
								setPassword={setPassword}
								createNewAccount={createNewAccount}
								setAccountCreated={setAccountCreated}
								setCreateNewAccount={setCreateNewAccount}
								loginUser={loginUser}
								createUser={createUser}
								accountCreated={accountCreated}
							/>
						}
					/>
					{token === INVALID_TOKEN ? (
						<Route path="*" element={<Navigate to="/" replace />} />
					) : (
						/* Protected Routes */
						<>
							<Route
								path="/search"
								element={
									<SearchPage openLeftSidebar={openLeftSidebar} addAuthHeader={addAuthHeader} />
								}
							/>
							<Route path="/view-game" element={<GamePage addAuthHeader={addAuthHeader} />} />
							<Route path="/add-game" element={<AddGamePage addAuthHeader={addAuthHeader} />} />
						</>
					)}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
