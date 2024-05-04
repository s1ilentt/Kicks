// Import
import { Outlet } from "react-router-dom";
import Footer from "./UI/footer/Footer";
import NavBar from "./UI/navBar/NavBar";
import { Suspense } from "react";
import { Spinner } from "react-bootstrap";

const LayoutHome = () => {
	// Crare layout for website
	return (
		<>
			<NavBar />
			<main>
				<Suspense fallback={<Spinner animation='grow' />}>
					<Outlet />
				</Suspense>
			</main>
			<Footer />
		</>
	);
}

export { LayoutHome };