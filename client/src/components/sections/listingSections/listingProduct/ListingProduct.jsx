import { useContext, useEffect, useRef, useState } from 'react';
import SidebarListingProduct from '../../../UI/sidebar-listing-product/SidebarListingProduct';
import ListingContainer from '../../../listingContainer/ListingContainer';
import styles from './ListingProduct.module.scss';
import { Context } from '../../../../';
import Spoiler from '../../../UI/spoiler/Spoiler';
import { fetchBrands, fetchProductsForListing, fetchTypes } from '../../../../http/productAPI';
import { observer } from 'mobx-react-lite';
import ListingProductLists from '../../../listingProductList/ListingProductLists';
import Loader from '../../../UI/loader/Loader';
import Pagination from '../../../pagination/Pagination';
import Filter from '../../../UI/modals/filterForMobile/Filter';
import { useMediaQuery } from 'react-responsive';

const ListingProduct = observer(() => {
	const { product } = useContext(Context);

	const [loading, setLoading] = useState(false);
	const [showFilterModal, setShowFilterModal] = useState(false);
	const productListSectionRef = useRef(null);

	const isShowModal = useMediaQuery({ maxWidth: 1023 }); // We track the width of the viewport using media query
	const isMobile = useMediaQuery({ maxWidth: 767 });

	// Getting data on products, brands and products from the API
	useEffect(() => {
		fetchTypes().then(data => product.setTypes(data))
			.catch(err => console.log(err.response?.data.message, 'error'));
		fetchBrands().then(data => product.setBrands(data))
			.catch(err => console.log(err.response?.data.message, 'error'));
		fetchProductsForListing(1, product.limitOnePage, null,
			product.selectedTypes.length ? product.selectedTypes : null, null,
			product.selectedGenders.length ? product.selectedGenders : null, null)
			.then(data => {
				product.setProducts(data.rows); // Set of products on the current page
				product.setTotalCount(data.count); // Set of the total number of products
			})
			.catch(err => console.log(err.response?.data.message, 'error'));
		// When leaving the page, the storage is cleaned
		return () => {
			product.setPage(1);
			product.setSelectedTypes([]);
			product.setSelectedBrand(null);
			product.setSelectedPrice(500);
			product.setSelectedGenders([]);
			product.setSelectedSizes([]);
			product.setSelectedColors([]);
		}
	}, []);

	// Function to calculate number of products per page based on screen width
	const getProductsPerPage = () => {
		if (isMobile) {
			return 6;
		} else {
			return 9;
		}
	}

	// Installation of the page and the number of products on the page when changing the screen size
	useEffect(() => {
		product.setPage(1); // When changing the screen size, we set the active page 1
		product.setLimitOnePage(getProductsPerPage()); // Set the product limit on one page
	}, [isMobile]);

	// Getting data on products when changing the current page, the selected brand or type and more of product
	useEffect(() => {
		setLoading(true); // Add the bootloader when you query a database
		fetchProductsForListing(
			product.page, product.limitOnePage, product.selectedBrand?.id, product.selectedTypes,
			product.selectedPrice, product.selectedGenders, product.selectedSizes, product.selectedColors
		)
			.then(data => {
				product.setProducts(data.rows); // Set of products on the current page
				product.setTotalCount(data.count); // Set of the total number of products
			})
			.catch(err => console.log(err.response?.data.message, 'error'))
			.finally(() => setLoading(false));
	}, [
		product.page, product.limitOnePage, product.selectedBrand, product.selectedTypes,
		product.selectedPrice, product.selectedGenders, product.selectedSizes, product.selectedColors
	]); // Add all the necessary dependencies for filtering

	// Function for scrolling to the list of products when pressing the button
	const scrollToProductList = () => {
		productListSectionRef.current.scrollIntoView({ behavior: 'instant' });
	};

	const showModal = () => {
		setShowFilterModal(true);
	}

	return (
		<section className={styles.listingProductSection} ref={productListSectionRef}>
			{
				loading && <Loader /> // Add the bootloader with positive loading
			}
			<ListingContainer>
				<div className={styles.header}>
					<div className={styles.headerText}>
						<h2 className={styles.title}>Life Style Shoes</h2>
						<div className={styles.countProduct}><span>{product.totalCount}</span>items</div>
					</div>
					<div className={styles.headerButtons}>
						{isShowModal &&
							<button
								onClick={showModal}
								className={styles.filterButton}
							>
								Filters
							</button>} {/* When changing the screen, add the filtering button */}
						<div className={styles.headerSpoiler}>
							<Spoiler
								duration={250}
								oneSpoller={true}
								className={styles.spoilerBlock}
							>
								<button className={`spoller-button ${styles.brandButton}`}>
									brand
								</button>
								<ul className={styles.list} hidden={true}>
									{product.brands.map(brand =>
										<li
											className={product.selectedBrand?.id === brand.id ? styles.liActive : ''}
											onClick={() => {
												product.setSelectedBrand(product.selectedBrand?.id === brand.id ? null : brand);
											}}
											key={brand.id}
										>
											{brand.name}
										</li>
									)}
								</ul>
							</Spoiler>
						</div>
					</div>
				</div>
				<div className={styles.body}>
					<SidebarListingProduct />
					{product.products.length ?
						<div className={styles.productList}>
							<ListingProductLists />
							<Pagination
								scrollToProductList={scrollToProductList}
							/>
						</div>
						:
						<div className={styles.productNotFoundText}>We cannot find products matching your selection.</div>
					}
				</div>
			</ListingContainer>
			{isShowModal &&
				<Filter
					show={showFilterModal}
					hideFunction={() => setShowFilterModal(false)}
				/>} {/* We draw a filtering window only with the viewport */}
		</section>
	);
})

export default ListingProduct;