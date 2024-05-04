// Import
import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import AdminHeader from "./UI/admin header/AdminHeader";
import AdminSidebar from "./UI/admin-sidebar/AdminSidebar";
import AdminFooter from "./UI/admin footer/AdminFooter";
import { ADMIN_ROUTE, LOGIN_ADMIN_ROUTE, REGISTRATION_ADMIN_ROUTE } from "../utils/constsPath";

const LayoutAdmin = () => {
	// We get the current path
	const location = useLocation();

	// Determine whether the current path is a page of registration or entrance
	const isRegistrationOrLogin = location.pathname === ADMIN_ROUTE + LOGIN_ADMIN_ROUTE ||
		location.pathname === ADMIN_ROUTE + REGISTRATION_ADMIN_ROUTE;

	// Crare layout for admin panel
	return (
		<>
			{!isRegistrationOrLogin && <AdminHeader />}
			{!isRegistrationOrLogin && <AdminSidebar />}
			<main className={isRegistrationOrLogin ? '' : 'admin-main'}>
				<Suspense fallback={<Spinner animation='grow' />}>
					<Outlet />
				</Suspense>
			</main>
			{!isRegistrationOrLogin && <AdminFooter />}
		</>
	);
}

export { LayoutAdmin };