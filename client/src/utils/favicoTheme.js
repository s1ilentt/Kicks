export const setFavicon = () => {
	let themeUser = '';
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		themeUser = 'dark';
	} else {
		themeUser = 'light';
	}

	const faviconLink = document.querySelector('link[rel="icon"]');
	if (themeUser === 'light') {
		faviconLink.href = '/favicon-light.ico';
	} else if (themeUser === 'dark') {
		faviconLink.href = '/favicon.ico';
	}
}
