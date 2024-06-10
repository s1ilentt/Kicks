import { useContext, useEffect, useState } from 'react';
import styles from './SidebarListingProduct.module.scss';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import Spoiler from '../spoiler/Spoiler';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const SidebarListingProduct = observer(() => {
	const { product } = useContext(Context);

	const [priceMax, setPriceMax] = useState(500);
	const [changeComplete, setChangeComplete] = useState(false);
	const [sortsUsed, setSortsUsed] = useState([]); // State to keep track of the sorts used

	const isTablet = useMediaQuery({ maxWidth: 1023 }); // We track the width of the viewport using media query

	const location = useLocation();

	// Arrays for sizes and colors
	const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
	const colors = ['cornflowerblue', 'orange', 'black',
		'darkGreen', 'darkSlateGray', 'pink', 'silver', 'slateGray', 'saddleBrown', 'tan',];
	// Map colors to their RGB values
	const colorMap = [
		{ name: 'cornflowerblue', rgb: 'rgb(74, 105, 226)' },
		{ name: 'orange', rgb: 'rgb(255, 165, 47)' },
		{ name: 'black', rgb: 'rgb(35, 35, 33)' },
		{ name: 'darkGreen', rgb: 'rgb(35, 77, 65)' },
		{ name: 'darkSlateGray', rgb: 'rgb(53, 51, 54)' },
		{ name: 'pink', rgb: 'rgb(240, 129, 85)' },
		{ name: 'silver', rgb: 'rgb(201, 204, 198)' },
		{ name: 'slateGray', rgb: 'rgb(103, 114, 130)' },
		{ name: 'saddleBrown', rgb: ' rgb(146, 85, 19)' },
		{ name: 'tan', rgb: 'rgb(187, 128, 86)' },
	];

	// Function to update the sorts used based on selected filters
	const updateSortsUsed = () => {
		const updatedSortsUsed = [];
		if (product.selectedPrice !== 500) updatedSortsUsed.push('Price');
		if (product.selectedColors.length > 0) updatedSortsUsed.push('Color');
		if (product.selectedTypes.length > 0) updatedSortsUsed.push('Category');
		if (product.selectedSizes.length > 0) updatedSortsUsed.push('Size');
		if (product.selectedGenders.length > 0) updatedSortsUsed.push('Gender');
		if (product.selectedBrand?.id) updatedSortsUsed.push('Brand');
		setSortsUsed(updatedSortsUsed);
		setPriceMax(product.selectedPrice);
	};

	// Update sortsUsed when not in tablet view
	useEffect(() => {
		if (!isTablet) {
			updateSortsUsed();
		}
	}, [isTablet]);

	// Update selected price in the product context when slider change is complete
	useEffect(() => {
		if (changeComplete) {
			product.setSelectedPrice(priceMax);
			setChangeComplete(false);
		}
	}, [priceMax, changeComplete]);

	// Update sortsUsed when selected brand changes
	useEffect(() => {
		if (product.selectedBrand?.id && !sortsUsed.includes('Brand')) {
			setSortsUsed(prevSortsUsed => [...prevSortsUsed, 'Brand']);
		} else if (!product.selectedBrand?.id) {
			setSortsUsed(prevSortsUsed => prevSortsUsed.filter(sort => sort !== 'Brand'));
		}
	}, [product.selectedBrand]);

	// Update sortsUsed when selected genders and types change when pressed on Link from the same page
	useEffect(() => {
		if (product.selectedGenders.length && product.selectedTypes.length) {
			setSortsUsed([...sortsUsed.filter(sort => sort !== 'Category' && sort !== 'Gender'), 'Category', 'Gender']);
		} else if (product.selectedTypes.length) {
			setSortsUsed([...sortsUsed.filter(sort => sort !== 'Category'), 'Category']);
		}
	}, [location.key]);

	// Handle click on buttons for size, color, category, and gender filters
	const handleClickButton = (selectedArray, selectedValue, sortingType) => {
		// Check if there is an already selected element in an array of sorting
		const isAlreadySelected = selectedArray.includes(selectedValue);
		const isAlreadySortType = sortsUsed.includes(sortingType);

		// Add the type of sorting if it is not there, remove it if there is no chosen geatures of this sorting
		if (!isAlreadySortType) {
			setSortsUsed([...sortsUsed, sortingType]);
		} else if (isAlreadySelected && selectedArray.length === 1) { // Delete type of sorting only if this sorting value is bundled in the massif of the sorting and it is one there
			setSortsUsed(sortsUsed.filter((sortUsed) => sortUsed !== sortingType)); 
		}

		// If the element is already selected, we remove it from the array
		if (isAlreadySelected) {
			return selectedArray.filter(item => item !== selectedValue);
		} else {
			return [...selectedArray, selectedValue];
		}
	}

	return (
		<div className={styles.sidebar}>
			<h3 className={styles.sidebarTitle}>Filters</h3>
			<Spoiler
				duration={160}
				closeByClickOnDocument={false}
				hideSpoilerInStart={false}
			>
				<button className={`spoller-button ${styles.sortButton}`}>Refine by</button>
				<div className={styles.refineButtons}>
					{sortsUsed.map(sortUsed =>
						<button
							key={sortUsed}
						>
							{sortUsed}
						</button>
					)}
				</div>
			</Spoiler>
			<Spoiler
				duration={200}
				closeByClickOnDocument={false}
				hideSpoilerInStart={false}
			>
				<button className={`spoller-button ${styles.sortButton}`}>Size</button>
				<div className={styles.sizeButtons}>
					{sizes.map(size =>
						<button
							key={size}
							onClick={() => product.setSelectedSizes(handleClickButton(product.selectedSizes, size, 'Size'))}
							className={`${styles.sizeButton} ${
								product.selectedSizes.includes(size) ? styles.sizeButtonActive : ''}`}
						>
							{size}
						</button>
					)}
				</div>
			</Spoiler>
			<Spoiler
				duration={200}
				closeByClickOnDocument={false}
				hideSpoilerInStart={false}
			>
				<button className={`spoller-button ${styles.sortButton}`}>Color</button>
				<div className={styles.colorButtons}>
					{colors.map(color =>
						<button
							key={color}
							style={{ backgroundColor: colorMap.find(item => item.name === color)?.rgb || color }}
							onClick={() => product.setSelectedColors(handleClickButton(product.selectedColors, color, 'Color'))}
							className={`${styles.colorButton} ${
								product.selectedColors.includes(color) ? styles.colorButtonActive : ''}`}
						>
						</button>
					)}
				</div>
			</Spoiler>
			<Spoiler
				duration={230}
				closeByClickOnDocument={false}
				hideSpoilerInStart={false}
			>
				<button className={`spoller-button ${styles.sortButton}`}>Categories</button>
				<ul className={styles.typeButtons}>
					{product.types.map(type =>
						<li key={type.id}>
							<label
								className={`${styles.checkboxItem} ${
									product.selectedTypes.includes(type.id) ? styles.checkboxItemActive : ''}`}
							>
								<input
									type="checkbox"
									checked={product.selectedTypes.includes(type.id)}
									onChange={() => product.setSelectedTypes(handleClickButton(product.selectedTypes, type.id, 'Category'))}
								/>
								<span>{type.name}</span>
							</label>
						</li>
					)}
				</ul>
			</Spoiler>
			<Spoiler
				duration={160}
				closeByClickOnDocument={false}
				hideSpoilerInStart={false}
			>
				<button className={`spoller-button ${styles.sortButton}`}>Gender</button>
				<ul className={styles.typeButtons}>
					<li>
						<label
							className={`${styles.checkboxItem} ${
								product.selectedGenders.includes('men') ? styles.checkboxItemActive : ''}`}
						>
							<input
								type="checkbox"
								checked={product.selectedGenders.includes('men')}
								onChange={() => product.setSelectedGenders(handleClickButton(product.selectedGenders, 'men', 'Gender'))}
							/>
							<span>Men</span>
						</label>
					</li>
					<li>
						<label
							className={`${styles.checkboxItem} ${
								product.selectedGenders.includes('women') ? styles.checkboxItemActive : ''}`}
						>
							<input
								type="checkbox"
								checked={product.selectedGenders.includes('women')}
								onChange={() => product.setSelectedGenders(handleClickButton(product.selectedGenders, 'women', 'Gender'))}
							/>
							<span>Women</span>
						</label>
					</li>
				</ul>
			</Spoiler>
			<Spoiler
				duration={150}
				closeByClickOnDocument={false}
				hideSpoilerInStart={false}
			>
				<button className={`spoller-button ${styles.sortButton}`}>Price</button>
				<div className={styles.priceSliderWrapper}>
					<Slider
						min={90}
						max={500}
						value={priceMax}
						onChange={setPriceMax}
						onChangeComplete={() => {
							setChangeComplete(true);
							if (!sortsUsed.includes('Price')) {
								setSortsUsed([...sortsUsed, 'Price']);
							}
						}}
						railStyle={{ backgroundColor: 'black' }}
						trackStyle={{ backgroundColor: 'black' }}
						handleStyle={{
							backgroundColor: 'rgb(74, 105, 226)', opacity: 1,
							width: '12px', height: '12px', border: 'none', marginTop: '-4px',
							cursor: 'pointer',
						}}
						range={false}
					/>
					<div className={styles.priceRange}>
						<span>$90</span>
						<span></span>
						<span>${priceMax}</span>
					</div>
				</div>
			</Spoiler>
		</div>
	);
})

export default SidebarListingProduct;