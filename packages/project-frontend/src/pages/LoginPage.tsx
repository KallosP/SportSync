import {useNavigate} from "react-router-dom";
import {useToken} from "../TokenContext";

interface LoginProps {
	email: string;
	setEmail: (email: string) => void;
	password: string;
	setPassword: (password: string) => void;
	createNewAccount: boolean;
	setAccountCreated: (accountCreated: boolean) => void;
	setCreateNewAccount: (createNewAccount: boolean) => void;
	loginUser: (creds: {email: string; password: string}) => Promise<any>;
	createUser: (creds: {email: string; password: string}) => Promise<any>;
	accountCreated: boolean;
}

export default function LoginPage({
	email,
	setEmail,
	password,
	setPassword,
	createNewAccount,
	setAccountCreated,
	setCreateNewAccount,
	loginUser,
	createUser,
	accountCreated
}: LoginProps) {
	const navigate = useNavigate();
	const {setToken, setCurrUserId} = useToken();
	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (createNewAccount) {
				console.log("Create account clicked");
				await createUser({email, password});
				setAccountCreated(true);
			} else {
				const data = await loginUser({email, password});
				// Set token and currUserId for this session
				setToken(data.token);
				setCurrUserId(data.userId);
				// README:
				//		if site becomes unresponsive for some users after navigating to search,
				//		it's because of chrome's unsafe password alert getting bugged. Clear
				//		cache/cookies and exit out of chrome completely and retry. Try on other
				//		browsers if issue continues.
				navigate("/search");
			}
		} catch (e) {
			console.error(e);
			if (e instanceof Error) {
				alert(e.message);
			}
		}
	};

	return (
		<div className="flex self-center h-full justify-center items-center w-full p-4">
			<div className="w-full mb-8 max-w-lg rounded-lg bg-elevated-background dark:bg-dark-elevated-background p-8 shadow-lg">
				<h2 className="mb-6 text-center text-2xl text-normal-text dark:text-dark-normal-text font-semibold">
					{createNewAccount ? "Create an account" : "Login"}
				</h2>
				<form onSubmit={handleLogin} className="space-y-4">
					{/* Email Input */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-normal-text dark:text-dark-normal-text mb-1">
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-3 dark:text-dark-normal-text text-normal-text placeholder:text-hint-text py-2 border-2 border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-input-border-ring dark:focus:ring-dark-input-border-ring dark:border-dark-input-border "
							placeholder="Enter email"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-normal-text dark:text-dark-normal-text mb-1">
							Password
						</label>
						<input
							type="password"
							value={password}
							required
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter password"
							className="w-full px-3 dark:text-dark-normal-text text-normal-text placeholder:text-hint-text py-2 border-2 border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-input-border-ring dark:focus:ring-dark-input-border-ring dark:border-dark-input-border "
						/>
					</div>
					{
						// TODO: different action depending on login or create button
						!createNewAccount ? (
							<button
								className="w-full text-button-text dark:text-dark-button-text cursor-pointer transition-all duration-300 bg-button-background dark:bg-dark-button-background hover:bg-button-hover dark:hover:bg-dark-button-hover focus:bg-button-focus dark:focus:bg-dark-button-focus font-medium rounded-lg text-sm px-4 py-2 "
								type="submit">
								Login
							</button>
						) : (
							<button
								className="w-full text-button-text dark:text-dark-button-text cursor-pointer transition-all duration-300 bg-button-background dark:bg-dark-button-background hover:bg-button-hover dark:hover:bg-dark-button-hover focus:bg-button-focus dark:focus:bg-dark-button-focus font-medium rounded-lg text-sm px-4 py-2 "
								type="submit">
								Create Account
							</button>
						)
					}
				</form>
				{accountCreated && createNewAccount && (
					<p className="mt-4 text-center font-bold text-sm text-normal-text dark:text-dark-normal-text">
						Account created! You can now log in.
					</p>
				)}
				{!createNewAccount ? (
					<p className="mt-4 text-center text-sm text-normal-text dark:text-dark-normal-text">
						Don't have an account?
						<a
							onClick={() => setCreateNewAccount(true)}
							className="ml-1 cursor-pointer font-medium text-link-text dark:text-dark-link-text hover:underline">
							Create an account
						</a>
					</p>
				) : (
					<div className="text-center mt-4">
						<a
							onClick={() => setCreateNewAccount(false)}
							className="cursor-pointer text-sm font-medium text-link-text dark:text-dark-link-text hover:underline">
							Back to Login
						</a>
					</div>
				)}
			</div>
		</div>
	);
}
