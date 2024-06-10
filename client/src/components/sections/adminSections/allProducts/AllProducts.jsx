import React, { useContext, useEffect } from 'react';
import styles from './AllProducts.module.scss';
import Button from '../../../UI/button/Button';
import AdminContainer from '../../../adminСontainer/AdminContainer';
import ProductList from '../../../productList/ProductList';
import { Context } from '../../../..';
import { observer } from 'mobx-react-lite';
import { fetchBrands, fetchProducts, fetchTypes } from '../../../../http/productAPI';
import Pagination from '../../../pagination/Pagination';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, PRODUCT_ADD_ROUTE } from '../../../../utils/constsPath';
import { handleNavLinkClick } from '../../../../utils/handleNavLinkClick';

const AllProducts = observer(() => {
	const { product } = useContext(Context);
	const isTablet = useMediaQuery({ maxWidth: 1100 }); // We track the width of the viewport using media query
	const isSmallTablet = useMediaQuery({ maxWidth: 900 });
	const isMobile = useMediaQuery({ maxWidth: 610 });
	const isHideButtonText = useMediaQuery({ maxWidth: 425 });

	const navigate = useNavigate();

	// Function to calculate number of products per page based on screen width
	const getProductsPerPage = () => {
		if (isMobile) {
			return 3;
		} else if (isSmallTablet) {
			return 8;
		} else if (isTablet) {
			return 9;
		} else {
			return 12;
		}
	}

	// Installation of the page and the number of products on the page when changing the screen size
	useEffect(() => {
		product.setPage(1); // When changing the screen size, we set the active page 1
		product.setLimitOnePage(getProductsPerPage()); // Set the product limit on one page
	}, [isTablet, isSmallTablet, isMobile]);

	// Getting data on products, brands and products from the API
	useEffect(() => {
		fetchTypes().then(data => product.setTypes(data))
			.catch(err => console.log(err.response?.data.message, 'error'));
		fetchBrands().then(data => product.setBrands(data))
			.catch(err => console.log(err.response?.data.message, 'error'));
		fetchProducts(null, null, 1, product.limitOnePage).then(data => {
			product.setProducts(data.rows); // Set of products on the current page
			product.setTotalCount(data.count); // Set of the total number of products
		})
			.catch(err => console.log(err.response?.data.message, 'error'));
		// When leaving the page, the storage is cleaned
		return () => {
			product.setPage(1);
			product.setSelectedType(null);
			product.setSelectedBrand(null);
			product.setLimitOnePage(9);
		}
	}, []);

	// Getting data on products when changing the current page, the selected brand or type of product
	useEffect(() => {
		fetchProducts(product.selectedBrand?.id, product.selectedType?.id, product.page, product.limitOnePage)
			.then(data => {
				product.setProducts(data.rows); // Set of products on the current page
				product.setTotalCount(data.count); // Set of the total number of products
			})
			.catch(err => console.log(err.response?.data.message, 'error'));
	}, [product.page, product.selectedBrand, product.selectedType, product.limitOnePage]);

	const handleAddProductButton = () => {
		navigate(ADMIN_ROUTE + PRODUCT_ADD_ROUTE); // Add to the beginning of the path the path of the admin so that the path relative to the root is correct
		handleNavLinkClick();
	}

	return (
		<section>
			<AdminContainer>
				<div className={styles.header}>
					<div>
						<h2 className={styles.headerTitle}>All Products</h2>
						<div className={styles.headerRoutePath}>Home {'>'} All Products</div>
					</div>
					<Button
						onClick={handleAddProductButton}
						background='black'
						className={styles.headerButton}
					>
						{isHideButtonText ? 'ADD PRODUCT' : 'ADD NEW PRODUCT'}
					</Button>
				</div>
				<div className={styles.content}></div>
				<ProductList />
				<Pagination />
			</AdminContainer>
		</section>
	);
});

export default AllProducts;