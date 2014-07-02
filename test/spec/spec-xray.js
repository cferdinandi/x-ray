describe('X-Ray', function () {

	//
	// Helper Functions
	//

	/**
	 * Inserts Houdini markup into DOM
	 */
	var injectElem = function () {
		var elem =
			'<form>' +
				'<div>' +
					'<label>Password</label>' +
					'<input class="pws" id="pw1" type="password">' +
				'</div>' +
				'<div>' +
					'<a class="x-ray" data-x-ray="#pw1" data-default="show" href="#">' +
						'<span class="x-ray-show" data-x-ray-show>Show Password</span>' +
						'<span class="x-ray-hide" data-x-ray-hide>Hide Password</span>' +
					'</a>' +
				'</div>' +
			'</form>' +
			'<form>' +
				'<div>' +
					'<label>Password</label>' +
					'<input class="pws" id="pw2" type="password">' +
				'</div>' +
				'<div>' +
					'<a class="x-ray" data-x-ray="#pw2" data-default="hide" href="#">' +
						'<span class="x-ray-show" data-x-ray-show>Show Password</span>' +
						'<span class="x-ray-hide" data-x-ray-hide>Hide Password</span>' +
					'</a>' +
				'</div>' +
			'</form>' +
			'<form>' +
				'<div>' +
					'<label>Password</label>' +
					'<input class="multiple-pws" id="pw2" type="password">' +
				'</div>' +
				'<div>' +
					'<label>Password</label>' +
					'<input class="multiple-pws" id="pw2" type="password">' +
				'</div>' +
				'<div>' +
					'<a class="x-ray" data-x-ray=".multiple-pws" data-default="show" href="#">' +
						'<span class="x-ray-show" data-x-ray-show>Show Password</span>' +
						'<span class="x-ray-hide" data-x-ray-hide>Hide Password</span>' +
					'</a>' +
				'</div>' +
			'</form>';
		document.body.innerHTML = elem;
	};

	/**
	 * Triggers an event
	 * @param  {String} type Type of event (ex. 'click')
	 * @param  {Element} elem The element that triggered the event
	 * @link http://stackoverflow.com/a/2490876
	 */
	var trigger = function (type, elem) {
		var event; // The custom event that will be created

		if (document.createEvent) {
			event = document.createEvent('HTMLEvents');
			event.initEvent(type, true, true);
		} else {
			event = document.createEventObject();
			event.eventType = type;
		}

		event.eventName = type;

		if (document.createEvent) {
			elem.dispatchEvent(event);
		} else {
			elem.fireEvent("on" + event.eventType, event);
		}
	};

	/**
	 * Bind polyfill for PhantomJS
	 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility
	 */
	if (!Function.prototype.bind) {
		Function.prototype.bind = function (oThis) {
			if (typeof this !== "function") {
				// closest thing possible to the ECMAScript 5
				// internal IsCallable function
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}

			var aArgs = Array.prototype.slice.call(arguments, 1);
			var fToBind = this;
			var fNOP = function () {};
			var fBound = function () {
				return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
			};

			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();

			return fBound;
		};
	}


	//
	// Init
	//

	describe('Should initialize plugin', function () {

		beforeEach(function () {
			xray.init();
		});

		it('Document should include the xray module', function () {
			expect(!!xray).toBe(true);
		});

		it('Document should contain init class', function () {
			expect(document.documentElement.classList.contains('js-x-ray')).toBe(true);
		});

	});

	describe('Should load default visibility', function () {

		var toggles, pws, multiples;

		beforeEach(function () {
			injectElem();
			xray.init();
			toggles = document.querySelectorAll('[data-x-ray]');
			pws = document.querySelectorAll('.pws');
			multiples = document.querySelectorAll('.multiple-pws');
		});

		it('data-default="show" should be a text input', function () {
			expect(pws[0].type.toLowerCase()).toBe('text');
			expect(toggles[0].querySelector('[data-x-ray-show]').classList.contains('active')).toBe(false);
			expect(toggles[0].querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(true);
		});

		it('data-default="hide" should be a password input', function () {
			expect(pws[1].type.toLowerCase()).toBe('password');
			expect(toggles[1].querySelector('[data-x-ray-show]').classList.contains('active')).toBe(true);
			expect(toggles[1].querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(false);
		});

		it('If multiple passwords selected with data-default="show", all should be visible', function () {
			expect(multiples[0].type.toLowerCase()).toBe('text');
			expect(multiples[1].type.toLowerCase()).toBe('text');
		});

	});

	describe('Should merge user options into defaults', function () {

		var toggle, pw, doc;

		beforeEach(function () {
			injectElem();
			xray.init({
				toggleActiveClass: 'toggle-active',
				initClass: 'js-test',
				callbackBefore: function () { document.documentElement.classList.add('callback-before'); },
				callbackAfter: function () { document.documentElement.classList.add('callback-after'); }
			});
			toggle = document.querySelector('[data-x-ray]');
			content = document.querySelector( toggle.getAttribute('data-x-ray') );
			doc = document.documentElement;
		});

		it('User options should be merged into defaults', function () {
			expect(toggle.querySelector('[data-x-ray-hide]').classList.contains('toggle-active')).toBe(true);
			trigger('click', toggle);
			expect(toggle.querySelector('[data-x-ray-show]').classList.contains('toggle-active')).toBe(true);
			expect(doc.classList.contains('js-test')).toBe(true);
			expect(doc.classList.contains('callback-before')).toBe(true);
			expect(doc.classList.contains('callback-after')).toBe(true);
		});

	});


	//
	// Events
	//

	describe('Should toggle visbility on click', function () {

		var toggles, pws, multiples;

		beforeEach(function () {
			injectElem();
			xray.init();
			toggles = document.querySelectorAll('[data-x-ray]');
			pws = document.querySelectorAll('.pws');
			multiples = document.querySelectorAll('.multiple-pws');
		});

		it('Password for data-default="show" should be hidden when clicked', function () {
			trigger('click', toggles[0]);
			expect(pws[0].type.toLowerCase()).toBe('password');
			expect(toggles[0].querySelector('[data-x-ray-show]').classList.contains('active')).toBe(true);
			expect(toggles[0].querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(false);
		});

		it('Password for data-default="show" should be visible when clicked again', function () {
			trigger('click', toggles[0]);
			expect(pws[0].type.toLowerCase()).toBe('password');
			expect(toggles[0].querySelector('[data-x-ray-show]').classList.contains('active')).toBe(true);
			expect(toggles[0].querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(false);
			trigger('click', toggles[0]);
			expect(pws[0].type.toLowerCase()).toBe('text');
			expect(toggles[0].querySelector('[data-x-ray-show]').classList.contains('active')).toBe(false);
			expect(toggles[0].querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(true);
		});

		it('Password for data-default="hide" should be visible when clicked', function () {
			trigger('click', toggles[1]);
			expect(pws[1].type.toLowerCase()).toBe('text');
			expect(toggles[1].querySelector('[data-x-ray-show]').classList.contains('active')).toBe(false);
			expect(toggles[1].querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(true);
		});

		it('Password for data-default="hide" should be hidden when clicked again', function () {
			trigger('click', toggles[1]);
			expect(pws[1].type.toLowerCase()).toBe('text');
			expect(toggles[1].querySelector('[data-x-ray-show]').classList.contains('active')).toBe(false);
			expect(toggles[1].querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(true);
			trigger('click', toggles[1]);
			expect(pws[1].type.toLowerCase()).toBe('password');
			expect(toggles[1].querySelector('[data-x-ray-show]').classList.contains('active')).toBe(true);
			expect(toggles[1].querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(false);
		});

		it('Class selector should toggle multiple passwords', function () {
			trigger('click', toggles[2]);
			expect(multiples[0].type.toLowerCase()).toBe('password');
			expect(multiples[1].type.toLowerCase()).toBe('password');
			trigger('click', toggles[2]);
			expect(multiples[0].type.toLowerCase()).toBe('text');
			expect(multiples[1].type.toLowerCase()).toBe('text');
		});

	});


	//
	// APIs
	//

	describe('Should toggle visibility from public API', function () {

		var toggles, pws;

		beforeEach(function () {
			injectElem();
			xray.init();
			toggle = document.querySelector('[data-x-ray="#pw2"]');
			pwID = '#pw2';
			pw = document.querySelector(pwID);
			xray.runToggle(toggle, pwID, null, null);
		});

		it('Password should be visible', function () {
			expect(pw.type.toLowerCase()).toBe('text');
			expect(toggle.querySelector('[data-x-ray-show]').classList.contains('active')).toBe(false);
			expect(toggle.querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(true);
		});

		it('Password should be hidden if toggled again', function () {
			expect(pw.type.toLowerCase()).toBe('text');
			expect(toggle.querySelector('[data-x-ray-show]').classList.contains('active')).toBe(false);
			expect(toggle.querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(true);
			xray.runToggle(toggle, pwID, null, null);
			expect(pw.type.toLowerCase()).toBe('password');
			expect(toggle.querySelector('[data-x-ray-show]').classList.contains('active')).toBe(true);
			expect(toggle.querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(false);
		});

	});

	describe('Should remove initialized plugin', function () {

		var toggle, content, doc;

		beforeEach(function () {
			injectElem();
			xray.init();
			toggle = document.querySelector('[data-x-ray]');
			pw = document.querySelector( toggle.getAttribute('data-x-ray') );
			doc = document.documentElement;
		});

		it('X-Ray should be uninitialized', function () {
			trigger('click', toggle);
			expect(pw.type.toLowerCase()).toBe('password');
			expect(toggle.querySelector('[data-x-ray-show]').classList.contains('active')).toBe(true);
			expect(toggle.querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(false);
			expect(doc.classList.contains('js-x-ray')).toBe(true);
			trigger('click', toggle);
			expect(pw.type.toLowerCase()).toBe('text');
			expect(toggle.querySelector('[data-x-ray-show]').classList.contains('active')).toBe(false);
			expect(toggle.querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(true);
			xray.destroy();
			expect(pw.type.toLowerCase()).toBe('password');
			trigger('click', toggle);
			expect(pw.type.toLowerCase()).toBe('password');
			expect(toggle.querySelector('[data-x-ray-show]').classList.contains('active')).toBe(false);
			expect(toggle.querySelector('[data-x-ray-hide]').classList.contains('active')).toBe(false);
		});

	});

});