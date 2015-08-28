var xRay = function ( toggle, pws, show, showText, hideText, cb ) {

	// Sanity check
	if ( !toggle || !pws ) return;

	// Default visibility
	if ( !show ) { show = false; }

	// If only one password field, push to an array
	if ( Object.prototype.toString.call( pws ) !== '[object NodeList]' ) {
		pws = [pws];
	}

	/**
	 * Switch password field visibility
	 */
	var togglePWs = function () {

		// Toggle password fields
		for (var i = 0, len = pws.length; i < len; i++) {
			var pwType = pws[i].type.toLowerCase();
			if ( pwType === 'password' ) {
				pws[i].type = 'text';
				if ( hideText ) {
					toggle.innerHTML = hideText;
				}
			} else if ( pwType === 'text' ) {
				pws[i].type = 'password';
				if ( showText ) {
					toggle.innerHTML = showText;
				}
			}
		}

		// Run callback
		if ( cb && typeof(cb) === 'function' ) {
			cb(toggle, pws);
		}

	};

	/**
	 * Show toggles
	 */
	var showToggle = function () {

		// Show toggle
		toggle.removeAttribute( 'hidden' );

		// If toggle is a checkbox, also show label
		if ( toggle.type.toLowerCase() === 'checkbox' ) {

			// If using <label><input type="checkbox">Label</label>
			var parent = toggle.parentNode;
			if ( parent.tagName.toLowerCase() === 'label' ) {
				parent.removeAttribute( 'hidden' );
				return;
			}

			// If using <label for="checkbox">Label</label><input type="checkbox" id="checkbox">
			var label = document.querySelector( 'label[for="' + toggle.id + '"]' );
			if ( label ) {
				label.removeAttribute( 'hidden' );
			}

		}

	};

	// Make the toggle visible on load
	showToggle();

	// If passwords should be visible by default, make them visible on load
	if ( show ) {
		togglePWs();
	}

	// Listen for click events
	toggle.addEventListener('click', function ( event ) {
		if ( toggle.tagName.toLowerCase() === 'a' || toggle.tagName.toLowerCase() === 'button' ) {
			event.preventDefault();
		}
		togglePWs();
	}, false);

};