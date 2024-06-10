import React, { useRef, useEffect } from 'react';
import styles from './Spoiler.module.css';

const Spoiler = ({ children, duration, oneSpoller, closeByClickOnDocument = true, hideSpoilerInStart = true, ...attrs }) => {
	const ref = useRef(); // We use a hook useRef to get a access for the main block of the component as a DOM element

	// Using useEffect for the actions with spoilers and add the listener of events only if there are ref.current
	useEffect(() => {
		const spoller = ref.current; // Get spoilers block

		if (closeByClickOnDocument) {
			document.addEventListener('mouseup', handleClickOutside); // Set event for document
		}

		const spollerTitles = spoller.querySelectorAll('.spoller-button'); // Get all the buttons of the spoilers in the class - spoller-button

		initSpollerBody();
		//Work with content
		function initSpollerBody() {
			if (spollerTitles.length > 0) {
				spoller.addEventListener('click', setSpollerAction);// Set event for spoiler

				// Checking for the active class and hiding element by the class
				spollerTitles.forEach(spollerTitle => {
					if (!spollerTitle.classList.contains(styles.buttonActive) && hideSpoilerInStart) {
						spollerTitle.nextElementSibling.hidden = true;
					} else if (!spollerTitle.classList.contains(styles.buttonActive) && !hideSpoilerInStart) {
						spollerTitle.classList.add(styles.buttonActive);// Add active class
					}
				})
			}
		}

		// Handler to switch the active class and call of the function slideToggle
		function setSpollerAction(event) {
			const el = event.target;// Get pressed element
			if (el.classList.contains('spoller-button') || el.closest('.spoller-button')) {
				// Get spoiler button
				const spollerTitle = el.classList.contains('spoller-button') ? el
					: el.closest('.spoller-button');

				if (el.closest('.spoller-button')) {
					// Checking to prevent multiple presses
					if (!spoller.querySelectorAll('._slide').length) {
						let isCallSlideUpOneSpoller = false;// We monitor the call of the function
						// Checking for oneSpoller and there are no open spoilers
						if (oneSpoller && !spollerTitle.classList.contains(styles.buttonActive)) {
							// Checking for the full execution of the function
							if (hideSpollersBody(spoller)) {
								isCallSlideUpOneSpoller = true;// Change value varriable
								// We begin the show of the second spoiler in the block only after the closing of the first spoiler
								setTimeout(() => {
									spollerTitle.classList.toggle(styles.buttonActive);
									_slideToggle(spollerTitle.nextElementSibling, duration);
								}, duration);
							}
						}
						// If the oneSpoller is not transmitted or the hideSpollersBody call is not completed until the end
						if (!isCallSlideUpOneSpoller) {
							spollerTitle.classList.toggle(styles.buttonActive);// Toggle active class
							_slideToggle(spollerTitle.nextElementSibling, duration);// Call slideToggle with an argument in the form spoiler body
						}
					}
					event.preventDefault(); // Remove default actions
				}
			}
		}

		// Processing the slide up of the spoiler when pressed in the non button
		function handleClickOutside(event) {
			// For each button
			spollerTitles.forEach(spollerTitle => {
				// If you do not press the buttons and there is an active spoiler
				if (!event.target.closest('.spoller-button') && spollerTitle.classList.contains(styles.buttonActive)) {
					// If not active anim spoiler
					if (!spoller.querySelectorAll('._slide').length) {
						spollerTitle.classList.remove(styles.buttonActive);// Remove active class
						_slideToggle(spollerTitle.nextElementSibling, duration);// Call slideToggle with an argument in the form spoiler body
					}
				}
			});
		}

		// Function for hidden spoiler body
		function hideSpollersBody(spoller) {
			const spollerActiveTitle = spoller.querySelector('.' + styles.buttonActive);// We get an active button in the spoiler
			if (spollerActiveTitle) {
				spollerActiveTitle.classList.remove(styles.buttonActive);// Remove active class in active button
				_slideUp(spollerActiveTitle.nextElementSibling, duration);// Hide the current spoiler
				return (true) // Return true with full execution function
			}
		}

		// Function for hidden spoiler
		const _slideUp = (target, duration = 500) => {
			if (!target.classList.contains('_slide')) {
				target.classList.add('_slide');
				target.style.transitionProperty = 'height, margin, padding';
				target.style.transitionDuration = duration + 'ms';
				target.style.height = target.offsetHeight + 'px';
				target.style.overflow = 'hidden';
				if (target.offsetHeight);
				target.style.height = 0;
				target.style.paddingTop = 0;
				target.style.paddingBottom = 0;
				target.style.marginTop = 0;
				target.style.marginBottom = 0;
				window.setTimeout(() => {
					target.hidden = true;
					target.style.removeProperty('height');
					target.style.removeProperty('margin-top');
					target.style.removeProperty('margin-bottom');
					target.style.removeProperty('padding-top');
					target.style.removeProperty('padding-bottom');
					target.style.removeProperty('overflow');
					target.style.removeProperty('transition-duration');
					target.style.removeProperty('transition-property');
					target.classList.remove('_slide');
				}, duration);
			}
		}

		// Function for show of the spoiler
		const _slideDown = (target, duration = 500) => {
			if (!target.classList.contains('_slide')) {
				target.classList.add('_slide');
				if (target.hidden) {
					target.hidden = false;
				}
				let height = target.offsetHeight;
				target.style.overflow = 'hidden';
				target.style.height = 0;
				target.style.paddingTop = 0;
				target.style.paddingBottom = 0;
				target.style.marginTop = 0;
				target.style.marginBottom = 0;
				if (target.offsetHeight);
				target.style.transitionProperty = 'height, margin, padding';
				target.style.transitionDuration = duration + 'ms';
				target.style.height = height + 'px';
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				window.setTimeout(() => {
					target.style.removeProperty('height');
					target.style.removeProperty('overflow');
					target.style.removeProperty('transition-duration');
					target.style.removeProperty('transition-property');
					target.classList.remove('_slide');
				}, duration)
			}
		}

		// Function for toggle amimation
		const _slideToggle = (target, duration = 500) => {
			if (target.hidden) {
				return _slideDown(target, duration);
			} else {
				return _slideUp(target, duration);
			}
		}

		// We delete useless events at the anmount component
		return () => {
			document.removeEventListener('mouseup', handleClickOutside);
			spoller.removeEventListener('click', setSpollerAction);
		};
	}, []);

	return (
		<div
			ref={ref}
			{...attrs}
		>
			{children}
		</div>
	);
}

export default Spoiler;