// Import
import { lazy } from 'react';
import { ADMIN_HOME_ROUTE, BASKET_ROUTE, LANDING_ROUTE, LISTING_ROUTE, LOGIN_ADMIN_ROUTE, LOGIN_ROUTE, PRODUCT_ADD_ROUTE, PRODUCT_DETAIL_ROUTE, PRODUCT_ROUTE, REGISTRATION_ADMIN_ROUTE, REGISTRATION_ROUTE } from "../utils/constsPath";

// Lazy-loaded components
const Auth = lazy(() => import("../pages/Auth"));
const AdminAuth = lazy(() => import("../pages/AdminAuth"));
const Basket = lazy(() => import("../pages/Basket"));
const Landing = lazy(() => import("../pages/Landing"));
const Listing = lazy(() => import("../pages/Listing"));
const Product = lazy(() => import("../pages/Product"));
const Admin = lazy(() => import("../pages/Admin"));
const AdminProduct = lazy(() => import("../pages/AdminProduct"));


// Export private pages and their paths
export const authRoutes = [
	{
		path: BASKET_ROUTE,
		Component: Basket,
	}
]

// Export admin pages and their paths
export const adminRoutes = [
	{
		path: ADMIN_HOME_ROUTE,
		Component: Admin,
	},
	{
		path: PRODUCT_ADD_ROUTE,
		Component: AdminProduct,
	},
	{
		path: PRODUCT_DETAIL_ROUTE + '/:id', // Add the id of the selected element
		Component: AdminProduct,
	}
]

// Export admin reg and login pages and their paths
export const adminRegAndLoginRoutes = [
	{
		path: LOGIN_ADMIN_ROUTE,
		Component: AdminAuth,
	},
	{
		path: REGISTRATION_ADMIN_ROUTE,
		Component: AdminAuth,
	}
]

// Export public pages and their paths
export const publicRoutes = [
	{
		path: LANDING_ROUTE,
		Component: Landing,
	},
	{
		path: LISTING_ROUTE,
		Component: Listing,
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth,
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Auth,
	},
	{
		path: PRODUCT_ROUTE + '/:id', // Add the id of the selected element
		Component: Product,
	}
]