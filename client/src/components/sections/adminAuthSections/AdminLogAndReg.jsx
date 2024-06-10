import { useContext, useEffect, useState } from "react";
import styles from './AdminLogAndReg.module.scss';
import Image from "../../Image/Image";
import BackgroundImageBig from '../../../images/admin/background-kicks-img-big.png';
import BackgroundImage from '../../../images/admin/background-kicks-img.png';
import BackgroundImageSmall from '../../../images/admin/background-kicks-img-small.png';
import { useMediaQuery } from "react-responsive";
import { ReactComponent as Logo } from '../../../images/icon/logo.svg';
import { ReactComponent as ArrowIcon } from '../../../images/icon/mashroom-arrow-right.svg';
import { ReactComponent as GoogleIcon } from '../../../images/icon/google-icon.svg';
import { ReactComponent as AppleIcon } from '../../../images/icon/apple-icon.svg';
import { ReactComponent as FacebookIcon } from '../../../images/icon/facebook-icon-big.svg';
import { ReactComponent as ExitIcon } from '../../../images/icon/exit.svg';
import Button from "../../UI/button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ADMIN_HOME_ROUTE, ADMIN_ROUTE, LANDING_ROUTE, LOGIN_ADMIN_ROUTE, REGISTRATION_ADMIN_ROUTE } from "../../../utils/constsPath";
import { Context } from "../../..";
import { login, registration } from "../../../http/userAPI";
import { handleNavLinkClick } from "../../../utils/handleNavLinkClick";
import { fetchProducts } from "../../../http/productAPI";
import { observer } from "mobx-react-lite";


