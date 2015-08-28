# xRay.js [![Build Status](https://travis-ci.org/cferdinandi/x-ray.svg)](https://travis-ci.org/cferdinandi/x-ray)
Toggle password visibility in forms.

[Download X-Ray](https://github.com/cferdinandi/x-ray/archive/master.zip) / [View the demo](http://cferdinandi.github.io/x-ray/)


## Usage

1. Include `xRay.js` on your site.

	```html
	<script src="dist/js/xRay.js"></script>
	```
2. Add a link, button, or checkbox to your form to toggle the password field. Add the `[hidden]` attribute to hide the element until the script had loaded. If you want the text of link or button toggles to change based on the visibility of the password field, leave the element blank.

	```html
	<button class="js-xray" hidden></button>
	/* or... */
	<a class="js-xray" href="#"></a>
	/* or... */
	<label hidden>
		<input class="js-xray" type="checkbox">
		Show Password
	</label>
	```
3. Call `xRay.js`.

	```js
	xRay(
		toggle, // The element that toggles visibility
		pws, // The password field(s)
		show, // If true, show password by default [optional]
		showText, // Text to display if password is hidden [optional]
		hideText, // Test to display if password is visible [optional]
		cb // Callback to run after password visibility changes
	);
	```


## Examples

**With a button**

```html
<script src="xRay.js"></script>

<form>
	<div>
		<label>Username</label>
		<input type="text">
	</div>
	<div>
		<label>Password</label>
		<input id="pw" type="password">
	</div>
	<div>
		<button class="js-xray" hidden></button>
	</div>
</form>

<script>
	if ( !!document.querySelector && !!window.addEventListener ) {
		xRay(
			document.querySelector( '.js-xray' ),
			document.querySelector( '#pw' ),
			true,
			'Show Password',
			'Hide Password'
		);
	}
</script>
```

**With a checkbox**

```html
<script src="xRay.js"></script>

<form>
	<div>
		<label>Username</label>
		<input type="text">
	</div>
	<div>
		<label>Password</label>
		<input id="pw" type="password">
	</div>
	<div>
		<label hidden>
			<input class="js-xray" type="checkbox" checked>
			Show password
		</label>
	</div>
</form>

<script>
	if ( !!document.querySelector && !!window.addEventListener ) {
		xRay(
			document.querySelector( '.js-xray' ),
			document.querySelector( '#pw' ),
			true
		);
	}
</script>
```

**With multiple password fields, hidden by default**

```html
<script src="xRay.js"></script>

<form>
	<div>
		<label>Current Password</label>
		<input class="pw" type="password">
	</div>
	<div>
		<label>New Password</label>
		<input class="pw" type="password">
	</div>
	<div>
		<label hidden>
			<input class="js-xray" type="checkbox">
			Show password
		</label>
	</div>
</form>

<script>
	if ( !!document.querySelector && !!window.addEventListener ) {
		xRay(
			document.querySelector( '.js-xray' ),
			document.querySelectorAll( '.pw' )
		);
	}
</script>
```


[See working examples in the demo.](http://cferdinandi.github.io/x-ray/)



## Installing with Package Managers

You can install X-Ray with your favorite package manager.

* **NPM:** `npm install cferdinandi/x-ray`
* **Bower:** `bower install https://github.com/cferdinandi/x-ray.git`
* **Component:** `component install cferdinandi/x-ray`



## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, lints, and minifies code.

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files and applies changes using [LiveReload](http://livereload.com/).



## Browser Compatibility

X-Ray works in all modern browsers, and IE 9 and above.

X-Ray is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, passwords will be masked by default.

### Cutting the Mustard

You should check for `document.querySelector` and `window.addEventListener` support before calling `xRay.js`.

```js
if ( 'querySelector' in document && 'addEventListener' in window ) {
	xRay( ... );
}
```


## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Please apply fixes to both the development and production code. Don't forget to update the version number, and when applicable, the documentation.



## License

The code is available under the [MIT License](LICENSE.md).