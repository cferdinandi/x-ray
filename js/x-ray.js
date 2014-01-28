/* =============================================================

	X-Ray v2.0
	A script to toggle password visibility by Chris Ferdinandi
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.xray = (function (window, document, undefined) {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window ) {

		// SELECTORS

		var xrayToggles = document.querySelectorAll('[data-x-ray]');


		// METHODS

		// Initialize defaults
		var initDefaults = function (toggle, visibility, pw) {
			var showText = toggle.querySelector('[data-x-ray-show]');
			var hideText = toggle.querySelector('[data-x-ray-hide]');
			if ( visibility == 'show' ) {
				togglePW(pw);
				if ( hideText !== null && hideText !== undefined ) {
					buoy.addClass( hideText, 'active' );
				}
			} else {
				if ( showText !== null && showText !== undefined ) {
					buoy.addClass( showText, 'active' );
				}
			}
		};

		// Toggle password visiblity
		var togglePW = function (pw) {
			var pwType = pw.type;
			if ( pwType == 'password' ) {
				pw.type = 'text';
			} else if ( pwType == 'text' ) {
				pw.type = 'password';
			}
		};

		// Update toggle text
		var updateToggleText = function (toggle) {
			var showText = toggle.querySelector('.x-ray-show');
			var hideText = toggle.querySelector('.x-ray-hide');
			if ( hideText !== null && hideText !== undefined ) {
				buoy.toggleClass( hideText, 'active' );
			}
			if ( showText !== null && showText !== undefined ) {
				buoy.toggleClass( showText, 'active' );
			}
		};

		var runToggle = function ( pw, event ) {
			event.preventDefault();
			togglePW(pw);
			updateToggleText(toggle);
		};


		// EVENTS, LISTENERS, AND INITS

		// Add class to HTML element to activate conditional CSS
		buoy.addClass(document.documentElement, 'js-x-ray');

		// When x-ray toggle is clicked, toggle password visibility
		for (var i = xrayToggles.length; i--;) {

			// SELECTORS

			var toggle = xrayToggles[i];
			var visibility = toggle.getAttribute('data-default');
			var pwID = toggle.getAttribute('data-target');
			var pw = document.querySelector(pwID);


			// EVENTS, LISTENERS, AND INITS

			// Initialize password visibility defaults
			initDefaults(toggle, visibility, pw);

			// If a toggle is clicked, update visibility
			toggle.addEventListener('click', runToggle.bind(toggle, pw), false);

		}

	}

})(window, document);