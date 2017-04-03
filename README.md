# X-Ray [![Build Status](https://travis-ci.org/cferdinandi/x-ray.svg)](https://travis-ci.org/cferdinandi/x-ray)
A script that lets users toggle password visibility in forms.

[Download X-Ray](https://github.com/cferdinandi/x-ray/archive/master.zip) / [View the demo](http://cferdinandi.github.io/x-ray/)


<hr>

### Want to learn how to write your own vanilla JS plugins? Check out ["The Vanilla JS Guidebook"](https://gomakethings.com/vanilla-js-guidebook/) and level-up as a web developer. 🚀

<hr>



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include X-Ray on your site.

```html
<link rel="stylesheet" href="dist/css/x-ray.css">
<script src="dist/js/x-ray.js"></script>
```

### 2. Add the markup to your HTML.

```html
<form>
	<div>
		<label>Password</label>
		<input id="pw" type="password">
	</div>
	<div>
		<button class="x-ray" data-x-ray="#pw" data-default="show">
			<span class="x-ray-show" data-x-ray-show>Show Password</span>
			<span class="x-ray-hide" data-x-ray-hide>Hide Password</span>
		</button>
	</div>
</form>
```

Turn any link or button into a password visibility toggle by adding the `.x-ray` class and `[data-x-ray]` attribute. The value of the `[data-x-ray]` attribute should match the selector for the target password field. If you would like passwords to be visible by default, set the optional `[data-default]` attribute to `show`.

Use `<span>` elements with the `.x-ray-show` class and `[data-x-ray-show]` data attribute or `.x-ray-hide` class and `[data-x-ray-hide]` data attribute to change the toggle element based on whether or not the password is visible.

#### Using Checkboxes

If you'd prefer, you can use a checkbox instead of a button to toggle password visibility.

```html
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
		<label class="x-ray">
			<input type="checkbox" data-x-ray="#pw" data-default="show" checked>
			Show password
		</label>
	</div>
</form>
```

#### Toggling Multiple Password Fields

You can toggle multiple password fields with one button or checkbox by using a class selector instead of an ID.

```html
<form>
	<div>
		<label>Old Password</label>
		<input class="pw" type="password">
	</div>
	<div>
		<label>New Password</label>
		<input class="pw" type="password">
	</div>
	<div>
		<label class="x-ray">
			<input type="checkbox" data-x-ray=".pw" data-default="show" checked>
			Show passwords
		</label>
	</div>
</form>
```

### 3. Initialize X-Ray.

```html
<script>
	xray.init();
</script>
```

In the footer of your page, after the content, initialize X-Ray. And that's it, you're done. Nice work!



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



## Options and Settings

X-Ray includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into X-Ray through the `init()` function:

```javascript
xray.init({
	selector: '[data-x-ray]', // Selector for the password toggle (must be a valid CSS selector)
	selectorShow: '[data-x-ray-show]', // Selector for the "show password" text (must be a valid CSS selector)
	selectorHide: '[data-x-ray-hide]', // Selector for the "hide password" text  (must be a valid CSS selector)
	toggleActiveClass: 'active', // Class added to active password toggle button
	initClass: 'js-x-ray', // Class added to <html> element when initiated
	callback: function ( toggle, pwID ) {} // Function that's run after password visibility is toggled
});
```

### Use X-Ray events in your own scripts

You can also call X-Ray's toggle password event in your own scripts.

#### runToggle()
Toggle password visibility on or off.

```javascript
xray.runToggle(
	toggle, // Node that toggles the password visibility. ex. document.querySelector('[data-x-ray="#pw"]')
	pwID, // The ID or class of the password area(s) to show. ex. '#pw'
	options, // Classes and callbacks. Same options as those passed into the init() function.
	event // Optional, if a DOM event was triggered.
);
```

**Example**

```javascript
var toggle = document.querySelector('[data-x-ray="#pw"]');
xray.runToggle( toggle, '#pw' );
```

#### destroy()
Destroy the current `xray.init()`. This is called automatically during the init function to remove any existing initializations.

```javascript
xray.destroy();
```



## Browser Compatibility

X-Ray works in all modern browsers, and IE 10 and above. You can extend browser support back to IE 9 with the [classList.js polyfill](https://github.com/eligrey/classList.js/).

X-Ray is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, passwords will be masked by default.



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Please apply fixes to both the development and production code. Don't forget to update the version number, and when applicable, the documentation.



## License

The code is available under the [MIT License](LICENSE.md).