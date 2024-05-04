// Import
import React, { useContext, useState } from 'react';
import { Modal, Form, Button, ListGroup } from 'react-bootstrap';
import { createBrand, deleteBrand, fetchBrands } from '../../../http/productAPI';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';

const CreateBrand = observer(({ show, onHide }) => {
	const { allProducts } = useContext(Context);
	// We monitor the condition for a controlled imput
	const [value, setValue] = useState('');
	const [errorText, setErrorText] = useState('');

	const brands = allProducts.brands;

	// Call function createBrand with name brand and close popup
	const addBrand = () => {
		if (!value) {
			setErrorText('The field should not be empty');
			return;
		}

		if (value.length > 20) {
			setErrorText('The field should not exceed 20 characters');
			return;
		}

		const isExistingBrand = brands.some(brand => brand.name === value);
		if (isExistingBrand) {
			setErrorText('This brand already exists');
			return;
		}

		setErrorText('');

		createBrand({ name: value }).then(data => {
			setValue(''); // Cleaning the input

			// execution of a request to receive an updated brand list
			fetchBrands()
				.then(data => {
					// Updating the list of brands in the Allproducts storage
					allProducts.setBrands(data);
				})
				.catch(err => console.log(err.response?.data.message, 'error'));
		})
			.catch(err => console.log(err.response?.data.message, 'error'));
	}

	const handleDeleteBrand = (id) => {
		deleteBrand(id)
			.then((data) => {
				alert(data.message);

				// execution of a request to receive an updated brand list
				fetchBrands()
					.then(data => {
						// Updating the list of brands in the Allproducts storage
						allProducts.setBrands(data);
					})
					.catch(err => console.log(err.response?.data.message, 'error'));
			})
			.catch(err => {
				if (err.response?.status === 404) {
					alert(err.response?.data.message);
				} else {
					console.log(err.response?.data.message, 'error');
				}
			});
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
					Add brand
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder='Enter name brand'
					/>
					<div style={{
						color: 'rgba(255, 38, 0, 0.85)',
						lineHeight: '1.25rem',
						fontFamily: 'Inter',
						fontWeight: 400,
						letterSpacing: '0.5px',
						fontSize: '15px'
					}}>
						{errorText}
					</div>
				</Form>
				<ListGroup className="mt-3">
					{brands.map(brand => (
						<ListGroup.Item key={brand.id} className="d-flex justify-content-between align-items-center">
							{brand.name}
							<Button
								variant="outline-danger"
								className="ml-2"
								onClick={() => handleDeleteBrand(brand.id)}
							>
								Delete
							</Button>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>Close</Button>
				<Button variant='outline-success' onClick={addBrand}>Add</Button>
			</Modal.Footer>
		</Modal >
	);
});

export default CreateBrand;