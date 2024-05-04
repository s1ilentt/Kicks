// Import
import React, { useRef, useState } from 'react';
import styles from './Footer.module.scss';
import Container from '../../container/Container';
import { ReactComponent as LogoWhiteIcon } from '../../../images/icon/big logo.svg';
import { ReactComponent as PlusIcon } from '../../../images/icon/plus.svg';
import { ReactComponent as FacebookIcon } from '../../../images/icon/facebook icon.svg';
import { ReactComponent as InstagramIcon } from '../../../images/icon/instagram icon.svg';
import { ReactComponent as TwitterIcon } from '../../../images/icon/twitter icon.svg';
import { ReactComponent as TiktokIcon } from '../../../images/icon/tiktok icon.svg';
import Button from '../button/Button';
import { NavLink } from 'react-router-dom';
import { LANDING_ROUTE } from '../../../utils/constsPath';
import { handleNavLinkClick } from '../../../utils/handleNavLinkClick';

const Footer = () => {
	const [inputValue, setInputValue] = useState('');
	const [isValidationError, setIsValidationError] = useState(false);

	const refButton = useRef(null);

	// Validation function for input email
	const validationForInput = (value) => {
		const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;

		if (!emailValid.test(value)) {
			setIsValidationError(true);
			return false;
		} else {
			setIsValidationError(false);
			return true;
		}
	}

	// Input value change processor
	const handleChange = (event) => {
		const value = event.target.value;

		setInputValue(value);
		if (value) {
			validationForInput(value);
		} else {
			setIsValidationError(false);
		}
	};

	// Focus loss processor
	const handleBlur = (event) => {
		if (!event.relatedTarget || !refButton.current.contains(event.relatedTarget)) {
			setIsValidationError(false);
		}
	}

	const handleFocus = () => {
		if (inputValue) {
			validationForInput(inputValue);
		}
	}

	// Form sending processor
	const handleSubmit = (event) => {
		if (validationForInput(inputValue)) {// Only in case of successful validation
			setInputValue('');

			// Timeout in order for the form to be empty during the appearance of the alert
			setTimeout(() => {
				alert('Registration completed successfully');
			}, 100);
		}
	}

	return (
		<footer className={styles.footer}>
			<Container>
				<div className={styles.joinCommunity}>
					<div className={styles.text}>
						<h3 className={styles.textHeader}>Join our KicksPlus Club & get 15% off</h3>
						<p className={styles.textDescription}>Sign up for free! Join the community.</p>
						<div className={`${styles.inputBlock} ${isValidationError ? styles.inputBlockValidError : ''}`}>
							<input
								type="email"
								className={styles.input}
								value={inputValue}
								onChange={handleChange}
								onBlur={handleBlur}
								onFocus={handleFocus}
								placeholder='Email address'
							/>
							<div ref={refButton}>
								<Button
									onClick={handleSubmit}
									className={styles.inputButton}
									background={'black'}
								>
									Submit
								</Button>
							</div>
						</div>
					</div>
					<div className={styles.logoBlock}>
						<LogoWhiteIcon className={styles.logoWhite} />
						<PlusIcon className={styles.iconPlus} />
					</div>
				</div>
				<div className={styles.aboutUs}>
					<div className={styles.columnAbout}>
						<h4 className={styles.firstColumnHeader}>About us</h4>
						<p className={styles.columnText}>
							We are the biggest hyperstore in the universe. We got you all
							cover with our exclusive collections and latest drops.
						</p>
					</div>
					<div className={styles.columnCategories}>
						<h5 className={styles.columnHeader}>Categories</h5>
						<ul className={styles.columnList}>
							<li className={styles.columnListItem}><span>Runners</span></li>
							<li className={styles.columnListItem}><span>Sneakers</span></li>
							<li className={styles.columnListItem}><span>Basketball</span></li>
							<li className={styles.columnListItem}><span>Outdoor</span></li>
							<li className={styles.columnListItem}><span>Golf</span></li>
							<li className={styles.columnListItem}><span>Hiking</span></li>
						</ul>
					</div>
					<div className={styles.columnCompany}>
						<h5 className={styles.columnHeader}>Company</h5>
						<ul className={styles.columnList}>
							<li className={styles.columnListItem}>
								<NavLink
									to={LANDING_ROUTE}
									onClick={handleNavLinkClick}
								>
									About
								</NavLink>
							</li>
							<li className={styles.columnListItem}>
								<NavLink>Contact</NavLink>
							</li>
							<li className={styles.columnListItem}>
								<NavLink
									to={LANDING_ROUTE}
									onClick={handleNavLinkClick}
								>
									Blogs
								</NavLink>
							</li>
						</ul>
					</div>
					<div className={styles.columnFollowUs}>
						<h5 className={styles.columnHeader}>Follow us </h5>
						<div className={styles.columnListIcon}>
							<a href='https://www.facebook.com' target='_blank'><FacebookIcon className={styles.itemIcon} /></a>
							<a href='https://www.instagram.com' target='_blank'><InstagramIcon className={styles.itemIcon} /></a>
							<a href='https://twitter.com' target='_blank'><TwitterIcon className={styles.itemIcon} /></a>
							<a href='https://www.tiktok.com' target='_blank'><TiktokIcon className={styles.itemIcon} /></a>
						</div>
					</div>
				</div>
				<div className={styles.rightsBlock}>
					<a
						href='https://en.wikipedia.org/wiki/All_rights_reserved'
						target='_blank' className={styles.rightsBlockLink}
					>
						© All rights reserved
					</a>
				</div>
			</Container>
		</footer>
	);
}

export default Footer;