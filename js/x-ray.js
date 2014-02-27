/* =============================================================

	X-Ray v3.1
	A script to toggle password visibility by Chris Ferdinandi
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.xray = (function (window, document, undefined) {

	'use strict';

	// Default settings
	// Private method
	// Returns an {object}
	var _defaults = {
		toggleActiveClass: 'active',
		initClass: 'js-x-ray',
		callbackBefore: function () {},
		callbackAfter: function () {}
	};

	// Merge default settings with user options
	// Private method
	// Returns an {object}
	var _mergeObjects = function ( original, updates ) {
		for (var key in updates) {
			original[key] = updates[key];
		}
		return original;
	};

	// Toggle password visiblity
	// Private method
	// Runs functions
	var _togglePW = function ( pws ) {
		Array.prototype.forEach.call(pws, function (pw, index) {
			var pwType = pw.type;
			if ( pwType == 'password' ) {
				pw.type = 'text';
			} else if ( pwType == 'text' ) {
				pw.type = 'password';
			}
		});
	};

	// Load defaults
	// Private method
	// Runs functions
	var _loadDefaults = function ( toggle, visibility, pwID, options ) {
		var showText = toggle.querySelector('[data-x-ray-show]');
		var hideText = toggle.querySelector('[data-x-ray-hide]');
		var pws = document.querySelectorAll(pwID);
		if ( visibility == 'show' ) {
			_togglePW(pws);
			if ( hideText !== null && hideText !== undefined ) {
				buoy.addClass( hideText, options.toggleActiveClass );
			}
		} else {
			if ( showText !== null && showText !== undefined ) {
				buoy.addClass( showText, options.toggleActiveClass );
			}
		}
	};

	// Update toggle text
	// Private method
	// Runs functions
	var _updateToggleText = function ( toggle, options ) {
		var showText = toggle.querySelector('.x-ray-show');
		var hideText = toggle.querySelector('.x-ray-hide');
		if ( hideText !== null && hideText !== undefined ) {
			buoy.toggleClass( hideText, options.toggleActiveClass );
		}
		if ( showText !== null && showText !== undefined ) {
			buoy.toggleClass( showText, options.toggleActiveClass );
		}
	};

	// Show/Hide password visibility
	// Public method
	// Runs functions
	var runToggle = function ( toggle, pwID, options, event ) {

		// Selectors and variables
		options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
		var pws = document.querySelectorAll( pwID );

		options.callbackBefore(); // Run callbacks before password visibility toggle

		// If a link, prevent default click event
		if ( toggle && ( toggle.tagName === 'A' || toggle.tagName === 'BUTTON' ) && event ) {
			event.preventDefault();
		}
		_togglePW( pws ); // Show/Hide password
		_updateToggleText( toggle, options ); // Change the toggle text

		options.callbackAfter(); // Run callbacks after password visibility toggle

	};

	// Initialize X-Ray
	// Public method
	// Runs functions
	var init = function ( options ) {

		// Feature test before initializing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			// Selectors and variables
			options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
			var xrayToggles = document.querySelectorAll('[data-x-ray]'); // Get show/hide password toggles

			buoy.addClass(document.documentElement, options.initClass); // Add class to HTML element to activate conditional CSS

			// When x-ray toggle is clicked, toggle password visibility
			Array.prototype.forEach.call(xrayToggles, function (toggle, index) {

				// Selectors and variables
				var visibility = toggle.getAttribute('data-default');
				var pwID = toggle.getAttribute('data-x-ray');

				_loadDefaults( toggle, visibility, pwID, options ); // Initialize password visibility defaults
				toggle.addEventListener('click', runToggle.bind( null, toggle, pwID, options ), false); // If a toggle is clicked, update visibility

			});

		}

	};

	// Return public methods
	return {
		init: init,
		runToggle: runToggle
	};

})(window, document);