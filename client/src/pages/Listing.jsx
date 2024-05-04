import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import ProductList from '../components/ProductList';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { fetchBrands, fetchProducts, fetchTypes } from '../http/productAPI';
import Pages from '../components/Pages';

const Listing = observer(() => {
	const { product } = useContext(Context);

	product.setLimitOnePage(5); // Set the product limit on one tab

	// We set the product data for all app using requests to db
	useEffect(() => {
		fetchTypes().then(data => product.setTypes(data))
			.catch(err => console.log(err.response?.data.message, 'error'));
		fetchBrands().then(data => product.setBrands(data))
			.catch(err => console.log(err.response?.data.message, 'error'));
		fetchProducts(null, null, 1, product.limitOnePage).then(data => {
			product.setProducts(data.rows);
			product.setTotalCount(data.count);
		})
			.catch(err => console.log(err.response?.data.message, 'error'));
	}, []);

	useEffect(() => {
		fetchProducts(product.selectedBrand.id, product.selectedType.id, product.page, product.limitOnePage)
			.then(data => {
				product.setProducts(data.rows);
				product.setTotalCount(data.count);
			})
			.catch(err => console.log(err.response?.data.message, 'error'));
	}, [product.page, product.selectedBrand, product.selectedType]);

	return (
		<Container>
			<Row className='mt-3'>
				<Col md={3}>
					<TypeBar />
				</Col>
				<Col md={9}>
					<BrandBar />
					<ProductList />
					<Pages />
				</Col>
			</Row>
		</Container>
	);
})

export default Listing;