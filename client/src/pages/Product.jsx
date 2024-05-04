import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneProduct } from '../http/productAPI';
import Image from '../components/Image/Image';

const Product = () => {
	const [product, setProduct] = useState({ info: [] });
	const { id } = useParams();
	useEffect(() => {
		fetchOneProduct(id).then(data => setProduct(data))
			.catch(err => console.log(err.response?.data.message, 'error'));
	}, [id])
	return (
		<Container>
			<Row className='mt-4'>
				<Col md={4}>
					<Image src={process.env.REACT_APP_API_URL + product.img} alt={product.name}></Image>
				</Col>
				<Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }} md={4}>
					<h2 style={{ fontSize: '1.5rem' }}>{product.name}</h2>
					<div style={{ fontSize: '3rem', marginBottom: 40 }}>{product.raiting}</div>
				</Col>
				<Col
					style={{ padding: 10, backgroundColor: 'lightgray', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }} md={4}
				>
					<div style={{ fontSize: 20 }}>from {product.price} usd.</div>
					<Button>Add in basket</Button>
				</Col>
			</Row>
			<Row className='mt-4'>
				<h1>Characteristics:</h1>
				<ListGroup>
					{product.info.map(characteristick =>
						<ListGroup.Item
							style={{ background: characteristick.id % 2 !== 0 ? 'lightgray' : 'transparent' }}
							key={characteristick.id}
						>
							{characteristick.title}: {characteristick.description}
						</ListGroup.Item>
					)}
				</ListGroup>
			</Row>
		</Container>
	);
}

export default Product;