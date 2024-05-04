import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, LANDING_ROUTE } from '../utils/constsPath';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const Auth = observer(() => {
	const {user} = useContext(Context);
	const location = useLocation();
	const router = useNavigate();
	const isLogin = location.pathname === LOGIN_ROUTE;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const regAndLogin = async () => {
		try {
			let data;

			if (isLogin) {
				data = await login(email, password);
			} else {
				data = await registration(email, password);
			}
			user.setUser(user);
			user.setIsAuth(true);
			router(LANDING_ROUTE);
		} catch (error) {
			alert(error.response.data.message);
		}
	}

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600, padding: 50 }}>
				<h2 style={{ margin: '0 auto' }}>{isLogin ? 'Autorization' : 'Registration'}</h2>
				<Form className='d-flex flex-column'>
					<Form.Control
						style={{ backgroundColor: 'white' }}
						className='mt-3'
						placeholder='Enter email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Form.Control
						style={{ backgroundColor: 'white' }}
						className='mt-3'
						placeholder='Enter password'
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<Row className=' mt-3'
						style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
					>
						{isLogin ?
							<div style={{ flex: '0 1 50%', }}>
								Not account? <NavLink to={REGISTRATION_ROUTE}>Registration!</NavLink>
							</div>
							:
							<div style={{ flex: '0 1 50%', }}>
								Have account? <NavLink to={LOGIN_ROUTE}>Login!</NavLink>
							</div>
						}
						<Button
							variant='outline-success'
							className='mt-3'
							style={{ width: '25%', marginLeft: 'auto' }}
							onClick={regAndLogin}
						>
							{isLogin ? 'Enter' : 'Registration'}
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>
		
	);
})

export default Auth;