// TokenContext.tsx
import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";

interface TokenContextType {
	token: string;
	setToken: (token: string) => void;
	currUserId: string;
	setCurrUserId: (userId: string) => void;
}

export const INVALID_TOKEN = "INVALID_TOKEN";
const INVALID_USER = "INVALID_USER";

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const useToken = () => {
	const context = useContext(TokenContext);
	if (!context) {
		throw new Error("useToken must be used within a TokenProvider");
	}
	return context;
};

export const TokenProvider = ({children}: {children: ReactNode}) => {
	const [token, setToken] = useState<string>(localStorage.getItem("token") || INVALID_TOKEN);
	const [currUserId, setCurrUserId] = useState<string>(
		localStorage.getItem("currUserId") || INVALID_USER
	);

	// Whenever the token or user ID changes, save them to localStorage
	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
		}
	}, [token]);

	useEffect(() => {
		if (currUserId) {
			localStorage.setItem("currUserId", currUserId);
		}
	}, [currUserId]);

	return (
		<TokenContext.Provider value={{token, setToken, currUserId, setCurrUserId}}>
			{children}
		</TokenContext.Provider>
	);
};
