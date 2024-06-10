// Import
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './http/userAPI.js';
import { Spinner } from 'react-bootstrap';
import { fetchTypes, fetchProducts, fetchBrands } from './http/productAPI';
import AppRouter from './components/AppRouter';
import { setFavicon } from './utils/favicoTheme';

// Create main component
const App = observer(() => {
	const { user } = useContext(Context); // Get user store with context
	const { allProducts } = useContext(Context);// Get product store with context
	const [loading, setLoading] = useState(true); //Create a state for loader

	// We set the allProduct data for all app using requests to db
	useEffect(() => {
		fetchTypes().then(data => allProducts.setTypes(data))
			.catch(err => console.log(err.response?.data.message, 'error'));
		fetchBrands().then(data => allProducts.setBrands(data))
			.catch(err => console.log(err.response?.data.message, 'error'));
		fetchProducts(null, null, 1, 999).then(data => {
			allProducts.setProducts(data.rows);
		})
			.catch(err => console.log(err.response?.data.message, 'error'));
	}, []);

	// We check the token for validity and remove the loader
	useEffect(() => {
		check()
			.then(data => {
				user.setUser(true);
				user.setIsAuth(true);
			})
			.catch(err => console.log(err.response?.data.message, 'error'))
			.finally(() => setLoading(false));
	}, [])

	useEffect(() => {
		setFavicon();
	}, []);

	if (loading) {
		return (
			<Spinner animation='grow' />
		)
	}

	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	);
})

export default App;
