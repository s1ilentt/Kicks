import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createProduct, deleteProduct, fetchOneProduct, updateProduct } from "../../../../http/productAPI";
import AdminContainer from "../../../adminСontainer/AdminContainer";
import styles from './ProductInfo.module.scss';
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";
import Image from "../../../Image/Image";
import { ReactComponent as ImageIcon } from '../../../../images/icon/image-icon.svg';
import Button from "../../../UI/button/Button";
import { ADMIN_HOME_ROUTE, ADMIN_ROUTE, PRODUCT_ADD_ROUTE } from "../../../../utils/constsPath";
import MySelect from "../../../UI/select/MySelect";
import { useMediaQuery } from "react-responsive";
import CreateBrand from "../../../UI/modals/CreateBrand";
import CreateType from "../../../UI/modals/CreateType";
import { handleNavLinkClick } from "../../../../utils/handleNavLinkClick";

const ProductInfo = observer(() => {
	const { allProducts } = useContext(Context);

	const filePicker = useRef(null);

	// State for drag and drop functionality
	const [drag, setDrag] = useState(false);

	// State for updated product information
	const [updatedProduct, setUpdatedProduct] = useState(null);

	const isTablet = useMediaQuery({ maxWidth: 850 }); // We track the width of the viewport using media query
	const isMobile = useMediaQuery({ maxWidth: 500 });

	const [typeModalShow, setTypeModalShow] = useState(false);
	const [brandModalShow, setBrandModalShow] = useState(false);

	// State variables for product fields
	const [productName, setProductName] = useState('');
	const [description, setDescription] = useState('');
	const [typeId, setTypeId] = useState(1);
	const [brandId, setBrandId] = useState(1);
	const [price, setPrice] = useState(0);
	const [color, setColor] = useState('cornflowerblue');
	const [sizes, setSizes] = useState('');
	const [gender, setGender] = useState('men');
	const [SKU, setSKU] = useState('');
	const [stockQuantity, setStockQuantity] = useState(0);
	const [selectedFile, setSelectedFile] = useState(null);
	const [imgUrl, setImgUrl] = useState([]);
	const [product, setProduct] = useState({ info: [] });
	const { id } = useParams();

	// State variables for error messages in product fields
	const [errorTextProductName, setErrorTextProductName] = useState('');
	const [errorTextDescription, setErrorTextDescription] = useState('');
	const [errorTextPrice, setErrorTextPrice] = useState('');
	const [errorTextSizes, setErrorTextSizes] = useState('');
	const [errorTextSKU, setErrorTextSKU] = useState('');
	const [errorTextStockQuantity, setErrorTextStockQuantity] = useState('');
	const [errorTextSelectedFile, setErrorTextSelectedFile] = useState('');

	const navigate = useNavigate();
	const { pathname } = useLocation();
	const isAddProductPage = pathname === ADMIN_ROUTE + PRODUCT_ADD_ROUTE; // Check if it's add product page

	// Effect to fetch product details
	useEffect(() => {
		if (!isAddProductPage) { // Set state if we are on the product viewing page
			fetchOneProduct(id).then(data => {
				setProduct(data);
				if (data) {
					setProductName(data.name);
					setTypeId(data.typeId ? data.typeId : 1);
					setBrandId(data.brandId ? data.brandId : 1);
					setPrice(data.price);
					setColor(data.color);
					setSizes(data.size.join(','));
					setGender(data.gender);
					setImgUrl([process.env.REACT_APP_API_URL + data.img]);
					// We are looking for the fields we need in an array info
					if (data.info) {
						setDescription(data.info.find(item => item.title === 'description').description);
						setSKU(data.info.find(item => item.title === 'SKU').description);
						setStockQuantity(data.info.find(item => item.title === 'stockQuantity').description);
					}
				}
			})
				.catch(err => console.log(err.response?.data.message, 'error'));
		}
	}, [id, updatedProduct]);

	// Effect to handle file change
	useEffect(() => {
		if (selectedFile) {
			const reader = new FileReader();

			reader.onload = (e) => {
				setImgUrl([...imgUrl, e.target.result]); // Add a new URL to the IMGURL array
			};

			reader.readAsDataURL(selectedFile);// Read the contents of the file as url
		}
	}, [selectedFile]);

	// Function to clear form fields
	const clearForm = () => {
		// Clear form based on whether it's add product page or not
		if (product) {
			if (!isAddProductPage) {
				setProductName(product.name);
				setTypeId(product.typeId ? product.typeId : 1);
				setBrandId(product.brandId ? product.brandId : 1);
				setPrice(product.price);
				setColor(product.color);
				setSizes(product.size.join(','));
				setGender(product.gender);
				setSelectedFile(null);
				setImgUrl([process.env.REACT_APP_API_URL + product.img]);
				// We are looking for the fields we need in an array info
				if (product.info) {
					setDescription(product.info.find(item => item.title === 'description').description);
					setSKU(product.info.find(item => item.title === 'SKU').description);
					setStockQuantity(product.info.find(item => item.title === 'stockQuantity').description);
				}
			} else if (isAddProductPage) {
				// Clear form fields to the base values
				setProductName('');
				setTypeId(1);
				setBrandId(1);
				setPrice(0);
				setColor('cornflowerblue');
				setSizes('');
				setGender('men');
				setSelectedFile(null);
				setImgUrl([]);
				setDescription('');
				setSKU('');
				setStockQuantity(0);
			}
		}
	};

	// Function to handle input change, which accepts the setter function to optimize code in parameters
	const handleChangeInput = (e, setter, toUpperCase = false) => {
		const value = toUpperCase ? e.target.value.toUpperCase() : e.target.value;
		setter(value);
	}

	// Create a processor of the file change event
	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handlePick = () => {
		filePicker.current.click(); // Open file picker when clicking
	}

	const handleDragStart = (e) => {
		e.preventDefault(); // Prevent default behavior
		setDrag(true);  // Set drag state to true
	}

	const handleDragLeave = (e) => {
		e.preventDefault();
		setDrag(false);  // Set drag state to true
	}

	const handleDrop = (e) => {
		e.preventDefault();
		setSelectedFile(e.dataTransfer.files[0]); // Set selected file from dropped files

		setDrag(false); // Set drag state to false
	}

	const handleDeleteProduct = () => {
		deleteProduct(product.id).then(data => {
			alert(data.message); // We display a message about the successful removal of the product
			navigate(ADMIN_ROUTE + ADMIN_HOME_ROUTE); // We redirect the admin panel
			handleNavLinkClick();
		})
			.catch(err => console.log(err.response?.data.message, 'error'));
	}

	// Validation logic for product name
	const validateProductName = (value) => {
		if (!value) {
			setErrorTextProductName('The field should not be empty');
			return false;
		}

		if (value.length < 8 || value.length > 40) {
			setErrorTextProductName('The field should have 8 - 40 characters');
			return false;
		}

		const firstChar = value[0];
		if (!firstChar.match(/[a-zA-Z]/)) {
			setErrorTextProductName('The name should start with the letter');
			return false; // The line does not start with the letter symbol
		}

		// We check if this name is occupied
		const isExistingName = allProducts.products.some(product => product.name === value);
		if (product.name !== value && isExistingName) {
			setErrorTextProductName('This product name already exists');
			return false;
		}

		setErrorTextProductName('');
		return true;
	};

	// Validation logic for description
	const validateDescription = (value) => {
		if (!value) {
			setErrorTextDescription('The field should not be empty');
			return false;
		}

		if (value.length < 20 || value.length > 150) {
			setErrorTextDescription('The field should have 20 - 150 characters');
			return false;
		}

		setErrorTextDescription('');
		return true;
	};

	// Validation logic for price
	const validatePrice = (value) => {
		if (!value) {
			setErrorTextPrice('The field should not be empty');
			return false;
		}

		if (!/^[1-9]\d*$/.test(value) || value < 10 || value > 10000) {
			setErrorTextPrice('The price should be $10 - $10,000');
			return false;
		}

		setErrorTextPrice('');
		return true;
	};

	// Validation logic for size
	const validateSizes = (value) => {
		if (!value) {
			setErrorTextSizes('The field should not be empty');
			return false;
		}

		const formattedInput = value.replace(/\s+/g, ',');

		const sizes = formattedInput.split(',').map(size => parseInt(size, 10));

		// Checking for the uniqueness of the size in the array
		const uniqueSizes = new Set(sizes);
		if (uniqueSizes.size !== sizes.length) {
			setErrorTextSizes('Sizes must be unique');
			return false;
		}

		for (let size of sizes) {
			if (isNaN(size)) {
				setErrorTextSizes('Permissible entry 38,39 or 38 39');
				return false;
			}
			if (size < 38 || size > 47) {
				setErrorTextSizes('Sizes must be numbers 38 - 47');
				return false;
			}
		}

		setErrorTextSizes('');
		return true;
	};

	// Validation logic for SKU
	const validateSKU = (value) => {
		if (!value) {
			setErrorTextSKU('The field should not be empty');
			return false;
		}

		if (value.charAt(0) !== '#') {
			setErrorTextSKU('The field should start with "#"');
			return false;
		}

		if (!/^#[0-9A-Za-z]{5}$/i.test(value)) {
			setErrorTextSKU('The field should by six characters: #32A53');
			return false;
		}

		setErrorTextSKU('');
		return true;
	};

	// Validation logic for stock quantity
	const validateStockQuantity = (value) => {
		if (!value) {
			setErrorTextStockQuantity('The field should not be empty');
			return false;
		}

		if (!/^[1-9]\d*$/.test(value) || value < 1 || value > 1000) {
			setErrorTextStockQuantity('The value should be 1 - 1000');
			return false;
		}

		setErrorTextStockQuantity('');
		return true;
	};

	// Validation logic for selected file
	const validateSelectedFile = (value) => {
		if (isAddProductPage && !value) {
			setErrorTextSelectedFile('Download the file');
			return false;
		}

		if (value) {
			// Obtaining an extension of the selected file
			const extension = value.name.split('.').pop().toLowerCase();
			// Checking permitted extensions
			if (!(['jpg', 'jpeg', 'png'].includes(extension))) {
				setErrorTextSelectedFile('Permitted expansion: jpg, jpeg, png');
				return false;
			}
		}

		setErrorTextSelectedFile('');
		return true;
	};

	// Function for checking the validity of all fields before sending to the server
	const validateFieldsBeforeSubmit = () => {
		const isProductNameValid = validateProductName(productName);
		const isDescriptionValid = validateDescription(description);
		const isPriceValid = validatePrice(price);
		const isSizesValid = validateSizes(sizes);
		const isSKUValid = validateSKU(SKU);
		const isStockQuantityValid = validateStockQuantity(stockQuantity);
		const isSelectedFileValid = validateSelectedFile(selectedFile);

		if (isProductNameValid && isDescriptionValid && isPriceValid && isSizesValid && isSKUValid && isStockQuantityValid && isSelectedFileValid) {
			return true;
		} else {
			return false;
		}
	};

	const handleUpdateAndCreate = () => {
		// Check if all fields are valid before submission
		if (!validateFieldsBeforeSubmit()) {
			return;
		}

		// Prepare information array for submission
		const info = [{ title: 'description', description }, { title: 'SKU', description: SKU }, { title: 'stockQuantity', description: `${stockQuantity}` }]

		// Format sizes as comma-separated string
		const sizesFormattedString = sizes.trim().split(/[,\s]+/).map(size => parseInt(size, 10)).join(',');

		// Create a new FormData object
		const formData = new FormData();
		formData.append('name', productName);
		formData.append('price', `${price}`);
		formData.append('img', selectedFile);
		formData.append('brandId', brandId);// Only id of the brand
		formData.append('typeId', typeId);// Only id of the type
		formData.append('gender', gender);
		formData.append('size', sizesFormattedString);
		formData.append('color', color);
		formData.append('info', JSON.stringify(info));// We convert to JSON string
		if (!isAddProductPage) { // If not on add product page, update product
			updateProduct(product.id, formData).then(data => {
				alert(data.message); // We display a message about the successful update of the product
				setUpdatedProduct(data.updatedProduct); // Get a new object to update data about it
				setSelectedFile(null);
			})
				.catch(err => console.log(err.response?.data.message, 'error'));
		} else if (isAddProductPage) { // If on add product page, create new product
			createProduct(formData).then(data => {
				alert(data.message); // We display a message about the successful create of the product
				setSelectedFile(null);
			})
				.catch(err => console.log(err.response?.data.message, 'error'));
		}
	}

	return (
		<section>
			<AdminContainer>
				<div className={styles.header}>
					<div>
						<h2 className={styles.headerTitle}>{isAddProductPage ? 'Add New Product' : 'Product Details'}</h2>
						<div className={styles.headerRoutePath}>Home {'>'} {isAddProductPage ? 'Add New Product' : 'Product Details'}</div>
					</div>
					{isAddProductPage ?
						<div className={styles.headerButton}>
							<Button
								background='black'
								className={styles.addTypeButton}
								onClick={() => setTypeModalShow(true)}
							>
								Add Type
							</Button>
							<Button
								background='black'
								className={styles.addBrandButton}
								onClick={() => setBrandModalShow(true)}
							>
								Add Brand
							</Button>
						</div>
						: null
					}
				</div>
				<div className={styles.productBlock}>
					<form className={styles.form}>
						<div className={styles.inputColumn}>
							<label className={styles.inputBlock}>
								<div className={styles.inputText}>Product Name</div>
								<input
									placeholder='Product name'
									type="text"
									name="productName"
									value={productName}
									onChange={(e) => handleChangeInput(e, setProductName)}
									className={styles.input}
								/>
								<div className={styles.errorText}>{errorTextProductName}</div>
							</label>
							<label className={styles.inputBlock}>
								<div className={styles.inputText}>Description</div>
								<textarea
									placeholder='Product description'
									name="description"
									value={description}
									onChange={(e) => handleChangeInput(e, setDescription)}
									className={styles.textarea}
								></textarea>
								<div className={styles.errorText}>{errorTextDescription}</div>
							</label>
							<div className={styles.inputBlock}>
								<div className={styles.inputText}>Category</div>
								<MySelect
									selectedOption={typeId}
									setSelectedOption={setTypeId}
									optionsArray={allProducts.types}
								/>
							</div>
							<div className={styles.inputBlock}>
								<div className={styles.inputText}>Brand Name</div>
								<MySelect
									selectedOption={brandId}
									setSelectedOption={setBrandId}
									optionsArray={allProducts.brands}
								/>
							</div>
							{isMobile ?
								<>
									<label className={styles.inputBlock}>
										<div className={styles.inputText}>Sale Price</div>
										<div className={styles.inputWithDollarSign}>
											<input
												placeholder='100'
												type='number'
												name="price"
												value={price}
												onChange={(e) => handleChangeInput(e, setPrice)}
												className={styles.input}
											/>
										</div>
										<div className={styles.errorText}>{errorTextPrice}</div>
									</label>
									<label className={styles.inputBlock}>
										<div className={styles.inputText}>Color</div>
										<MySelect
											selectedOption={color}
											setSelectedOption={setColor}
											optionsArray={['cornflowerblue', 'orange', 'black', 'darkGreen', 'darkSlateGray', 'pink', 'silver', 'slateGray', 'saddleBrown', 'tan',]}
											notIdValue={true}
											color={true}
										/>
									</label>
								</>
								:
								<div className={styles.pairInputBlock}>
									<label className={styles.column}>
										<div className={styles.inputText}>Sale Price</div>
										<div className={styles.inputWithDollarSign}>
											<input
												placeholder='100'
												type='number'
												name="price"
												value={price}
												onChange={(e) => handleChangeInput(e, setPrice)}
												className={styles.input}
											/>
										</div>
										<div className={styles.errorText}>{errorTextPrice}</div>
									</label>
									<label className={styles.column}>
										<div className={styles.inputText}>Color</div>
										<MySelect
											selectedOption={color}
											setSelectedOption={setColor}
											optionsArray={['cornflowerblue', 'orange', 'black', 'darkGreen', 'darkSlateGray', 'pink', 'silver', 'slateGray', 'saddleBrown', 'tan',]}
											notIdValue={true}
											color={true}
										/>
									</label>
								</div>
							}
							{isMobile ?
								<>
									<label className={styles.inputBlock}>
										<div className={styles.inputText}>Size</div>
										<input
											placeholder='38,39,40'
											type='text'
											name="size"
											value={sizes}
											onChange={(e) => handleChangeInput(e, setSizes)}
											className={styles.input}
										/>
										<div className={styles.errorText}>{errorTextSizes}</div>
									</label>
									<div className={styles.inputBlock}>
										<div className={styles.inputText}>Gender</div>
										<MySelect
											selectedOption={gender}
											setSelectedOption={setGender}
											optionsArray={['men', 'women']}
											notIdValue={true}
										/>
									</div>
								</>
								:
								<div className={styles.pairInputBlock}>
									<label className={styles.column}>
										<div className={styles.inputText}>Size</div>
										<input
											placeholder='38,39,40'
											type='text'
											name="size"
											value={sizes}
											onChange={(e) => handleChangeInput(e, setSizes)}
											className={styles.input}
										/>
										<div className={styles.errorText}>{errorTextSizes}</div>
									</label>
									<div className={styles.column}>
										<div className={styles.inputText}>Gender</div>
										<MySelect
											selectedOption={gender}
											setSelectedOption={setGender}
											optionsArray={['men', 'women']}
											notIdValue={true}
										/>
									</div>
								</div>
							}
							{isMobile ?
								<>
									<label className={styles.inputBlock}>
										<div className={styles.inputText}>SKU</div>
										<input
											placeholder='#32A53'
											type='text'
											name="SKU"
											value={SKU}
											onChange={(e) => handleChangeInput(e, setSKU, true)}
											className={styles.input}
										/>
										<div className={styles.errorText}>{errorTextSKU}</div>
									</label>
									<label className={styles.inputBlock}>
										<div className={styles.inputText}>Stock Quantity</div>
										<input
											placeholder='21'
											type='number'
											name="stock quantity"
											value={stockQuantity}
											onChange={(e) => handleChangeInput(e, setStockQuantity)}
											className={styles.input}
										/>
										<div className={styles.errorText}>{errorTextStockQuantity}</div>
									</label>
								</>
								:
								<div className={styles.pairInputBlock}>
									<label className={styles.column}>
										<div className={styles.inputText}>SKU</div>
										<input
											placeholder='#32A53'
											type='text'
											name="SKU"
											value={SKU}
											onChange={(e) => handleChangeInput(e, setSKU, true)}
											className={styles.input}
										/>
										<div className={styles.errorText}>{errorTextSKU}</div>
									</label>
									<label className={styles.column}>
										<div className={styles.inputText}>Stock Quantity</div>
										<input
											placeholder='21'
											type='number'
											name="stock quantity"
											value={stockQuantity}
											onChange={(e) => handleChangeInput(e, setStockQuantity)}
											className={styles.input}
										/>
										<div className={styles.errorText}>{errorTextStockQuantity}</div>
									</label>
								</div>
							}
							<div>
								<div className={styles.inputText}>Tag</div>
								<div className={styles.tagBlock}>
									<button type='button' className={styles.tagButton}>Adidas</button>
									<button type='button' className={styles.tagButton}>Shoes</button>
									<button type='button' className={styles.tagButton}>Sneakers</button>
									<button type='button' className={styles.tagButton}>Ultraboost</button>
								</div>
							</div>
						</div>
						<div className={styles.fileAndButtonColumn}>
							<div className={styles.imageFileColumn}>
								<div className={styles.imageWrapper}>
									<div className={styles.image}>
										<Image
											src={imgUrl[imgUrl.length - 1]}
											alt='product image'
											background={true}
										/>
									</div>
								</div>
								<div className={styles.dragAndDropBlock}>
									<div className={styles.inputText}>Product Gallery</div>
									<div
										onDragStart={handleDragStart}
										onDragOver={handleDragStart}
										onDragLeave={handleDragLeave}
										onDrop={handleDrop}
										className={`${styles.dragAndDrop} ${drag ? styles.dragAndDropActive : ''}`}
									>
										<div className={styles.imageIcon}>
											<ImageIcon />
										</div>
										<div className={styles.dragText}>
											<div>Drop your imager here, or browse</div>
											<div>Jpeg, png are allowed</div>
										</div>
										<button
											type='button'
											onClick={handlePick}
											className={styles.dragButton}
										>
											Pick file
										</button>
										<input
											className={styles.inputFileHidden}
											type='file'
											ref={filePicker}
											onChange={handleFileChange}
											accept='.jpg,.jpeg,.png'
										/>
									</div>
									<div className={styles.errorText}>{errorTextSelectedFile}</div>
								</div>
								<div className={styles.filesLoad}>
									{/* We use a copy of IMGURL to display relevant information about uploaded files */}
									{[...imgUrl].reverse().slice(0, Math.min(imgUrl.length, isTablet ? 3 : 5))
										.map((urlImage, index) =>
											<div
												className={`${styles.fileLoadInfo} ${index === 0 ? styles.fileLoadInfoActive : ''}`}
												key={index}
											>
												<div className={styles.fileImage}>
													<Image
														src={urlImage}
														alt='file image'
														background={true}
													/>
												</div>
												<div className={styles.fileInfo}>
													<div className={styles.fileName}>Image file load</div>
													<div className={styles.fileProgressBar}></div>
												</div>
												<div className={styles.completeIcon}>
												</div>
											</div>
										)}
								</div>
							</div>
							{isAddProductPage ?
								<div className={styles.buttonBlockAddProduct}>
									<Button
										type='button'
										background='black'
										className={styles.createButton}
										onClick={handleUpdateAndCreate}
									>
										create
									</Button>
									<Button
										type='button'
										className={styles.cancelButtonAddProduct}
										onClick={clearForm}
									>
										cancel
									</Button>
								</div>
								:
								<div className={styles.buttonBlock}>
									<Button
										type='button'
										background='black'
										className={styles.updateButton}
										onClick={handleUpdateAndCreate}
									>
										update
									</Button>
									<Button
										type='button'
										className={styles.deleteButton}
										onClick={handleDeleteProduct}
									>
										Delete
									</Button>
									<Button
										type='button'
										className={styles.cancelButton}
										onClick={clearForm}
									>
										cancel
									</Button>
								</div>
							}
						</div>
					</form>
				</div>
			</AdminContainer>
			{isAddProductPage ?
				<>
					<CreateBrand
						show={brandModalShow}
						onHide={() => setBrandModalShow(false)}
					/>
					<CreateType
						show={typeModalShow}
						onHide={() => setTypeModalShow(false)}
					/>
				</>
				: null
			}
		</section>
	);
});

export default ProductInfo;