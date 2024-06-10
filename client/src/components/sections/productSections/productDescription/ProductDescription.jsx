import { useContext, useEffect, useState } from 'react';
import styles from './ProductDescription.module.scss';
import { fetchOneProduct } from '../../../../http/productAPI';
import { useParams } from 'react-router-dom';
import Container from '../../../container/Container';
import Image from '../../../Image/Image';
import Loader from '../../../UI/loader/Loader';
import ProductImage_2 from '../../../../images/product/product-image-2.webp';
import ProductImage_3 from '../../../../images/product/product-image-3.webp';
import ProductImage_4 from '../../../../images/product/product-image-4.webp';
import Button from '../../../UI/button/Button';
import { ReactComponent as HeartIcon } from '../../../../images/icon/heart.svg';
import { ReactComponent as SearchIcon } from '../../../../images/icon/search-plus.svg';
import { useMediaQuery } from 'react-responsive';
import { Navigation, A11y, Thumbs, FreeMode, Pagination } from 'swiper/modules';// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';// Import Swiper styles
import SliderModal from '../../../UI/modals/slider modal/SliderModal';
import { GeneralContext } from '../../../contexts/GeneralContextProvider';

const ProductDescription = () => {
	const { isProductInfoBlockLoaded, setIsProductInfoBlockLoaded } = useContext(GeneralContext);

	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [activeColorButton, setActiveColorButton] = useState(null);
	const [activeSizeButton, setActiveSizeButton] = useState(0);
	const [likeButtonActive, setLikeButtonActive] = useState(false);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [showIsModal, setShowIsModal] = useState(false);
	const [slideCurrent, setSlideCurrent] = useState(0);

	const isMobile = useMediaQuery({ maxWidth: 500 }); // We track the width of the viewport using media query

	const { id } = useParams();

	// Define special product IDs for different image sets
	const specialImageIds = [63, 80, 84, 91];
	const imagesUrl = process.env.REACT_APP_API_URL + product.img;
	// Determine image array based on specialImageIds
	const arrayImages = specialImageIds.includes(product.id)
		? [imagesUrl, ProductImage_2, ProductImage_3, ProductImage_4]
		: [imagesUrl, imagesUrl, imagesUrl, imagesUrl];

	const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];// Available product sizes
	// Define special product color for determining the second selective color
	const lightColors = ['silver', 'slateGray', 'tan'];
	const secondColor = lightColors.includes(product.color) ? 'rgb(35, 35, 35)' : 'rgb(112, 126, 110)';

	// Fetch product data when component mounts or id changes
	useEffect(() => {
		setIsLoaded(false);
		setLoading(true); // Show loader while fetching data
		fetchOneProduct(id).then(data => {
			setProduct(data);
			setActiveColorButton(data.color);
			setActiveSizeButton(data.size[0]);
		})
			.catch(err => console.log(err.response?.data.message, 'error'))
			.finally(() => {
				setLoading(false);
				setIsLoaded(true);
			}); // Hide loader after fetching data
	}, [id]);

	// Close modal when switching to desktop view
	useEffect(() => {
		setShowIsModal(false);
	}, [isMobile]);

	useEffect(() => {
		if (isLoaded) {
			setIsProductInfoBlockLoaded(true);
		} else {
			setIsProductInfoBlockLoaded(false);
		}
	}, [isLoaded]);

	// Toggle like button state
	const handleLikeButton = () => {
		setLikeButtonActive(!likeButtonActive);
	}

	// Show loader while loading
	if (loading) {
		return (
			<Loader />
		)
	}

	return (
		<section>
			<Container>
				<div className={styles.wrapper}>
					{/* With mobile resolution, we show the image of the product in the form of a slider
					 	along with a slider of a gallery to display all slides and an active slide*/}
					{!isMobile ?
						<div className={styles.productImages}>
							{arrayImages.map((imgSrc, index) => (
								<div key={index} className={styles.imageWrapper}>
									<Image
										src={imgSrc}
										background={true}
										alt='product image'
									/>
								</div>
							))}
						</div>
						:
						<>
							<div className={styles.swiperWrapper}>
								<Swiper
									className={styles.swiper}
									modules={[FreeMode, Pagination, Navigation, A11y, Thumbs]} // install Swiper modules
									pagination={{
										el: styles.swiperPagination,
										clickable: false,
									}}
									slidesPerView={1}
									slidesPerGroup={1}
									touchRatio={0.75}
									speed={500}
									touchAngle={30}
									spaceBetween={30}
									thumbs={{ swiper: thumbsSwiper?.__swiper__ ? thumbsSwiper : null }} // Check for the presence of Swiper at Thumbs Swiper for the correct operation of Thumbs Swiper
								>
									{arrayImages.map((imgSrc, index) => (
										<SwiperSlide
											key={index}
											onClick={() => {
												setSlideCurrent(index);
												setShowIsModal(true);
											}}
										>
											<div className={styles.imageWrapperSlide}>
												<Image
													src={imgSrc}
													background={true}
													alt={`product image ${index + 1}`}
												/>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
								<SearchIcon
									onClick={() => {
										setSlideCurrent(0);
										setShowIsModal(true);
									}}
									className={styles.searchIcon}
								/>
							</div>
							<div className={styles.thumbsSwiperWrapper}>
								<Swiper
									className={styles.thumbsSwiper}
									onSwiper={setThumbsSwiper}
									spaceBetween={8}
									slidesPerView={4}
									freeMode={true}
									watchSlidesProgress={true}
									modules={[FreeMode, Navigation, Thumbs]}
								>
									{arrayImages.map((imgSrc, index) => (
										<SwiperSlide
											key={index}
										>
											<div className={styles.thumbWrapper}>
												<Image
													src={imgSrc}
													alt='product image thumbnail'
													background={true}
												/>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</>
					}
					<div className={styles.productInfo}>
						<div>
							<div className={styles.productLabel}>New Release</div>
							<div className={styles.productName}>{product.name}</div>
							<div className={styles.productPrice}>${product.price}.00</div>
						</div>
						<div>
							<div className={styles.colorTitle}>Color</div>
							<div className={styles.colorButtons}>
								<button
									style={{ backgroundColor: product.color }}
									className={`${styles.colorButton} ${
										activeColorButton === product.color ? styles.colorButtonActive : ''}`}
									onClick={() => setActiveColorButton(product.color)}
								></button>
								<button
									style={{ backgroundColor: secondColor }}
									className={`${styles.colorButton} ${
										activeColorButton === secondColor ? styles.colorButtonActive : ''}`}
									onClick={() => setActiveColorButton(secondColor)}
								></button>
							</div>
						</div>
						<div>
							<div className={styles.sizeTitle}>Size</div>
							<div className={styles.sizeButtons}>
								{sizes.map(size =>
									<button
										key={size}
										className={`${styles.sizeButton} ${
											activeSizeButton === size ? styles.sizeButtonActive : ''} ${
												product.size?.includes(size) ? '' : styles.sizeButtonDisabled}`}
										onClick={() => setActiveSizeButton(size)}
									>
										{size}
									</button>
								)}
							</div>
						</div>
						<div>
							<div className={styles.addAndLikeButtons}>
								<Button
									className={styles.addButton}
									background='black'
									onClick={() => alert('Product add to cart')}
								>
									Add to Cart
								</Button>
								<Button
									className={`${styles.likeButton} ${
										likeButtonActive ? styles.likeButtonActive : ''}`}
									background='black'
									onClick={handleLikeButton}
								>
									<HeartIcon className={styles.heartIcon} />
								</Button>
							</div>
							<Button
								className={styles.buyButton}
							>
								Buy it now
							</Button>
						</div>
						<div>
							<h4 className={styles.aboutProductTitle}>About the product</h4>
							<div className={styles.aboutProductText}>
								<div className={styles.aboutProductColor}>
									Shadow {product?.color?.replace(/([a-z])([A-Z])/g, '$1 $2')
										.replace(/^./, (str) => str.toUpperCase())} /
									{lightColors.includes(product.color) ? ' Gray Dark' : ' Army Green'}
								</div>
								<div className={styles.aboutProductDescription}>
									{product.info?.find(item => item.title === 'description')?.description
										|| 'This product is excluded from all promotional discounts and offers.'}
								</div>
								<div className={styles.aboutProductTextDesctiption}>
									Pay over time in interest-free installments with Affirm, Klarna or Afterpay.
								</div>
								<div className={styles.aboutProductTextDesctiption}>
									Join adiClub to get unlimited free standard shipping, returns, & exchanges.
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
			{isMobile &&
				<SliderModal
					show={showIsModal}
					onHide={() => setShowIsModal(false)} // Function for close modal window
					srcImages={arrayImages.map(imgageSrc => [imgageSrc, imgageSrc])} // We transmit the props with the desired number of slides in the form of an array, each element of which is an array with two images for large screens and smaller screens
					slideCurrent={slideCurrent}
					setSlideCurrent={setSlideCurrent}
				/>}
		</section>
	);
}

export default ProductDescription;