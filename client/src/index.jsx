// Import
import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import UserStore from './store/UserStore';
import ProductStore from './store/ProductStore';
import AllProductsStore from './store/AllProductStore';
import { GeneralContextProvider } from './components/contexts/GeneralContextProvider';

// Create context from mobx store
export const Context = createContext(null);

// Create root from render react app
const root = ReactDOM.createRoot(document.getElementById('root'));
// Render app
root.render(
	// Create new class objects store in the context
	<Context.Provider value={{
		user: new UserStore(),
		product: new ProductStore(),
		allProducts: new AllProductsStore(),
	}}>
		<GeneralContextProvider>
			<App />
		</GeneralContextProvider>
	</Context.Provider>
);
