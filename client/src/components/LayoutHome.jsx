// Import
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./UI/footer/Footer";
import NavBar from "./UI/navBar/NavBar";
import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/constsPath";

const LayoutHome = () => {
	// We get the current path
	const location = useLocation();

	// Determine whether the current path is a page of registration or entrance
	const isAuthPage = location.pathname === LOGIN_ROUTE || location.pathname === REGISTRATION_ROUTE;

	// Crare layout for website
	return (
		<>
			<NavBar />
			<main style={{minHeight: isAuthPage ? '0px' : '100vh'}}>
				<Suspense fallback={<Spinner animation='grow' />}>
					<Outlet />
				</Suspense>
			</main>
			<Footer />
		</>
	);
}

export { LayoutHome };