import { useContext } from 'react';
import styles from './AdminHeader.module.scss';
import AdminInputBlock from '../admin input/AdminInputBlock';
import Spoiler from '../spoiler/Spoiler';
import { ReactComponent as ExitIcon } from '../../../images/icon/exit.svg';
import { ReactComponent as AuthIcon } from '../../../images/icon/user.svg';
import { useNavigate } from 'react-router-dom';
import { ADMIN_HOME_ROUTE, LANDING_ROUTE, LOGIN_ADMIN_ROUTE } from '../../../utils/constsPath';
import { handleNavLinkClick } from '../../../utils/handleNavLinkClick';
import { GeneralContext } from '../../contexts/GeneralContextProvider';
import { Context } from '../../..';
import { fetchProducts } from '../../../http/productAPI';
import { observer } from 'mobx-react-lite';

const AdminHeader = observer(() => {
	const { allProducts } = useContext(Context);
	const { user } = useContext(Context);
	const { isAdminSidebarActive, setIsAdminSidebarActive } = useContext(GeneralContext);
	const router = useNavigate();

	// Exit button handler
	const handleGoHomePageButton = () => {
		// We update an array of products to display relevant information on the main page
		fetchProducts(null, null, 1, 999, null, null, null).then(data => {
			allProducts.setProducts(data.rows);
		})
			.catch(err => console.log(err.response?.data.message, 'error'));
		router(LANDING_ROUTE); // Transition to the main page
		handleNavLinkClick();
	}

	// Handler button of the opening Side panel
	const handleSidebarButton = () => {
		setIsAdminSidebarActive(true); // Set the condition of the open side panel
	}

	// Exit function, setting empty user and isAuth false
	const logOut = () => {
		localStorage.removeItem('token'); // Remove the token from the local storage
		user.setUser({});
		user.setIsAuth(false);
	}

	// Function to handle login/logout button click
	const handleLogOutButton = (e) => {
		if (user.isAuth) {
			logOut();
		} else if (!user.isAuth) {
			router(ADMIN_HOME_ROUTE + LOGIN_ADMIN_ROUTE);
		}
	}

	return (
		<header className={styles.header}>
			<div className={styles.headerWrapper}>
				<button
					onClick={handleSidebarButton}
					className={`${styles.sidebarButton} sidebar-button`}
				>
					<span></span>
				</button>
				<div className={styles.content}>
					<div className={styles.inputBlockWrapper}>
						<AdminInputBlock onHide={true} />
					</div>
					<Spoiler
						duration={200}
						className={styles.adminSpoiler}
					>
						<button
							className={`spoller-button ${styles.button}`}
						>
							Admin
						</button>
						<div className={styles.spoilerBody}>
							<h4 className={styles.spoilerTitle}>Admin</h4>
							<div
								onClick={handleGoHomePageButton}
								className={styles.spoilerContent}
							>
								<button
									className={styles.spoilerContentButton}
								>
									Home page
								</button> {/* Logout button from the admin panel */}
								<ExitIcon className={styles.exitIcon} stroke='#232321' />
							</div>
							<div className={styles.spoilerAuth}>
								<button
									onClick={handleLogOutButton}
									className={styles.logOutButton}
								>
									Log out
									<AuthIcon className={styles.userIcon} />
								</button>
							</div>
						</div>
					</Spoiler>
				</div>
			</div>
		</header>
	);
});

export default AdminHeader;