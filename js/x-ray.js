/* =============================================================

	X-Ray v1.1
	A script to toggle password visibility by Chris Ferdinandi
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

 (function (window, document, undefined) {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// VARIABLES

		// Get all x-ray toggles
		var xrayToggles = document.querySelectorAll('.x-ray');


		// FUNCTIONS

		// Function to initialize defaults
		var initDefaults = function (toggle, visibility, pw) {
			var showText = toggle.querySelector('.x-ray-show');
			var hideText = toggle.querySelector('.x-ray-hide');
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

		// Function to toggle password visiblity
		var togglePW = function (pw) {
			var pwType = pw.type;
			if ( pwType == 'password' ) {
				pw.type = 'text';
			} else if ( pwType == 'text' ) {
				pw.type = 'password';
			}
		};

		// Function to update toggle text
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


		// LISTENERS AND EVENTS

		// When x-ray toggle is clicked, toggle password visibility
		[].forEach.call(xrayToggles, function (toggle) {

			// Get default visibility and target password field
			var visibility = toggle.getAttribute('data-default');
			var pwID = toggle.getAttribute('data-target');
			var pw = document.querySelector(pwID);

			// Initialize password visibility defaults
			initDefaults(toggle, visibility, pw);

			// If a toggle is clicked, update visibility
			toggle.addEventListener('click', function(e) {
				e.preventDefault();
				togglePW(pw);
				updateToggleText(toggle);
			}, false);
		});


	}

})(window, document);