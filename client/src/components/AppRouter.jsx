// Import
import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes, authRoutes, adminRoutes, adminRegAndLoginRoutes } from '../router/routes.js';
import { ADMIN_HOME_ROUTE, ADMIN_ROUTE, LANDING_ROUTE, LOGIN_ADMIN_ROUTE } from '../utils/constsPath';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { LayoutHome } from './LayoutHome.jsx';
import { LayoutAdmin } from './LayoutAdmin.jsx';

const AppRouter = observer(() => {
	const { user } = useContext(Context);

	return (
		// We share the admin panel and pages of the website
		<Routes>
			<Route path={ADMIN_ROUTE + '*'} element={<LayoutAdmin />}>
				{/* // If user is auth we draw all admin components */}
				{user.isAuth && adminRoutes.map(({ path, Component }) =>
					<Route key={path} path={path} element={<Component />} />
				)}
				{/* // Always draw reg and login components */}
				{adminRegAndLoginRoutes.map(({ path, Component }) =>
					<Route key={path} path={path} element={<Component />} />
				)}
				{/* // In the case of the wrong way, we transfer the user to the main page */}
				<Route
					path="*"
					element={<Navigate to={user.isAuth ? ADMIN_HOME_ROUTE : LOGIN_ADMIN_ROUTE} replace />}
				/>
			</Route>
			<Route path='/' element={<LayoutHome />}>
				{/* // If user is auth we draw all the components */}
				{user.isAuth && authRoutes.map(({ path, Component }) =>
					<Route key={path} path={path} element={<Component />} />
				)}
				{/* // Always draw public components */}
				{publicRoutes.map(({ path, Component }) =>
					<Route key={path} path={path} element={<Component />} />
				)}
				{/* // In the case of the wrong way, we transfer the user to the main page */}
				<Route path="*" element={<Navigate to={LANDING_ROUTE} replace />} />
			</Route>
		</Routes>
	)
})

export default AppRouter;