import styles from './AdminSidebar.module.scss';
import { ReactComponent as Logo } from '../../../images/icon/logo.svg';
import { NavLink, useLocation } from 'react-router-dom';
import { ADMIN_HOME_ROUTE, ADMIN_ROUTE } from '../../../utils/constsPath';
import Spoiler from '../spoiler/Spoiler';
import { observer } from 'mobx-react-lite';
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { Context } from '../../..';
import { useTypesCountInfo } from '../../../hooks/useTypesCountInfo';
import { getQuantityOfProducts } from '../../../utils/getQuantityOfProduct';
import { GeneralContext } from '../../contexts/GeneralContextProvider';
import { useMediaQuery } from 'react-responsive';
import { handleNavLinkClick } from '../../../utils/handleNavLinkClick';

const AdminSidebar = observer(() => {
	const { product } = useContext(Context);
	const { allProducts } = useContext(Context);
	const { isAdminSidebarActive, setIsAdminSidebarActive } = useContext(GeneralContext);
	const isDesktop = useMediaQuery({ minWidth: 1381 }); // We track the width of the viewport using media query
	const sidebarRef = useRef(null);
	const { pathname } = useLocation();
	const isAdminHomePage = pathname === ADMIN_ROUTE + ADMIN_HOME_ROUTE;

	// Get types count info
	const typesCountInfo = useTypesCountInfo(allProducts);

	// Handling cross button click to close the sidebar
	const handleCrossButton = useCallback(() => {
		setIsAdminSidebarActive(false);
	});

	// Effect to handle clicks outside the sidebar to close it
	useEffect(() => {
		// Called after each render of the component
		const sidebar = sidebarRef.current;

		document.addEventListener('click', clickOutsideSidebarBody);

		function clickOutsideSidebarBody(event) {
			if (sidebar.classList.contains(styles.adminSidebarActive)) {
				if (!event.target.closest('.sidebar-button')
					&& !event.target.closest(`.${styles.wrapper}`)) {
					handleCrossButton();
				}
			}
		}

		// Remove the event listener when the component unmounts
		return () => {
			document.removeEventListener('click', clickOutsideSidebarBody);
		};
	}, [handleCrossButton]);

	// Effect to set isAdminSidebarActive false on desktop view
	useEffect(() => {
		if (isDesktop && isAdminSidebarActive) {
			setIsAdminSidebarActive(false);
		}
	}, [isDesktop]);

	// Function to set active class for links
	const setActive = ({ isActive }) => isActive ? styles.linkActive : '';

	// Function to handle type button click
	const handleTypeButton = (type) => {
		handleCrossButton();
		if (isAdminHomePage) {
			product.setSelectedType(product.selectedType?.id === type.id ? null : type); // When clicking on the type twice in a row, we zero filtration
		}
	}

	// Function to handle link click
	const handleLinkClick = () => {
		handleCrossButton();
		handleNavLinkClick();
	}

	return (
		<aside
			ref={sidebarRef}
			className={`${styles.adminSidebar} ${isAdminSidebarActive ? styles.adminSidebarActive : ''}`}
		>
			<div className={styles.blackVeil}></div>
			<button
				onClick={handleCrossButton}
				className={styles.crossButton}
			>
				<span></span>
			</button>
			<nav className={styles.wrapper}>
				<div className={styles.logoWrapper}>
					<Logo className={styles.logo} />
				</div>
				<div className={styles.navLinks}>
					<NavLink
						onClick={handleLinkClick}
						to={ADMIN_HOME_ROUTE}
						className={setActive}
					>
						All products
					</NavLink>
				</div>
				<Spoiler
					duration={250}
					className={styles.asideSpoiler}
					closeByClickOnDocument={false}
				>
					<button
						className={`spoller-button ${styles.spoilerButton}`}
					>
						Categories
					</button>
					<ul className={styles.spoilerList}>
						{allProducts.types.map(type =>
							<li key={type.id}>
								<button
									onClick={() => handleTypeButton(type)}
									className={`${styles.typeButton} ${product.selectedType?.id === type.id ? styles.activeTypeButton : ''}`}
								>
									<span>{type.name}</span>
									<div className={styles.typeCounter}>
										{(getQuantityOfProducts(type.id, typesCountInfo))} {/* We get the number of products with a certain type */}
									</div>
								</button>
							</li>
						)}
					</ul>
				</Spoiler>
			</nav>
		</aside>
	);
});

export default AdminSidebar;