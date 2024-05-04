// Import
import React, { useEffect, useState } from 'react';
import styles from './SliderModal.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';// Import Swiper styles
import Image from '../../../Image/Image';
import { useMediaQuery } from 'react-responsive';

const SliderModal = ({ show, onHide, srcImages, slideCurrent = 0, setSlideCurrent }) => {
	const [isSliderStart, setIsSliderStart] = useState(true);
	const [isSliderEnd, setIsSliderEnd] = useState(false);
	const [swiper, setSwiper] = useState(null); // We get a swiper from a state for the correct operation of its functions
	const [srcChecked, setSrcChecked] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: 500 });

	// Switching to the next slide
	const goNext = () => {
		if (swiper) {
			swiper.slideNext();
		}
	};

	// Switching to the previous slide
	const goPrev = () => {
		if (swiper) {
			swiper.slidePrev();
		}
	};

	// When the width changes to the specified, we load the pictures again
	useEffect(() => {
		setSrcChecked(false);
	}, [isMobile]);

	// Add or remove class for body depending on the show
	useEffect(() => {
		if (show) {
			setSrcChecked(true);
		}
		const body = document.querySelector('body');

		show ? body.classList.add('lock') : body.classList.remove('lock');
	}, [show]);

	useEffect(() => {
		// Func for chek state slider in changes slideCurrent and updating the state of the slider
		const chekingStateSlider = () => {
			if (slideCurrent === 0 || srcImages.length === 1) {
				setIsSliderStart(true);
			} else {
				setIsSliderStart(false);
			}
			if (slideCurrent === srcImages.length - 1 || srcImages.length === 1) {
				setIsSliderEnd(true);
			} else {
				setIsSliderEnd(false);
			}
		}

		// Swipe in current slide
		if (swiper) {
			swiper.slideTo(slideCurrent);
		}

		// Call func after slideTo for correct set state slider
		chekingStateSlider();
	}, [swiper, slideCurrent]);

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
				<button
					className={`${styles.sliderButtonPrev} ${isSliderStart ? styles.sliderButtonPrevDisabled : ''}`}
					onClick={goPrev}
				>
				</button>
				<button
					className={`${styles.sliderButtonNext} ${isSliderEnd ? styles.sliderButtonNextDisabled : ''}`}
					onClick={goNext}
				>
				</button>
				<Swiper
					className={styles.slider}
					modules={[Navigation, A11y]} // install Swiper modules
					spaceBetween={30}
					pagination={{ clickable: true }}
					navigation={{
						nextEl: styles.sliderButtonNext,
						prevEl: styles.sliderButtonPrev,
					}}
					// We set the swiper to the state
					onSwiper={(swiperInstance) => {
						setSwiper(swiperInstance);
					}}
					// When scrolling a swiper, check his status with his setting in a state
					onSlideChange={() => {
						if (swiper) {
							setSlideCurrent(swiper.activeIndex);
						}
					}}
					speed={500}
				>
					{srcImages.map((srcImageArray, index) =>
						<SwiperSlide key={index}>
							<div className={styles.slide}>
								<div className={styles.slideWrapper}>
									<div className={styles.slideImage}>
										<Image
											src={`${!srcChecked ? (show ? (isMobile ? srcImageArray[1] : srcImageArray[0]) : '') : (isMobile ? srcImageArray[1] : srcImageArray[0])}`}
											alt='image detail kicks'
											background={true}
										/>
									</div>
								</div>
							</div>
						</SwiperSlide>
					)}
				</Swiper>
			</div>
		</div>
	);
}

export default SliderModal;