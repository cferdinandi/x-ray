(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('xray', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.xray = factory(root);
	}
})(this, function (root) {

	'use strict';

	//
	// Variables
	//

	var exports = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings;

	// Default settings
	var defaults = {
		toggleActiveClass: 'active',
		initClass: 'js-x-ray',
		callbackBefore: function () {},
		callbackAfter: function () {}
	};


	//
	// Methods
	//

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function ( defaults, options ) {
		var extended = {};
		forEach(defaults, function (value, prop) {
			extended[prop] = defaults[prop];
		});
		forEach(options, function (value, prop) {
			extended[prop] = options[prop];
		});
		return extended;
	};

	/**
	 * Toggle password visibility
	 * @private
	 * @param  {NodeList} pws Password fields to toggle
	 */
	var togglePW = function ( pws ) {
		forEach(pws, function (pw) {
			var pwType = pw.type.toLowerCase();
			if ( pwType === 'password' ) {
				pw.type = 'text';
			} else if ( pwType === 'text' ) {
				pw.type = 'password';
			}
		});
	};

	/**
	 * Load default visibility
	 * @private
	 * @param  {Element} toggle The element that toggles password visibility
	 * @param  {String} visibility Should the password be visible or hidden by default?
	 * @param  {String} pwSelector ID of the password field
	 * @param  {Object} settings
	 */
	var loadDefaultVisibility = function ( toggle, visibility, pwSelector, settings ) {
		var showText = toggle.querySelector('[data-x-ray-show]');
		var hideText = toggle.querySelector('[data-x-ray-hide]');
		var pws = document.querySelectorAll(pwSelector);
		if ( visibility === 'show' ) {
			togglePW(pws);
			if ( hideText ) {
				hideText.classList.add( settings.toggleActiveClass );
			}
		} else {
			if ( showText ) {
				showText.classList.add( settings.toggleActiveClass );
			}
		}
	};

	/**
	 * Update toggle text
	 * @private
	 * @param  {Element} toggle The element that toggles password visibility
	 * @param  {Object} settings
	 */
	var updateToggleText = function ( toggle, settings ) {
		var showText = toggle.querySelector('.x-ray-show');
		var hideText = toggle.querySelector('.x-ray-hide');
		if ( hideText ) {
			hideText.classList.toggle( settings.toggleActiveClass );
		}
		if ( showText ) {
			showText.classList.toggle( settings.toggleActiveClass );
		}
	};

	/**
	 * Show or hide password visibility
	 * @public
	 * @param  {Element} toggle The element that toggles password visibility
	 * @param  {String} pwSelector The selector for the password fields
	 * @param  {Object} options
	 * @param  {Event} event
	 */
	exports.runToggle = function ( toggle, pwSelector, options, event ) {

		// Selectors and variables
		var settings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var pws = document.querySelectorAll( pwSelector );

		settings.callbackBefore( toggle, pwSelector ); // Run callbacks before password visibility toggle

		// If a link, prevent default click event
		if ( toggle && ( toggle.tagName.toLowerCase() === 'a' || toggle.tagName.toLowerCase() === 'button' ) && event ) {
			event.preventDefault();
		}
		togglePW( pws ); // Show/Hide password
		updateToggleText( toggle, settings ); // Change the toggle text

		settings.callbackAfter( toggle, pwSelector ); // Run callbacks after password visibility toggle

	};

	/**
	 * Initialize X-Ray
	 * @public
	 * @param {Object} options User settings
	 */
	exports.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Selectors and variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults
		var xrayToggles = document.querySelectorAll('[data-x-ray]'); // Get show/hide password toggles

		document.documentElement.classList.add( settings.initClass ); // Add class to HTML element to activate conditional CSS

		forEach(xrayToggles, function (toggle) {
			var visibility = toggle.getAttribute('data-default');
			var pwID = toggle.getAttribute('data-x-ray');
			loadDefaultVisibility( toggle, visibility, pwID, settings ); // Initialize password visibility defaults
			toggle.addEventListener('click', exports.runToggle.bind( null, toggle, pwID, settings ), false); // If a toggle is clicked, update visibility
		});

	};


	//
	// Public APIs
	//

	return exports;

});