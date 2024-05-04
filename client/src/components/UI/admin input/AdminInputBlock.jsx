// Import
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './AdminInputBlock.module.scss';
import { NavLink } from 'react-router-dom';
import { Context } from '../../..';
import Image from '../../../components/Image/Image.jsx';
import { ReactComponent as Search } from '../../../images/icon/search.svg';
import { ReactComponent as Cross } from '../../../images/icon/cross.svg';
import { observer } from 'mobx-react-lite';
import { ADMIN_ROUTE, PRODUCT_DETAIL_ROUTE } from '../../../utils/constsPath';
import { handleNavLinkClick } from '../../../utils/handleNavLinkClick';

const AdminInputBlock = observer(({ onHide, ...attrs }) => {
	// State and references initialization
	const [searchValue, setSearchValue] = useState('');
	const [arraySortedProducts, setArraySortedProducts] = useState([]);
	const { allProducts } = useContext(Context);
	const arrayProducts = allProducts.products;
	const input = useRef();
	const ref = useRef();

	// We use useEffect to filtred an array with products when changing searchValue
	useEffect(() => {
		// In case the list of products does not change with an empty search line
		if (searchValue) {
			setArraySortedProducts(arrayProducts.filter((product) =>
				product.name.toLowerCase().includes(searchValue.toLowerCase()))
			);
		}
	}, [searchValue])

	// Effect to handle label positioning when the component mounts
	useEffect(() => {
		const label = input.current.nextElementSibling;

		if (!onHide) {
			label.style.right = '1px';
		}
	}, []);

	// Effect to handle the body input styling and event listeners
	useEffect(() => {
		// Called after each render of the component
		const bodyInput = ref.current;

		document.addEventListener('mousedown', clickOutsideInput);

		if (bodyInput) {
			// The logic of showing the bodyInput, depending on searchValue
			searchValue ? bodyInput.classList.add(styles.inputBodyActive)
				: bodyInput.classList.remove(styles.inputBodyActive);
		}

		function clickOutsideInput(event) {
			// Logic to handle clicks outside the input block
			if (!bodyInput.classList.contains(styles.inputBodyActive) && searchValue) {
				// Show the bodyInput if there was a focus on the Input and the pressing was not in the cross
				if (event.target.closest(`.${styles.inputWrapper}`)
					&& !event.target.closest(`.${styles.labelActive}`)) {
					bodyInput.classList.add(styles.inputBodyActive);
				}
			}
			// Close the bodyInput if pressing in a non inputBlock
			if (!event.target.closest('#admin-input-block')) {
				bodyInput.classList.remove(styles.inputBodyActive);
			}
		}

		// Remove the event listener when the component unmounts
		return () => {
			document.removeEventListener('mousedown', clickOutsideInput);
		};
	}, [searchValue]);

	// Handler for input change
	const inputChange = (e) => {
		setSearchValue(e.target.value);
	}

	// Handler for input button click
	const inputButtonHandler = (e) => {
		// We hide the body if the input is active and clean searchValue
		if (input.current.classList.contains(styles.inputActive)) {
			ref.current.classList.remove(styles.inputBodyActive);
			setTimeout(() => {
				setSearchValue('');
			}, 300);
		}

		// Toggle class is input
		input.current.classList.toggle(styles.inputActive);

		// Get label and toggle his class
		const label = e.target.closest(`.${styles.label}`);
		label.classList.toggle(styles.labelActive);

		// Get cross and search for more convenient access to them
		const cross = label.querySelector(`.${styles.cross}`);
		const search = label.querySelector(`.${styles.search}`);

		// Processing the hide cross and search for label
		if (label.classList.contains(styles.labelActive)) {
			cross.classList.add(styles.crossActive);
			search.classList.remove(styles.searchActive);

			// Shift the label to the right to correctly display the border of input
			setTimeout(() => {
				label.style.right = '1px';
			}, 100);
		} else if (!label.classList.contains(styles.labelActive)) {
			cross.classList.remove(styles.crossActive);
			search.classList.add(styles.searchActive);

			label.style.right = 0; // Return the starting position
		}
	}

	// Handler for link click
	const linkHandler = (e) => {
		if (input.current.classList.contains(styles.inputActive)) {
			ref.current.classList.remove(styles.inputBodyActive);
		}

		handleNavLinkClick();
	}

	return (
		<div
			{...attrs}
			className={styles.adminInputBlock}
			id='admin-input-block'
		>
			<div className={styles.inputWrapper}>
				<input
					ref={input}
					// Class display depending on the props onHide
					className={onHide ? styles.input : `${styles.input} ${styles.inputActive}`}
					type="text"
					value={searchValue}
					placeholder='Search...'
					onChange={inputChange}
				/>
				<button
					onClick={inputButtonHandler}
					// Class display depending on the props onHide
					className={onHide ? styles.label : `${styles.label} ${styles.labelActive}`}
				>
					<Cross
						// Class display depending on the props onHide
						className={onHide ? styles.cross : `${styles.cross} ${styles.crossActive}`}
					/>
					<Search
						// Class display depending on the props onHide
						className={onHide ? `${styles.search} ${styles.searchActive}` : styles.search}
					/>
				</button>
			</div>

			<div ref={ref} className={styles.inputBody}>
				{/* Show the inscription if the products are not found */}
				{arraySortedProducts.length
					? <h4 className={styles.inputBodyHeader}>PRODUCTS</h4>
					: <h4 style={{ textAlign: 'center' }} className={styles.inputBodyHeader}>
						PRODUCT NOT FOUND
					</h4>
				}
				<ul className={styles.inputList}>
					{arraySortedProducts.map((product) =>
						<li
							key={product.id}
						>
							<NavLink
								to={ADMIN_ROUTE + PRODUCT_DETAIL_ROUTE + '/' + product.id}
								onClick={linkHandler}
							>
								<div className={styles.itemWrapper}>
									<div className={styles.imageWrapper}>
										<Image
											src={process.env.REACT_APP_API_URL + product.img}
											alt='Image' background={true}
										/>
									</div>
									<div className={styles.productText}>
										<p className={styles.productName}>
											{product.name}
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
		</div>
	);
})

export default AdminInputBlock;