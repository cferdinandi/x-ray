# X-Ray
A script that lets users toggle password visibility in forms. [View the demo](http://cferdinandi.github.io/x-ray/).

**In This Documentation**

1. [Getting Started](#getting-started)
2. [Options & Settings](#options-and-settings)
3. [Browser Compatibility](#browser-compatibility)
4. [License](#license)
5. [Changelog](#changelog)
6. [Older Docs](#older-docs)



## Getting Started

### 1. Include X-Ray on your site.

```html
<link rel="stylesheet" href="css/x-ray-css.css">
<script src="js/x-ray.js"></script>
<script src="buoy.js"></script>
```

X-Ray is [built with Sass](http://sass-lang.com/) for easy customization. If you don't use Sass, that's ok. The `css` folder contains compiled vanilla CSS.

The `_config.scss` and `_mixins.scss` files are the same ones used in [Kraken](http://cferdinandi.github.io/kraken/), so you can drop the `_x-ray.css` file right into Kraken without making any updates. Or, adjust the variables to suit your own project.

X-Ray also requires [Buoy](http://cferdinandi.github.io/buoy/), a vanilla JS micro-library that contains simple helper functions used by X-Ray.

### 2. Add the markup to your HTML.

```html
<form>
	<div>
		<label>Password</label>
		<input id="pw" type="password">
	</div>
	<div>
		<button class="x-ray" data-x-ray data-target="#pw" data-default="show">
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



## Options and Settings

X-Ray includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into X-Ray through the `init()` function:

```javascript
xray.init({
	toggleActiveClass: 'active', // Class added to active password toggle button
	initClass: 'js-x-ray', // Class added to <html> element when initiated
	callbackBefore: function () {}, // Function that's run before password visibility is toggled
	callbackAfter: function () {} // Function that's run after password visibility is toggled
});
```

### Use X-Ray events in your own scripts

You can also call X-Ray's toggle password event in your own scripts:

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



## Browser Compatibility

X-Ray works in all modern browsers, and IE 9 and above.

X-Ray is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, passwords will be masked by default.



## License
X-Ray is licensed under the [MIT License](http://gomakethings.com/mit/).



## Changelog
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

* [Version 2](http://cferdinandi.github.io/x-ray/archive/v2/)