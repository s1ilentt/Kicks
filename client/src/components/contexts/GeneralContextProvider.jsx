// Import
import React, { createContext, useState } from 'react';

// Create context from observe intersection
export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
	// Create state from tracking the intersection of elements
	const [isBlack, setIsBlack] = useState(false);
	// Create state from tracking loading the block product
	const [isProductInfoBlockLoaded, setIsProductInfoBlockLoaded] = useState(false);
	// Create state from Admin sidebar
	const [isAdminSidebarActive, setIsAdminSidebarActive] = useState(false);

	// Create object with value in contex provider
	const contextValue = {
		isBlack,
		setIsBlack,
		isProductInfoBlockLoaded,
		setIsProductInfoBlockLoaded,
		isAdminSidebarActive,
		setIsAdminSidebarActive,
	};

	return (
		<GeneralContext.Provider value={contextValue}>
			{children}
		</GeneralContext.Provider>
	);
};