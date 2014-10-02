# X-Ray [![Build Status](https://travis-ci.org/cferdinandi/x-ray.svg)](https://travis-ci.org/cferdinandi/x-ray)
A script that lets users toggle password visibility in forms.

[Download X-Ray](https://github.com/cferdinandi/x-ray/archive/master.zip) / [View the demo](http://cferdinandi.github.io/x-ray/).

**In This Documentation**

1. [Getting Started](#getting-started)
2. [Installing with Package Managers](#installing-with-package-managers)
3. [Options & Settings](#options-and-settings)
4. [Browser Compatibility](#browser-compatibility)
5. [How to Contribute](#how-to-contribute)
6. [License](#license)
7. [Changelog](#changelog)
8. [Older Docs](#older-docs)



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code. Unit tests are located in the `test` directory.

### 1. Include X-Ray on your site.

```html
<link rel="stylesheet" href="dist/css/x-ray-css.css">
<script src="dist/js/classList.js"></script>
<script src="dist/js/bind-polyfill.js"></script>
<script src="dist/js/x-ray.js"></script>
```

X-Ray is [built with Sass](http://sass-lang.com/) for easy customization. If you don't use Sass, that's ok. The `css` folder contains compiled vanilla CSS.

The `_config.scss` and `_mixins.scss` files are the same ones used in [Kraken](http://cferdinandi.github.io/kraken/), so you can drop the `_x-ray.css` file right into Kraken without making any updates. Or, adjust the variables to suit your own project.

X-Ray also requires [classList.js](https://github.com/eligrey/classList.js) and `bind-polyfill.js`, polyfills that extend ECMAScript 5 API support to more browsers.

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

Turn any link or button into a password visibility toggle by adding the `.x-ray` class and `[data-x-ray]` data attribute. The `[data-x-ray]` attribute should match the ID of the target password field. If you would like passwords to be visible by default, set the optional `[data-default]` attribute to `show`.

Use `<span>` elements with the `.x-ray-show` class and `[data-x-ray-show]` data attribute or `.x-ray-hide` class and `[data-x-ray-hide]` data attribute to change the toggle element based on whether or not the password is visible.

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



## Options and Settings

X-Ray includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into X-Ray through the `init()` function:

```javascript
xray.init({
	toggleActiveClass: 'active', // Class added to active password toggle button
	initClass: 'js-x-ray', // Class added to <html> element when initiated
	callbackBefore: function ( toggle, pwID ) {}, // Function that's run before password visibility is toggled
	callbackAfter: function ( toggle, pwID ) {} // Function that's run after password visibility is toggled
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
Destroy the current `xray.init()`.

```javascript
xray.destroy();
```



## Browser Compatibility

X-Ray works in all modern browsers, and IE 9 and above.

X-Ray is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, passwords will be masked by default.



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Don't forget to update the version number, the changelog (in the `readme.md` file), and when applicable, the documentation.



## License

X-Ray is licensed under the [MIT License](http://gomakethings.com/mit/).



## Changelog

X-Ray uses [semantic versioning](http://semver.org/).

* v4.5.0 - October 1, 2014
	* Added support for checkboxes.
* v4.4.1 - August 31, 2014
	* Fixed event listener filter to account for sub elements.
* v4.4.0 - August 23, 2014
	* Switched to Ruby Sass.
	* Fixed unit test paths.
	* Switched to event bubbling.
* v4.3.2 - August 15, 2014
	* Added fix for UMD structure.
* v4.3.1 - August 8, 2014
	* Added polyfill for `Functions.prototype.bind`.
	* Removed Sass paths from `gulpfile.js`.
* v4.3.0 - June 30, 2014
	* Updated unit tests.
	* Added `destroy()` method.
* v4.2.1 - June 28, 2014
	* Fixed `extend()` method.
* v4.2.0 - June 23, 2014
	* Converted to gulp.js workflow.
	* Added unit testing.
	* Updated naming conventions.
	* Removed unused `_config.scss` and `_mixins.scss` files.
	* Added minified versions of files.
* v4.1.1 - June 19, 2014
	* Fixed factory/root/UMD definition.
* v4.1.0 - June 9, 2014
	* Converted to UMD module.
	* Replaced Buoy with `classList.js` polyfill.
	* Moved public APIs to exports variable.
	* Improved feature test.
	* Replaced `Array.prototype.forEach` hack with proper `forEach` function.
	* General code optimizations for better minification and performance.
	* Updated to JSDoc documentation (sort of).
	* Updated to three number versioning system.
	* Added package manager installation info.
* v4.0 - April 4, 2014
	* Converted from Buoy class helpers to `classList` with polyfill.
* v3.2 - March 19, 2014
	* Passed arguments into callback functions.
* v3.1 - February 27, 2014
	* Converted `_defaults` to a literal object
* v3.0 - February 25, 2014
	* Better public/private method namespacing.
	* Require `init()` call to run.
	* New API exposes additional methods for use in your own scripts.
	* Better documentation.
* v2.1 - February 4, 2014
	* Reverted to `Array.prototype.foreach` loop.
* v2.0 - January 28, 2014
	* Switched to a data attribute for the toggle selector (separates scripts from styles).
	* Added namespacing to IIFE.
	* Moved feature test to script itself for better progressive enhancement.
	* Updated looping method.
* v1.1 - January 24, 2014
	* Made `.x-ray-show` and `.x-ray-hide` optional.
* v1.0 - January 24, 2014
	* Initial release.



## Older Docs

* [Version 3](https://github.com/cferdinandi/x-ray/tree/archive-v3)
* [Version 2](http://cferdinandi.github.io/x-ray/archive/v2/)