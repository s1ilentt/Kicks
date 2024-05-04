// Import
import React, { useContext, useState } from 'react';
import { Button, Modal, Form, ListGroup } from 'react-bootstrap';
import { createType, deleteType, fetchTypes } from '../../../http/productAPI';
import { Context } from '../../..';

const CreateType = ({ show, onHide }) => {
	const { allProducts } = useContext(Context);
	// We monitor the condition for a controlled imput
	const [value, setValue] = useState('');
	const [errorText, setErrorText] = useState('');

	const types = allProducts.types;

	// Call function createType with name type and close popup
	const addType = () => {
		if (!value) {
			setErrorText('The field should not be empty');
			return;
		}

		if (value.length > 20) {
			setErrorText('The field should not exceed 20 characters');
			return;
		}

		const isExistingType = types.some(type => type.name === value);
		if (isExistingType) {
			setErrorText('This type already exists');
			return;
		}

		setErrorText('');

		createType({ name: value }).then(data => {
			setValue(''); // Cleaning the input

			// execution of a request to receive an updated type list
			fetchTypes()
				.then(data => {
					// Updating the list of types in the Allproducts storage
					allProducts.setTypes(data);
				})
				.catch(err => console.log(err.response?.data.message, 'error'));
		})
			.catch(err => console.log(err.response?.data.message, 'error'));
	}

	const handleDeleteType = (id) => {
		deleteType(id)
			.then((data) => {
				alert(data.message);

				// execution of a request to receive an updated type list
				fetchTypes()
					.then(data => {
						// Updating the list of types in the Allproducts storage
						allProducts.setTypes(data);
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
					Add type
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder='Enter name type'
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
					{types.map(type => (
						<ListGroup.Item key={type.id} className="d-flex justify-content-between align-items-center">
							{type.name}
							<Button
								variant="outline-danger"
								className="ml-2"
								onClick={() => handleDeleteType(type.id)}
							>
								Delete
							</Button>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>Close</Button>
				<Button variant='outline-success' onClick={addType}>Add</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateType;