import React, { useContext, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Spoiler from '../spoiler/Spoiler';
import { Context } from '../../..';
import styles from './MenuBurger.module.scss';
import { LISTING_ROUTE } from '../../../utils/constsPath';
import { observer } from 'mobx-react-lite';
import { handleNavLinkClick } from '../../../utils/handleNavLinkClick';
import { useMediaQuery } from 'react-responsive';

const MenuBurger = observer(({ isAnimActive, isButtonClick, hideFunction }) => {
	const menuRef = useRef();
	const { product } = useContext(Context);
	const { allProducts } = useContext(Context);
	const isWidthGreaterThanPermissible = useMediaQuery({ minWidth: 768 }); // We track the width of the viewport using media query

	const router = useNavigate();

	// With an open menu, block scrolling in the body
	useEffect(() => {
		if (isButtonClick) {
			document.body.classList.add('scroll-lock');
		} else if (!isButtonClick) {
			// We unlock the settlement of the end of the closing of the menu
			setTimeout(() => {
				document.body.classList.remove('scroll-lock');
			}, 235); // Indicate the delay slightly less animation to avoid bugs
		}
	}, [isButtonClick]);

	useEffect(() => {
		// Called after each render of the component
		const menuPage = menuRef.current;

		document.addEventListener('click', clickOutsideMenuBody);

		function clickOutsideMenuBody(event) {
			if (!isAnimActive) {
				if (menuPage.classList.contains(styles.menuActive)) {
					if (!event.target.closest(`.${styles.menuBody}`)) {
						hideFunction();
					}
				}
			}
		}

		// Remove the event listener when the component unmounts
		return () => {
			document.removeEventListener('click', clickOutsideMenuBody);
		};
	}, [isAnimActive]);

	// With greater resolution use hideFunction
	useEffect(() => {
		if (isWidthGreaterThanPermissible && isButtonClick) {
			hideFunction();
		}
	}, [isWidthGreaterThanPermissible]);

	// Handler for link click
	const linkHandler = (e) => {
		hideFunction();
		handleNavLinkClick();
	}

	const handleLinkType = (typeId) => {
		product.setSelectedTypes([typeId]);
		router(LISTING_ROUTE);
		handleNavLinkClick();
	}

	return (
		<div
			ref={menuRef}
			className={`${styles.menu} ${isButtonClick ? styles.menuActive : ''}`}
		>
			<div className={styles.menuBody}>
				<ul className={styles.menuList}>
					<li className={styles.menuListItem}>
						<NavLink to={LISTING_ROUTE} onClick={linkHandler}>New Drops</NavLink>
					</li>
					<Spoiler
						duration={350}
						oneSpoller={true}
						className={styles.menuSpoilerBlock}
					>
						<button className={`spoller-button ${styles.menuButton}`}>
							Men
						</button>
						<ul className={styles.menuSublist}>
							{allProducts.types.map(type =>
								<li
									key={type.id}
									onClick={() => {
										handleLinkType(type.id);
										product.setSelectedGenders(['men']);
									}}
								>
									<NavLink onClick={linkHandler}>
										{type.name}
									</NavLink>
								</li>
							)}
						</ul>
						<button className={`spoller-button ${styles.menuButton}`}>
							Women
						</button>
						<ul className={styles.menuSublist}>
							{allProducts.types.map(type =>
								<li
									key={type.id}
									onClick={() => {
										handleLinkType(type.id);
										product.setSelectedGenders(['women']);
									}}
								>
									<NavLink onClick={linkHandler}>
										{type.name}
									</NavLink>
								</li>
							)}
						</ul>
					</Spoiler>
				</ul>
			</div>
		</div>
	);
})

export default MenuBurger;