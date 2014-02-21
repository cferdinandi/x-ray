/* =============================================================

	X-Ray v3.0
	A script to toggle password visibility by Chris Ferdinandi
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.xray = (function (window, document, undefined) {

	'use strict';

	// Toggle password visiblity
	// Private method
	var _togglePW = function (pw) {
		var pwType = pw.type;
		if ( pwType == 'password' ) {
			pw.type = 'text';
		} else if ( pwType == 'text' ) {
			pw.type = 'password';
		}
	};

	// Load defaults
	// Private method
	var _loadDefaults = function (toggle, visibility, pw) {
		var showText = toggle.querySelector('[data-x-ray-show]');
		var hideText = toggle.querySelector('[data-x-ray-hide]');
		if ( visibility == 'show' ) {
			_togglePW(pw);
			if ( hideText !== null && hideText !== undefined ) {
				buoy.addClass( hideText, 'active' );
			}
		} else {
			if ( showText !== null && showText !== undefined ) {
				buoy.addClass( showText, 'active' );
			}
		}
	};

	// Update toggle text
	// Private method
	var _updateToggleText = function (toggle) {
		var showText = toggle.querySelector('.x-ray-show');
		var hideText = toggle.querySelector('.x-ray-hide');
		if ( hideText !== null && hideText !== undefined ) {
			buoy.toggleClass( hideText, 'active' );
		}
		if ( showText !== null && showText !== undefined ) {
			buoy.toggleClass( showText, 'active' );
		}
	};

	// Show/Hide password visibility
	// Private method
	var _runToggle = function ( pw, event ) {
		event.preventDefault();
		_togglePW(pw);
		_updateToggleText(toggle);
	};

	// Initialize X-Ray
	// Public method
	var init = function () {

		// Feature test before initializing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			var xrayToggles = document.querySelectorAll('[data-x-ray]'); // Get show/hide password toggles
			buoy.addClass(document.documentElement, 'js-x-ray'); // Add class to HTML element to activate conditional CSS

			// When x-ray toggle is clicked, toggle password visibility
			Array.prototype.forEach.call(xrayToggles, function (toggle, index) {

				// Selectors and variables
				var visibility = toggle.getAttribute('data-default');
				var pwID = toggle.getAttribute('data-target');
				var pw = document.querySelector(pwID);

				_loadDefaults(toggle, visibility, pw); // Initialize password visibility defaults
				toggle.addEventListener('click', _runToggle.bind(toggle, pw), false); // If a toggle is clicked, update visibility

			});

		}

	};

	// Return public methods
	return {
		init: init
	};

})(window, document);