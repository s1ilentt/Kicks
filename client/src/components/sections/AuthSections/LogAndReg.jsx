import { useContext, useRef, useState } from "react";
import styles from './LogAndReg.module.scss';
import { ReactComponent as ArrowIcon } from '../../../images/icon/mashroom-arrow-right.svg';
import { ReactComponent as GoogleIcon } from '../../../images/icon/google-icon.svg';
import { ReactComponent as AppleIcon } from '../../../images/icon/apple-icon.svg';
import { ReactComponent as FacebookIcon } from '../../../images/icon/facebook-icon-big.svg';
import Button from "../../UI/button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LANDING_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../../utils/constsPath";
import { Context } from "../../..";
import { login, registration } from "../../../http/userAPI";
import { handleNavLinkClick } from "../../../utils/handleNavLinkClick";
import { observer } from "mobx-react-lite";
import Container from "../../container/Container";
import { useMediaQuery } from "react-responsive";


const LogAndReg = observer(() => {
	const { user } = useContext(Context);

	const sectionRef = useRef(null);

	const isMobile = useMediaQuery({ maxWidth: 767 }); // We track the width of the viewport using media query

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isCheckedKeepMe, setIsCheckedKeepMe] = useState(true);
	const [isCheckedAgreement, setIsCheckedAgreement] = useState(false);
	const [selectedGender, setSelectedGender] = useState('');

	const [emailErrorText, setEmailErrorText] = useState('');
	const [passwordErrorText, setPasswordErrorText] = useState('');
	const [checkedKeepMeErrorText, setCheckedKeepMeErrorText] = useState('');
	const [checkedAgreementErrorText, setCheckedAgreementErrorText] = useState('');
	const [selectedGenderText, setSelectedGenderText] = useState('');

	const { pathname } = useLocation();
	const isLogin = pathname === LOGIN_ROUTE;

	const navigate = useNavigate();

	// The scroll function of scrolling to the footer block when clicking on the button join club
	const handleJoinClubButton = () => {
		window.scrollTo(0, sectionRef.current.offsetHeight + (isMobile ? 55 : 80)); // On mobile devices, install scroll little higher
	}

	const handleOptionChange = (e) => {
		setSelectedGender(e.target.value);
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

	// Validation function for gender options
	const validationForGender = (value) => {
		if (isLogin) {
			return true;
		}
		if (!value) {
			setSelectedGenderText('Required condition');
			return false;
		}

		setSelectedGenderText('');
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

		// Set the check that allows cyrillic
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
		const isSelectedGender = validationForGender(selectedGender);
		const isCheckedAgreementValid = validationForCheckedAgreementCheckbox(isCheckedAgreement);

		// Check if all validations passed
		if (isEmailValid && isPasswordValid && isCheckedKeepMeValid && isSelectedGender && isCheckedAgreementValid) {
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

				// Navigate to the home page after complete login or reg
				navigate(LANDING_ROUTE);
				handleNavLinkClick();
			} catch (error) {
				alert(error.response?.data.message);
			}
		}
	}

	return (
		<section ref={sectionRef} className={styles.authSection}>
			<Container>
				<div className={styles.contentWrapper}>
					<div className={styles.formColumn}>
						<form className={styles.form}>
							<div className={styles.formHeader}>
								<h3 className={styles.formTitle}>{isLogin ? 'Login' : 'Register'}</h3>
								{isLogin ?
									<Link
										to={REGISTRATION_ROUTE}
										className={styles.formText}
									>
										Don't have an account?
									</Link>
									:
									<Link
										to={LOGIN_ROUTE}
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
								<>
									<div>
										<div className={styles.inputsTitle}>Gender</div>
										<div className={styles.radioInputs}>
											<label className={styles.radioBlock}>
												<div className={`${styles.radioIcon} ${
													selectedGender === 'male' ? styles.radioIconActive : ''}`}
												>
												</div>
												<input
													type="checkbox"
													value='male'
													checked={selectedGender === 'male'}
													onChange={handleOptionChange}
												/>
												Male
											</label>
											<label className={styles.radioBlock}>
												<div className={`${styles.radioIcon} ${
													selectedGender === 'female' ? styles.radioIconActive : ''}`}
												>
												</div>
												<input
													type="checkbox"
													value='female'
													checked={selectedGender === 'female'}
													onChange={handleOptionChange}
												/>
												Female
											</label>
											<label className={styles.radioBlock}>
												<div className={`${styles.radioIcon} ${
													selectedGender === 'other' ? styles.radioIconActive : ''}`}
												>
												</div>
												<input
													type="checkbox"
													value='other'
													checked={selectedGender === 'other'}
													onChange={handleOptionChange}
												/>
												Other
											</label>
										</div>
										<div className={styles.errorText}>{selectedGenderText}</div>
									</div>
									<div>
										<label className={styles.checkboxBlock}>
											<div className={`${styles.checkboxIcon} ${
												isCheckedAgreement ? styles.checkboxIconActive : ''}`}
											>
											</div>
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
								</>

							}
							<div>
								<label className={styles.checkboxBlock}>
									<div className={`${styles.checkboxIcon} ${
										isCheckedKeepMe ? styles.checkboxIconActive : ''}`}
									>
									</div>
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
					<div className={styles.joinKicksClubColumn}>
						<div className={styles.aboutTheClub}>
							<h2 className={styles.kicksClubTitle}>Join  Kicks Club Get Rewarded Today.</h2>
							<p className={styles.kicksClubDescription}>
								As kicks club member you get rewarded with what you love for doing what you love.
								Sign up today and receive immediate access to these Level 1 benefits:
							</p>
							<ul className={styles.kicksClubAdvantagesList}>
								<li>Free shipping</li>
								<li>A 15% off voucher for your next purchase</li>
								<li>Access to Members Only products and sales</li>
								<li>Access to adidas Running and Training apps</li>
								<li>Special offers and promotions</li>
							</ul>
							<p className={styles.kicksClubText}>
								Join now to start earning points, reach new levels and
								unlock more rewards and benefits from adiClub.
							</p>
						</div>
						<div className={styles.kicksClubButtonWrapper}>
							<Button
								onClick={handleJoinClubButton}
								background='black'
							>
								Join the club
							</Button>
							<ArrowIcon className={styles.arrowIconKicksClubButton} />
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
})

export default LogAndReg;