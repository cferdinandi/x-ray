var xRay = function ( toggle, pws, show, showText, hideText, cb ) {

	// Sanity check
	if ( !toggle || !pws ) return;

	// Variables and settings
	var theToggle = document.querySelector( toggle ); // Get show/hide password toggle
	var thePWs = document.querySelectorAll( pws ); // Get the password fields
	if ( !show ) { show = false; } // Default visibility

	// If no toggle or password fields are found, bail
	if ( !theToggle || thePWs.length === 0 ) return;

	/**
	 * Switch password field visibility
	 */
	var togglePWs = function () {
		for (var i = 0, len = thePWs.length; i < len; i++) {
			var pwType = thePWs[i].type.toLowerCase();
			if ( pwType === 'password' ) {
				thePWs[i].type = 'text';
				if ( hideText ) {
					theToggle.innerHTML = hideText;
				}
			} else if ( pwType === 'text' ) {
				thePWs[i].type = 'password';
				if ( showText ) {
					theToggle.innerHTML = showText;
				}
			}
		}
	};

	/**
	 * Show toggles
	 */
	var showToggle = function () {
		theToggle.removeAttribute( 'hidden' );
		if ( theToggle.type.toLowerCase() === 'checkbox' ) {
			var parent = theToggle.parentNode;
			if ( parent.tagName.toLowerCase() === 'label' ) {
				parent.removeAttribute( 'hidden' );
				return;
			}
			var label = document.querySelector( 'label[for="' + theToggle.id + '"]' );
			if ( label ) {
				label.removeAttribute( 'hidden' );
			}
		}
	};

	// Make the toggle visible
	showToggle();

	// If passwords should be visible by default, make them visible
	if ( show ) {
		togglePWs();
	}

	// Listen for click events
	theToggle.addEventListener('click', function ( event ) {
		if ( theToggle.tagName.toLowerCase() === 'a' || theToggle.tagName.toLowerCase() === 'button' ) {
			event.preventDefault();
		}
		togglePWs();
	}, false);

};