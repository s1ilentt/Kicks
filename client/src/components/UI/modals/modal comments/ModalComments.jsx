// Import
import React, { useEffect } from 'react';
import styles from './ModalComments.module.scss';
import Profile_1 from '../../../../images/landing/profile 1.jpg';
import Profile_2 from '../../../../images/landing/profile 2.jpg';
import Profile_3 from '../../../../images/landing/profile 3.jpg';
import CardImage_1 from '../../../../images/landing/card image 1.jpg';
import CardImage_2 from '../../../../images/landing/card image 2.jpg';
import CardImage_3 from '../../../../images/landing/card image 3.jpg';
import Container from '../../../container/Container';
import CardModal from '../../review card for modal/CardModal';

const ModalComments = ({ show, onHide }) => {
	// Add or remove class for body depending on the show
	useEffect(() => {
		const body = document.querySelector('body');

		show ? body.classList.add('lock') : body.classList.remove('lock');
	}, [show]);

	useEffect(() => {
		const handleEsc = (event) => {
			if (event.keyCode === 27) { // 27 - ESC key code
				onHide();
			}
		};

		// Add the keyboard event processor when mounting the component
		document.addEventListener('keyup', handleEsc);

		// We delete the processor of the keyboard event when brushing the component
		return () => {
			document.removeEventListener('keyup', handleEsc);
		};
	}, [onHide]); // We transmit onhide as a dependence so that the processor changes when the onhide changes

	return (
		<div className={`${styles.sliderModal} ${!show ? styles.sliderModalHide : ''}`}>
			<div className={styles.body}>
				<button
					className={styles.sliderCrossButton}
					onClick={onHide}
				>
					<div className={styles.sliderCrossIcon}></div>
				</button>
				<Container>
					<div className={styles.wrapper}>
						<CardModal
							ProfileIcon={Profile_1}
							CardImage={CardImage_1}
						/>
						<CardModal
							ProfileIcon={Profile_2}
							CardImage={CardImage_2}
						/>
						<CardModal
							ProfileIcon={Profile_3}
							CardImage={CardImage_3}
						/>
					</div>
				</Container>
			</div>
		</div>
	);
}

export default ModalComments;