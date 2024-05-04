// Import
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styles from './SearchPage.module.scss';
import { NavLink } from 'react-router-dom';
import { Context } from '../..';
import Image from '../../components/Image/Image.jsx';
import { ReactComponent as Cross } from '../../images/icon/cross.svg';
import { observer } from 'mobx-react-lite';
import { PRODUCT_ROUTE } from '../../utils/constsPath';
import { getProductBrandName } from '../../utils/getProdunctBrandName';
import { getProductTypeName } from '../../utils/getProductTypeName';
import { handleNavLinkClick } from '../../utils/handleNavLinkClick';
import { useMediaQuery } from 'react-responsive';

const SearchPage = observer(({ limitProductInPage, isAnimActive, isButtonClick, hideFunction }) => {
	// State and references initialization
	const [searchValue, setSearchValue] = useState('');
	const { allProducts } = useContext(Context);
	const arrayProducts = allProducts.products;
	const inputRef = useRef();
	const ref = useRef();
	const searchPage = useRef();
	const isWidthGreaterThanPermissible = useMediaQuery({ minWidth: 941 }); // We track the width of the viewport using media query

	// Memoized array of products filtered by the search value
	const arraySortedProducts = useMemo(() => {
		return arrayProducts.filter((product) => product.name.toLowerCase().includes(searchValue.toLowerCase()));
	}, [searchValue]);

	if (isButtonClick) {
		inputRef.current.focus();
	}

	// With an open search page, block scrolling in the body
	useEffect(() => {
		if (isButtonClick) {
			document.body.classList.add('scroll-lock');
		} else if (!isButtonClick) {
			// We unlock the settlement of the end of the closing of the search page
			setTimeout(() => {
				document.body.classList.remove('scroll-lock');
			}, 240); // Indicate the delay slightly less animation to avoid bugs
		}
	}, [isButtonClick]);

	// Effect to handle the body input styling and event listeners
	useEffect(() => {
		// Called after each render of the component
		const searchPageBody = searchPage.current;

		document.addEventListener('click', clickOutsideSearchPage);

		function clickOutsideSearchPage(event) {
			if (!isAnimActive) {
				if (searchPageBody.classList.contains(styles.searchPageActive)) {
					if (!event.target.closest(`.${styles.searchPage}`)
						|| event.target.closest('ul')) {
						hideFunction();
					}
				}
			}
		}

		// Remove the event listener when the component unmounts
		return () => {
			document.removeEventListener('click', clickOutsideSearchPage);
		};
	}, [isAnimActive]);

	// With greater resolution use hideFunction
	useEffect(() => {
		if (isWidthGreaterThanPermissible && isButtonClick) {
			hideFunction();
		}
	}, [isWidthGreaterThanPermissible]);

	// Handler for input change
	const inputChange = (e) => {
		setSearchValue(e.target.value);
	}

	// Handler for input button click
	const inputButtonHandler = (e) => {
		setSearchValue('');
	}

	return (
		<div
			ref={searchPage}
			className={isButtonClick
				? `${styles.searchPage} ${styles.searchPageActive}`
				: styles.searchPage}
		>
			<section className={styles.searchInput}>
				<div className={styles.searchPageContainer}>
					<div className={styles.inputWrapper}>
						<input
							ref={inputRef}
							className={styles.input}
							type="text"
							value={searchValue}
							placeholder='Search...'
							onChange={inputChange}
						/>
						<button
							onClick={inputButtonHandler}
							className={searchValue ? `${styles.inputButton} ${styles.inputButtonActive}`
								: styles.inputButton}
						>
							<Cross
								className={styles.cross}
							/>
						</button>
					</div>
				</div>
			</section>
			<section ref={ref}
				className={searchValue
					? styles.searchBody
					: `${styles.searchBody} ${styles.searchBodyHide}`}
			>
				<div className={styles.searchPageContainer}>
					{/* Show the inscription if the products are not found */}
					{arraySortedProducts.length
						? <h4 className={styles.inputBodyHeader}>PRODUCTS</h4>
						: <h4 style={{ textAlign: 'center' }} className={styles.inputBodyHeader}>
							PRODUCT NOT FOUND
						</h4>
					}
					<ul className={styles.searchList}>
						{arraySortedProducts.slice(0, limitProductInPage).map((product) =>
							<li
								key={product.id}
							>
								<NavLink to={PRODUCT_ROUTE + '/' + product.id} onClick={handleNavLinkClick}>
									<div className={styles.itemWrapper}>
										<div className={styles.imageWrapper}>
											<Image
												src={process.env.REACT_APP_API_URL + product.img}
												alt='Image'
												background={true}
											/>
										</div>
										<div className={styles.productText}>
											<p className={styles.productName}>
												{`
													${getProductBrandName(product.brandId, allProducts)}
												 	${product.name}
												 	${getProductTypeName(product.typeId, allProducts)}
												`}
											</p>
											<div className={styles.productPrice}>
												{product.price}$
											</div>
										</div>
									</div>
								</NavLink>
							</li>
						)}
					</ul>
				</div>
			</section>
		</div>
	);
})

export default SearchPage;