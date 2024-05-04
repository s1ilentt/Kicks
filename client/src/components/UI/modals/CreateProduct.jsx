// Import
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Button, Dropdown, Row, Col, } from 'react-bootstrap';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import { createProduct, fetchBrands, fetchTypes } from '../../../http/productAPI';

const CreateProduct = observer(({ show, onHide }) => {
	const { product } = useContext(Context);// We get an object product from the storage
	const [name, setName] = useState('');// Get product name
	const [price, setPrice] = useState(0);
	const [file, setFile] = useState(null);
	const [info, setInfo] = useState([]); // Default value empty array

	// When loading the page, we fill product store
	useEffect(() => {
		fetchTypes().then(data => product.setTypes(data))
			.catch(err => console.log(err.response?.data.message, 'error'));
		fetchBrands().then(data => product.setBrands(data))
			.catch(err => console.log(err.response?.data.message, 'error'));
	}, [])

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }]);// We create a new array based on the previous one and add a new property, number - id
	}
	const removeInfo = (number) => {
		setInfo(info.filter(i => i.number !== number)); // Leave elements in which the id is not equal to the parameter
	}
	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));// Change the parameter depending on the key, key - the name of the field(title or description)
	}

	// We change the file with the element of the array of index 0
	const selectFile = (e) => {
		setFile(e.target.files[0]);
	}

	// Create formData to send a request for a server
	const addProduct = () => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('price', `${price}`);
		formData.append('img', file);
		formData.append('brandId', product.selectedBrand.id);// Only id of the brand
		formData.append('typeId', product.selectedType.id);// Only id of the type
		formData.append('info', JSON.stringify(info));// We convert to JSON string
		createProduct(formData).then(data => onHide()) // Close popup after send formData as a query body
			.catch(err => console.log(err.response?.data.message, 'error'));
	}

	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Add product
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className='mt-2 mb-2'>
						<Dropdown.Toggle>{product.selectedType.name || 'Select type'}</Dropdown.Toggle>
						<Dropdown.Menu>
							{product.types.map(type =>
								<Dropdown.Item
									onClick={() => product.setSelectedType(type)}
									key={type.id}
								>
									{type.name}
								</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown className='mt-2 mb-2'>
						<Dropdown.Toggle>{product.selectedBrand.name || 'Select brand'}</Dropdown.Toggle>
						<Dropdown.Menu>
							{product.brands.map(brand =>
								<Dropdown.Item
									onClick={() => product.setSelectedBrand(brand)}
									key={brand.id}
								>
									{brand.name}
								</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Form.Control
						value={name}
						onChange={e => setName(e.target.value)}
						className='mt-2'
						placeholder='Enter name product'
					/>
					<Form.Control
						value={price}
						onChange={e => setPrice(Number(e.target.value))}// price should be a number
						className='mt-2'
						placeholder='Enter price'
						type='number'
					/>
					<Form.Control
						className='mt-2'
						type='file'
						onChange={selectFile}
					/>
					<hr />
					<Button
						variant='outline-dark'
						onClick={() => addInfo()}
					>
						Add new property
					</Button>
					{/* Draw a list of new parameters */}
					{info.map(i =>
						<Row
							key={i.number}
							className='mt-3'
						>
							<Col md={4}>
								<Form.Control
									value={i.title}
									onChange={e => changeInfo('title', e.target.value, i.number)}// The first parameter is responsible for which field will be changed
									placeholder='Enter name property'
								/>
							</Col>
							<Col md={4}>
								<Form.Control
									value={i.description}
									onChange={e => changeInfo('description', e.target.value, i.number)}// The first parameter is responsible for which field will be changed
									placeholder='Enter value property'
								/>
							</Col>
							<Col md={4}>
								<Button
									onClick={() => removeInfo(i.number)}
									variant='outline-danger'
								>
									Remove
								</Button>
							</Col>
						</Row>
					)}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>Close</Button>
				<Button variant='outline-success' onClick={addProduct}>Add</Button>
			</Modal.Footer>
		</Modal>
	);
})

export default CreateProduct;