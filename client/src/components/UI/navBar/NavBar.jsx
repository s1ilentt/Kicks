import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../..';
import Container from '../../container/Container.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LANDING_ROUTE, LISTING_ROUTE, LOGIN_ROUTE } from '../../../utils/constsPath';
import { observer } from 'mobx-react-lite';
import styles from './NavBar.module.scss';
import { ReactComponent as Logo } from '../../../images/icon/logo.svg';
import { ReactComponent as UserIcon } from '../../../images/icon/user.svg';
import { ReactComponent as Search } from '../../../images/icon/search.svg';
import { ReactComponent as Cross } from '../../../images/icon/cross.svg';
import Spoiler from '../spoiler/Spoiler';
import InputBlock from '../input/InputBlock';
import SearchPage from '../../searchPage/SearchPage';
import MenuBurger from '../menu/MenuBurger';
import { GeneralContext } from '../../contexts/GeneralContextProvider';
import { handleNavLinkClick } from '../../../utils/handleNavLinkClick';
import Button from '../button/Button';

const NavBar = observer(() => {
	// Context provides access to shared data like user information and product details
	const { allProducts } = useContext(Context);
	const { product } = useContext(Context);
	const { user } = useContext(Context);

	const { isBlack, setIsBlack } = useContext(GeneralContext);

	// The router hook from react-router-dom to navigate between pages
	const router = useNavigate();

	// State variables to handle different UI states
	const [isButtonSearchPagesClicked, setButtonSearchPagesClicked] = useState(false);
	const [isButtonMenuPagesClicked, setIsButtonMenuPagesClicked] = useState(false);
	const [animActive, setAnimActive] = useState(false); // Monitors the action of the menu animation or search page animation
	const [isButtonClicked, setIsButtonClicked] = useState(false); // Tracks click of the menu buttons or search buttons

	// Function to handle login/logout button click
	const handleAuthButton = (e) => {
		if (user.isAuth) {
			logOut();
		} else if (!user.isAuth) {
			router(LOGIN_ROUTE);
			handleNavLinkClick();
		}
	}

	// Function to handle cart button click
	const handleCartButton = (e) => {
		if (user.isAuth) {
			router(BASKET_ROUTE);
			handleNavLinkClick();
		}
	}

	// Function to hide the search page and perform animation
	const hideSearchPage = () => {
		setIsButtonClicked(false);
		setButtonSearchPagesClicked(false);

		// We make animActive true until the animation will end
		setAnimActive(true);
		setTimeout(() => {
			setAnimActive(false);
		}, 250);
	}

	// Function to hide the menu page and perform animation
	const hideMenuPage = () => {
		setIsButtonClicked(false);
		setIsButtonMenuPagesClicked(false);

		// We make animActive true until the animation will end
		setAnimActive(true);
		setTimeout(() => {
			setAnimActive(false);
		}, 250);
	}

	// Function for click processing to search button and changes in the states
	const handleSearchButtonClick = (e) => {
		// If there is no animation
		if (!animActive) {
			// If the menu is open, then close it with the help of states and open it after time search page
			if (isButtonMenuPagesClicked) {
				setIsButtonMenuPagesClicked(false);

				// We make animActive true until the animation will end
				setAnimActive(true);
				setTimeout(() => {
					// Switch the condition if the button was click
					setButtonSearchPagesClicked(!isButtonSearchPagesClicked);

					setTimeout(() => {
						setAnimActive(false);
					}, 250);
				}, 240);
			} else {
				setIsButtonClicked(!isButtonClicked);

				// Switch the condition if the button was click
				setButtonSearchPagesClicked(!isButtonSearchPagesClicked);

				// We make animActive true until the animation will end
				setAnimActive(true);
				setTimeout(() => {
					setAnimActive(false);
				}, 250);
			}
		}
	}

	// Function for click processing to menu button and changes in the states
	const handleMenuButtonClick = (e) => {
		// If there is no animation
		if (!animActive) {
			/* If the search page is open, then close it with the help of states
			  and open it after time menu */
			if (isButtonSearchPagesClicked) {
				setButtonSearchPagesClicked(false);

				// We make animActive true until the animation will end
				setAnimActive(true);
				setTimeout(() => {
					// Switch the condition if the button was click
					setIsButtonMenuPagesClicked(!isButtonMenuPagesClicked);

					setTimeout(() => {
						setAnimActive(false);
					}, 250);
				}, 250);
			} else {
				setIsButtonClicked(!isButtonClicked);

				// Switch the condition if the button was click
				setIsButtonMenuPagesClicked(!isButtonMenuPagesClicked);

				// We make animActive true until the animation will end
				setAnimActive(true);
				setTimeout(() => {
					setAnimActive(false);
				}, 250);
			}
		}
	}

	// Exit function, setting empty user and isAuth false
	const logOut = () => {
		localStorage.removeItem('token'); // Remove the token from the local storage
		user.setUser({});
		user.setIsAuth(false);
	}

	const handleLinkType = (typeId) => {
		product.setSelectedTypes([typeId]);
		router(LISTING_ROUTE);
		handleNavLinkClick();
	}

	return (
		<header
			className={`${styles.Navbar} ${isButtonClicked ? styles.NavbarActive : ''} ${isBlack ? styles.NavbarIsBlack : ''}`}
		>
			<Container className={styles.navBarContainer}>
				<nav className={`${styles.wrapper} ${isBlack ? styles.wrapperIsBlack : ''}`}>
					<div className={styles.navLinks}>
						<NavLink
							onClick={handleNavLinkClick}
							className={`${styles.newDropsLink} ${isButtonClicked ? styles.newDropsLinkActive : ''}`}
							to={LISTING_ROUTE}
						>
							New Drops 🔥
						</NavLink>
						<Spoiler
							duration={250}
							oneSpoller={true}
							className={styles.spoilerBlock}
						>
							<button className={`spoller-button ${styles.navLinkButton}`}>
								Men
							</button>
							<ul className={styles.list} hidden={true}>
								{allProducts.types.map(type =>
									<li
										key={type.id}
										onClick={() => {
											handleLinkType(type.id);
											product.setSelectedGenders(['men']);
										}}
									>
										<span>
											{type.name}
										</span>
									</li>
								)}
							</ul>
							<button className={`spoller-button ${styles.navLinkButton}`}>
								Women
							</button>
							<ul className={styles.list} hidden={true}>
								{allProducts.types.map(type =>
									<li
										key={type.id}
										onClick={() => {
											handleLinkType(type.id);
											product.setSelectedGenders(['women']);
										}}
									>
										<span>
											{type.name}
										</span>
									</li>
								)}
							</ul>
						</Spoiler>
						<button
							onClick={handleMenuButtonClick}
							className={`${styles.menuBurgerIcon} ${isButtonMenuPagesClicked
								? styles.menuBurgerIconActive : ''} ${isButtonClicked ? styles.menuBurgerIconAnim : ''}`}
						>
							<span></span>
						</button>
						<div className={styles.cartLeftWrapper}>
							<button className={styles.cartLeft}>
								0
							</button>
						</div>
						{/* Depending on authority, we render button */}
						{user.isAuth
							?
							<div className={styles.adminButtonWrapper}>
								<Button
									className={styles.adminButton}
									background='black'
									onClick={() => {
										router(ADMIN_ROUTE);
										handleNavLinkClick();
									}}
								>
									Admin
								</Button>
							</div>
							: null
						}
					</div>
					<div>
						<NavLink
							onClick={handleNavLinkClick}
							className={styles.logoLink}
							to={LANDING_ROUTE}
						>
							<Logo
								className={isButtonClicked
									? `${styles.logo} ${styles.logoActive}`
									: styles.logo}
							/>
						</NavLink>
					</div>
					<div className={styles.navPanel}>
						<InputBlock onHide={false} />
						<button
							className={styles.searchWrapper}
							onClick={handleSearchButtonClick}
						>
							{isButtonSearchPagesClicked
								? <Cross className={styles.cross} />
								: <Search
									className={`${styles.search} ${isButtonClicked ? styles.searchActive : ''}`}
								/>
							}
						</button>
						<button
							className={styles.userIconWrapper}
							onClick={handleAuthButton}
						>
							<UserIcon
								className={isButtonClicked
									? `${styles.userIcon} ${styles.userIconActive}`
									: styles.userIcon}
							/>
						</button>
						<div className={styles.cartWrapper}>
							<button
								className={styles.cart}
								onClick={handleCartButton}
							>
								0
							</button>
						</div>
					</div>
				</nav>
			</Container>
			<SearchPage
				limitProductInPage={8}
				isAnimActive={animActive}
				isButtonClick={isButtonSearchPagesClicked}
				hideFunction={hideSearchPage}
			/>
			<MenuBurger
				isAnimActive={animActive}
				isButtonClick={isButtonMenuPagesClicked}
				hideFunction={hideMenuPage}
			/>
		</header>
	);
})

export default NavBar;