const AdminLogAndReg = observer(() => {
	const { allProducts } = useContext(Context);
	const { user } = useContext(Context);
	const isLapTop = useMediaQuery({ maxWidth: 1200 }); // We track the width of the viewport using media query
	const isTablet = useMediaQuery({ maxWidth: 950 });

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isCheckedKeepMe, setIsCheckedKeepMe] = useState(true);
	const [isCheckedAgreement, setIsCheckedAgreement] = useState(false);

	const [emailErrorText, setEmailErrorText] = useState('');
	const [passwordErrorText, setPasswordErrorText] = useState('');
	const [checkedKeepMeErrorText, setCheckedKeepMeErrorText] = useState('');
	const [checkedAgreementErrorText, setCheckedAgreementErrorText] = useState('');

	const { pathname } = useLocation();
	const isLogin = pathname === ADMIN_ROUTE + LOGIN_ADMIN_ROUTE;

	const navigate = useNavigate();

	useEffect(() => {
		document.body.style.padding = '0px';

		return () => {
			// Cleaning changes in DOM when promoting the component
			document.body.style.padding = '';
		};
	}, []);

	// Exit button handler
	const handleGoHomePageButton = () => {
		// We update an array of products to display relevant information on the main page
		fetchProducts(null, null, 1, 999, null, null, null).then(data => {
			allProducts.setProducts(data.rows);
		})
			.catch(err => console.log(err.response?.data.message, 'error'));
		navigate(LANDING_ROUTE); // Transition to the main page
		handleNavLinkClick();
	}

	const handleEmailInputChange = (e) => {
		setEmail(e.target.value);
	}

	const handlePasswordInputChange = (e) => {
		setPassword(e.target.value);
	}

	const handleCheckboxKeepMeChange = () => {
		setIsCheckedKeepMe(!isCheckedKeepMe);
	}

	const handleCheckboxAgreementChange = () => {
		setIsCheckedAgreement(!isCheckedAgreement);
	}

	// Validation function for input email
	const validationForEmailInput = (value) => {
		const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;

		if (!value) {
			setEmailErrorText('The field should not be empty');
			return false;
		}

		if (!emailValid.test(value)) {
			setEmailErrorText('Please enter a valid email address, example: user@gmail.com');
			return false;
		}

		setEmailErrorText('');
		return true;
	}

	// Validation function for input checkbox
	const validationForCheckedKeepMeCheckbox = (value) => {
		if (!value) {
			setCheckedKeepMeErrorText('Required condition');
			return false;
		}

		setCheckedKeepMeErrorText('');
		return true;
	};

	// Validation function for input checkbox
	const validationForCheckedAgreementCheckbox = (value) => {
		if (isLogin) {
			return true;
		}
		if (!value) {
			setCheckedAgreementErrorText('Required condition');
			return false;
		}

		setCheckedAgreementErrorText('');
		return true;
	};

	// Validation function for input password
	const validationForPasswordInput = (value) => {
		if (value.length < 6) {
			setPasswordErrorText('Password should be at least 6 characters long');
			return false;
		}

		if (/[^\w\d\u0400-\u04FF]/.test(value)) {
			setPasswordErrorText('Password should not contain special characters');
			return false;
		}

		setPasswordErrorText('');
		return true;
	};

	const regAndLogin = async () => {
		const isEmailValid = validationForEmailInput(email);
		const isPasswordValid = validationForPasswordInput(password);
		const isCheckedKeepMeValid = validationForCheckedKeepMeCheckbox(isCheckedKeepMe);
		const isCheckedAgreementValid = validationForCheckedAgreementCheckbox(isCheckedAgreement);

		// Check if all validations passed
		if (isEmailValid && isPasswordValid && isCheckedKeepMeValid && isCheckedAgreementValid) {
			try {
				let data;

				// Perform login or registration based on the current mode, get data for further use
				if (isLogin) {
					data = await login(email, password);
				} else {
					data = await registration(email, password);
				}

				// Update user state and authentication status
				user.setUser(user);
				user.setIsAuth(true);

				// If not in login mode, show registration success message
				if (!isLogin) {
					alert(data?.message);
				}

				// Navigate to the admin home page
				navigate(ADMIN_ROUTE + ADMIN_HOME_ROUTE);
				handleNavLinkClick();
			} catch (error) {
				alert(error.response?.data.message);
			}
		}
	}

	return (
		<section className={styles.authSection}>
			<div className={styles.imageColumn}>
				<Image
					// Show the image of the desired resolution depending on the size of the viewport
					src={(isTablet ? BackgroundImageSmall : '') || (isLapTop ? BackgroundImage : BackgroundImageBig)}
					alt='kick image'
					background={true}
				/>
				<div className={styles.logoWrapper}>
					<Logo className={styles.logo} />
				</div>
			</div>
			<div className={styles.formColumn}>
				<div
					onClick={handleGoHomePageButton}
					className={styles.exitButtonWrapper}
				>
					<button
						className={styles.logOutButton}
					>
						Home page
						<ExitIcon className={styles.exitIcon} stroke='#232321' />
					</button>
				</div>
				<form className={styles.form}>
					<div className={styles.formHeader}>
						<h3 className={styles.formTitle}>{isLogin ? 'Login' : 'Register'}</h3>
						{isLogin ?
							<Link
								to={ADMIN_ROUTE + REGISTRATION_ADMIN_ROUTE}
								className={styles.formText}
							>
								Don't have an account?
							</Link>
							:
							<Link
								to={ADMIN_ROUTE + LOGIN_ADMIN_ROUTE}
								className={styles.formText}
							>
								Have account? Login!
							</Link>
						}
					</div>
					<div>
						{isLogin ?
							null
							:
							<div className={styles.inputsTitle}>Register Details</div>
						}
						<input
							placeholder='Email'
							type='email'
							name="email"
							value={email}
							onChange={handleEmailInputChange}
							className={styles.input}
						/>
						<div className={styles.errorText}>{emailErrorText}</div>
					</div>
					<div>
						<input
							placeholder='Password'
							type='password'
							name="password"
							value={password}
							onChange={handlePasswordInputChange}
							className={styles.input}
						/>
						<div className={styles.errorText}>{passwordErrorText}</div>
					</div>
					{isLogin ?
						null
						:
						<div>
							<label className={styles.checkboxBlock}>
								<div className={`${styles.checkboxIcon} ${isCheckedAgreement ? styles.checkboxIconActive : ''}`}></div>
								<input
									type="checkbox"
									checked={isCheckedAgreement}
									onChange={handleCheckboxAgreementChange}
								/>
								By clicking 'Log In' you agree to our website
								KicksClub Terms & Conditions, Kicks Privacy Notice and Terms & Conditions.
							</label>
							<div className={styles.errorText}>{checkedAgreementErrorText}</div>
						</div>
					}
					<div>
						<label className={styles.checkboxBlock}>
							<div className={`${styles.checkboxIcon} ${isCheckedKeepMe ? styles.checkboxIconActive : ''}`}></div>
							<input
								type="checkbox"
								checked={isCheckedKeepMe}
								onChange={handleCheckboxKeepMeChange}
							/>
							Keep me logged in - applies to all log in options below.
						</label>
						<div className={styles.errorText}>{checkedKeepMeErrorText}</div>
					</div>
					<div
						onClick={regAndLogin}
						className={styles.buttonLogin}
					>
						<Button
							background='black'
							type='button'
						>
							{isLogin ? 'Email Login' : 'Register'}
						</Button>
						<ArrowIcon className={styles.arrowIcon} />
					</div>
					<div className={isLogin ? '' : styles.fromButtonsRegister}>
						{isLogin ?
							null
							:
							<div className={styles.fromButtonsTitle}>Sign up with</div>
						}
						<div className={styles.formButtons}>
							<a href='https://mail.google.com' target='_blank' rel="noreferrer noopener">
								<button
									className={styles.companyButton}
									type='button'
								>
									<GoogleIcon />
								</button>
							</a>
							<a href='https://www.apple.com' target='_blank' rel="noreferrer noopener">
								<button
									className={`${styles.companyButton} ${styles.companyButton_apple}`}
									type='button'
								>
									<AppleIcon className={styles.appleIcon} />
								</button>
							</a>
							<a href='https://www.facebook.com' target='_blank' rel="noreferrer noopener">
								<button
									className={styles.companyButton}
									type='button'
								>
									<FacebookIcon />
								</button>
							</a>
						</div>
					</div>
					{isLogin ?
						<div className={styles.userAgreement}>
							By clicking 'Log In' you agree to our website KicksClub Terms & Conditions,
							Kicks Privacy Notice and Terms & Conditions.
						</div>
						:
						null
					}
				</form>
			</div>
		</section>
	);
})

export default AdminLogAndReg;