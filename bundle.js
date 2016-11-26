/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _smoothScroll = __webpack_require__(1);

	var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

	var _gumshoe = __webpack_require__(2);

	var _gumshoe2 = _interopRequireDefault(_gumshoe);

	var _stickyJs = __webpack_require__(3);

	var _stickyJs2 = _interopRequireDefault(_stickyJs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(5);

	var sticky = new _stickyJs2.default('[data-sticky]');
	_smoothScroll2.default.init({
	  offset: '20px'
	});
	_gumshoe2.default.init({
	  activeClass: 'nav__item--active' });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {(function (root, factory) {
		if ( true ) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory(root)), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if ( typeof exports === 'object' ) {
			module.exports = factory(root);
		} else {
			root.smoothScroll = factory(root);
		}
	})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

		'use strict';

		//
		// Variables
		//

		var smoothScroll = {}; // Object for public APIs
		var supports = 'querySelector' in document && 'addEventListener' in root; // Feature test
		var settings, anchor, toggle, fixedHeader, headerHeight, eventTimeout, animationInterval;

		// Default settings
		var defaults = {
			selector: '[data-scroll]',
			selectorHeader: null,
			speed: 500,
			easing: 'easeInOutCubic',
			offset: 0,
			callback: function () {}
		};


		//
		// Methods
		//

		/**
		 * Merge two or more objects. Returns a new object.
		 * @private
		 * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
		 * @param {Object}   objects  The objects to merge together
		 * @returns {Object}          Merged values of defaults and options
		 */
		var extend = function () {

			// Variables
			var extended = {};
			var deep = false;
			var i = 0;
			var length = arguments.length;

			// Check if a deep merge
			if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
				deep = arguments[0];
				i++;
			}

			// Merge the object into the extended object
			var merge = function (obj) {
				for ( var prop in obj ) {
					if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
						// If deep merge and property is an object, merge properties
						if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
							extended[prop] = extend( true, extended[prop], obj[prop] );
						} else {
							extended[prop] = obj[prop];
						}
					}
				}
			};

			// Loop through each object and conduct a merge
			for ( ; i < length; i++ ) {
				var obj = arguments[i];
				merge(obj);
			}

			return extended;

		};

		/**
		 * Get the height of an element.
		 * @private
		 * @param  {Node} elem The element to get the height of
		 * @return {Number}    The element's height in pixels
		 */
		var getHeight = function ( elem ) {
			return Math.max( elem.scrollHeight, elem.offsetHeight, elem.clientHeight );
		};

		/**
		 * Get the closest matching element up the DOM tree.
		 * @private
		 * @param  {Element} elem     Starting element
		 * @param  {String}  selector Selector to match against (class, ID, data attribute, or tag)
		 * @return {Boolean|Element}  Returns null if not match found
		 */
		var getClosest = function ( elem, selector ) {

			// Variables
			var firstChar = selector.charAt(0);
			var supports = 'classList' in document.documentElement;
			var attribute, value;

			// If selector is a data attribute, split attribute from value
			if ( firstChar === '[' ) {
				selector = selector.substr(1, selector.length - 2);
				attribute = selector.split( '=' );

				if ( attribute.length > 1 ) {
					value = true;
					attribute[1] = attribute[1].replace( /"/g, '' ).replace( /'/g, '' );
				}
			}

			// Get closest match
			for ( ; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode ) {

				// If selector is a class
				if ( firstChar === '.' ) {
					if ( supports ) {
						if ( elem.classList.contains( selector.substr(1) ) ) {
							return elem;
						}
					} else {
						if ( new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test( elem.className ) ) {
							return elem;
						}
					}
				}

				// If selector is an ID
				if ( firstChar === '#' ) {
					if ( elem.id === selector.substr(1) ) {
						return elem;
					}
				}

				// If selector is a data attribute
				if ( firstChar === '[' ) {
					if ( elem.hasAttribute( attribute[0] ) ) {
						if ( value ) {
							if ( elem.getAttribute( attribute[0] ) === attribute[1] ) {
								return elem;
							}
						} else {
							return elem;
						}
					}
				}

				// If selector is a tag
				if ( elem.tagName.toLowerCase() === selector ) {
					return elem;
				}

			}

			return null;

		};

		/**
		 * Escape special characters for use with querySelector
		 * @private
		 * @param {String} id The anchor ID to escape
		 * @author Mathias Bynens
		 * @link https://github.com/mathiasbynens/CSS.escape
		 */
		var escapeCharacters = function ( id ) {

			// Remove leading hash
			if ( id.charAt(0) === '#' ) {
				id = id.substr(1);
			}

			var string = String(id);
			var length = string.length;
			var index = -1;
			var codeUnit;
			var result = '';
			var firstCodeUnit = string.charCodeAt(0);
			while (++index < length) {
				codeUnit = string.charCodeAt(index);
				// Note: there’s no need to special-case astral symbols, surrogate
				// pairs, or lone surrogates.

				// If the character is NULL (U+0000), then throw an
				// `InvalidCharacterError` exception and terminate these steps.
				if (codeUnit === 0x0000) {
					throw new InvalidCharacterError(
						'Invalid character: the input contains U+0000.'
					);
				}

				if (
					// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
					// U+007F, […]
					(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
					// If the character is the first character and is in the range [0-9]
					// (U+0030 to U+0039), […]
					(index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
					// If the character is the second character and is in the range [0-9]
					// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
					(
						index === 1 &&
						codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
						firstCodeUnit === 0x002D
					)
				) {
					// http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
					result += '\\' + codeUnit.toString(16) + ' ';
					continue;
				}

				// If the character is not handled by one of the above rules and is
				// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
				// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
				// U+005A), or [a-z] (U+0061 to U+007A), […]
				if (
					codeUnit >= 0x0080 ||
					codeUnit === 0x002D ||
					codeUnit === 0x005F ||
					codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
					codeUnit >= 0x0041 && codeUnit <= 0x005A ||
					codeUnit >= 0x0061 && codeUnit <= 0x007A
				) {
					// the character itself
					result += string.charAt(index);
					continue;
				}

				// Otherwise, the escaped character.
				// http://dev.w3.org/csswg/cssom/#escape-a-character
				result += '\\' + string.charAt(index);

			}

			return '#' + result;

		};

		/**
		 * Calculate the easing pattern
		 * @private
		 * @link https://gist.github.com/gre/1650294
		 * @param {String} type Easing pattern
		 * @param {Number} time Time animation should take to complete
		 * @returns {Number}
		 */
		var easingPattern = function ( type, time ) {
			var pattern;
			if ( type === 'easeInQuad' ) pattern = time * time; // accelerating from zero velocity
			if ( type === 'easeOutQuad' ) pattern = time * (2 - time); // decelerating to zero velocity
			if ( type === 'easeInOutQuad' ) pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
			if ( type === 'easeInCubic' ) pattern = time * time * time; // accelerating from zero velocity
			if ( type === 'easeOutCubic' ) pattern = (--time) * time * time + 1; // decelerating to zero velocity
			if ( type === 'easeInOutCubic' ) pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
			if ( type === 'easeInQuart' ) pattern = time * time * time * time; // accelerating from zero velocity
			if ( type === 'easeOutQuart' ) pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
			if ( type === 'easeInOutQuart' ) pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
			if ( type === 'easeInQuint' ) pattern = time * time * time * time * time; // accelerating from zero velocity
			if ( type === 'easeOutQuint' ) pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
			if ( type === 'easeInOutQuint' ) pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
			return pattern || time; // no easing, no acceleration
		};

		/**
		 * Calculate how far to scroll
		 * @private
		 * @param {Element} anchor The anchor element to scroll to
		 * @param {Number} headerHeight Height of a fixed header, if any
		 * @param {Number} offset Number of pixels by which to offset scroll
		 * @returns {Number}
		 */
		var getEndLocation = function ( anchor, headerHeight, offset ) {
			var location = 0;
			if (anchor.offsetParent) {
				do {
					location += anchor.offsetTop;
					anchor = anchor.offsetParent;
				} while (anchor);
			}
			location = Math.max(location - headerHeight - offset, 0);
			return Math.min(location, getDocumentHeight() - getViewportHeight());
		};

		/**
		 * Determine the viewport's height
		 * @private
		 * @returns {Number}
		 */
		var getViewportHeight = function() {
			return Math.max( document.documentElement.clientHeight, root.innerHeight || 0 );
		};

		/**
		 * Determine the document's height
		 * @private
		 * @returns {Number}
		 */
		var getDocumentHeight = function () {
			return Math.max(
				document.body.scrollHeight, document.documentElement.scrollHeight,
				document.body.offsetHeight, document.documentElement.offsetHeight,
				document.body.clientHeight, document.documentElement.clientHeight
			);
		};

		/**
		 * Convert data-options attribute into an object of key/value pairs
		 * @private
		 * @param {String} options Link-specific options as a data attribute string
		 * @returns {Object}
		 */
		var getDataOptions = function ( options ) {
			return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse( options );
		};

		/**
		 * Get the height of the fixed header
		 * @private
		 * @param  {Node}   header The header
		 * @return {Number}        The height of the header
		 */
		var getHeaderHeight = function ( header ) {
			return !header ? 0 : ( getHeight( header ) + header.offsetTop );
		};

		/**
		 * Bring the anchored element into focus
		 * @private
		 */
		var adjustFocus = function ( anchor, endLocation, isNum ) {

			// Don't run if scrolling to a number on the page
			if ( isNum ) return;

			// Otherwise, bring anchor element into focus
			anchor.focus();
			if ( document.activeElement.id !== anchor.id ) {
				anchor.setAttribute( 'tabindex', '-1' );
				anchor.focus();
				anchor.style.outline = 'none';
			}
			root.scrollTo( 0 , endLocation );

		};

		/**
		 * Start/stop the scrolling animation
		 * @public
		 * @param {Node|Number} anchor  The element or position to scroll to
		 * @param {Element}     toggle  The element that toggled the scroll event
		 * @param {Object}      options
		 */
		smoothScroll.animateScroll = function ( anchor, toggle, options ) {

			// Options and overrides
			var overrides = getDataOptions( toggle ? toggle.getAttribute('data-options') : null );
			var animateSettings = extend( settings || defaults, options || {}, overrides ); // Merge user options with defaults

			// Selectors and variables
			var isNum = Object.prototype.toString.call( anchor ) === '[object Number]' ? true : false;
			var anchorElem = isNum || !anchor.tagName ? null : anchor;
			if ( !isNum && !anchorElem ) return;
			var startLocation = root.pageYOffset; // Current location on the page
			if ( animateSettings.selectorHeader && !fixedHeader ) {
				// Get the fixed header if not already set
				fixedHeader = document.querySelector( animateSettings.selectorHeader );
			}
			if ( !headerHeight ) {
				// Get the height of a fixed header if one exists and not already set
				headerHeight = getHeaderHeight( fixedHeader );
			}
			var endLocation = isNum ? anchor : getEndLocation( anchorElem, headerHeight, parseInt(animateSettings.offset, 10) ); // Location to scroll to
			var distance = endLocation - startLocation; // distance to travel
			var documentHeight = getDocumentHeight();
			var timeLapsed = 0;
			var percentage, position;

			/**
			 * Stop the scroll animation when it reaches its target (or the bottom/top of page)
			 * @private
			 * @param {Number} position Current position on the page
			 * @param {Number} endLocation Scroll to location
			 * @param {Number} animationInterval How much to scroll on this loop
			 */
			var stopAnimateScroll = function ( position, endLocation, animationInterval ) {
				var currentLocation = root.pageYOffset;
				if ( position == endLocation || currentLocation == endLocation || ( (root.innerHeight + currentLocation) >= documentHeight ) ) {

					// Clear the animation timer
					clearInterval(animationInterval);

					// Bring the anchored element into focus
					adjustFocus( anchor, endLocation, isNum );

					// Run callback after animation complete
					animateSettings.callback( anchor, toggle );

				}
			};

			/**
			 * Loop scrolling animation
			 * @private
			 */
			var loopAnimateScroll = function () {
				timeLapsed += 16;
				percentage = ( timeLapsed / parseInt(animateSettings.speed, 10) );
				percentage = ( percentage > 1 ) ? 1 : percentage;
				position = startLocation + ( distance * easingPattern(animateSettings.easing, percentage) );
				root.scrollTo( 0, Math.floor(position) );
				stopAnimateScroll(position, endLocation, animationInterval);
			};

			/**
			 * Set interval timer
			 * @private
			 */
			var startAnimateScroll = function () {
				clearInterval(animationInterval);
				animationInterval = setInterval(loopAnimateScroll, 16);
			};

			/**
			 * Reset position to fix weird iOS bug
			 * @link https://github.com/cferdinandi/smooth-scroll/issues/45
			 */
			if ( root.pageYOffset === 0 ) {
				root.scrollTo( 0, 0 );
			}

			// Start scrolling animation
			startAnimateScroll();

		};

		/**
		 * Handle has change event
		 * @private
		 */
		var hashChangeHandler = function (event) {

			// Get hash from URL
			var hash = root.location.hash;

			// Only run if there's an anchor element to scroll to
			if ( !anchor ) return;

			// Reset the anchor element's ID
			anchor.id = anchor.getAttribute( 'data-scroll-id' );

			// Scroll to the anchored content
			smoothScroll.animateScroll( anchor, toggle );

			// Reset anchor and toggle
			anchor = null;
			toggle = null;

		};

		/**
		 * If smooth scroll element clicked, animate scroll
		 * @private
		 */
		var clickHandler = function (event) {

			// Don't run if right-click or command/control + click
			if ( event.button !== 0 || event.metaKey || event.ctrlKey ) return;

			// Check if a smooth scroll link was clicked
			toggle = getClosest( event.target, settings.selector );
			if ( !toggle || toggle.tagName.toLowerCase() !== 'a' ) return;

			// Only run if link is an anchor and points to the current page
			if ( toggle.hostname !== root.location.hostname || toggle.pathname !== root.location.pathname || !/#/.test(toggle.href) ) return;

			// Get the sanitized hash
			var hash = escapeCharacters( toggle.hash );

			// If the hash is empty, scroll to the top of the page
			if ( hash === '#' ) {

				// Prevent default link behavior
				event.preventDefault();

				// Set the anchored element
				anchor = document.body;

				// Save or create the ID as a data attribute and remove it (prevents scroll jump)
				var id = anchor.id ? anchor.id : 'smooth-scroll-top';
				anchor.setAttribute( 'data-scroll-id', id );
				anchor.id = '';

				// If no hash change event will happen, fire manually
				// Otherwise, update the hash
				if ( root.location.hash.substring(1) === id ) {
					hashChangeHandler();
				} else {
					root.location.hash = id;
				}

				return;

			}

			// Get the anchored element
			anchor = document.querySelector( hash );

			// If anchored element exists, save the ID as a data attribute and remove it (prevents scroll jump)
			if ( !anchor ) return;
			anchor.setAttribute( 'data-scroll-id', anchor.id );
			anchor.id = '';

			// If no hash change event will happen, fire manually
			if ( toggle.hash === root.location.hash ) {
				event.preventDefault();
				hashChangeHandler();
			}

		};

		/**
		 * On window scroll and resize, only run events at a rate of 15fps for better performance
		 * @private
		 * @param  {Function} eventTimeout Timeout function
		 * @param  {Object} settings
		 */
		var resizeThrottler = function (event) {
			if ( !eventTimeout ) {
				eventTimeout = setTimeout(function() {
					eventTimeout = null; // Reset timeout
					headerHeight = getHeaderHeight( fixedHeader ); // Get the height of a fixed header if one exists
				}, 66);
			}
		};

		/**
		 * Destroy the current initialization.
		 * @public
		 */
		smoothScroll.destroy = function () {

			// If plugin isn't already initialized, stop
			if ( !settings ) return;

			// Remove event listeners
			document.removeEventListener( 'click', clickHandler, false );
			root.removeEventListener( 'resize', resizeThrottler, false );

			// Reset varaibles
			settings = null;
			anchor = null;
			toggle = null;
			fixedHeader = null;
			headerHeight = null;
			eventTimeout = null;
			animationInterval = null;
		};

		/**
		 * Initialize Smooth Scroll
		 * @public
		 * @param {Object} options User settings
		 */
		smoothScroll.init = function ( options ) {

			// feature test
			if ( !supports ) return;

			// Destroy any existing initializations
			smoothScroll.destroy();

			// Selectors and variables
			settings = extend( defaults, options || {} ); // Merge user options with defaults
			fixedHeader = settings.selectorHeader ? document.querySelector( settings.selectorHeader ) : null; // Get the fixed header
			headerHeight = getHeaderHeight( fixedHeader );

			// When a toggle is clicked, run the click handler
			document.addEventListener( 'click', clickHandler, false );

			// Listen for hash changes
			root.addEventListener('hashchange', hashChangeHandler, false);

			// If window is resized and there's a fixed header, recalculate its size
			if ( fixedHeader ) {
				root.addEventListener( 'resize', resizeThrottler, false );
			}

		};


		//
		// Public APIs
		//

		return smoothScroll;

	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {(function (root, factory) {
		if ( true ) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory(root)), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if ( typeof exports === 'object' ) {
			module.exports = factory(root);
		} else {
			root.gumshoe = factory(root);
		}
	})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

		'use strict';

		//
		// Variables
		//

		var gumshoe = {}; // Object for public APIs
		var supports = 'querySelector' in document && 'addEventListener' in root && 'classList' in document.createElement('_'); // Feature test
		var navs = []; // Array for nav elements
		var settings, eventTimeout, docHeight, header, headerHeight, currentNav;

		// Default settings
		var defaults = {
			selector: '[data-gumshoe] a',
			selectorHeader: '[data-gumshoe-header]',
			container: root,
			offset: 0,
			activeClass: 'active',
			callback: function () {}
		};


		//
		// Methods
		//

		/**
		 * A simple forEach() implementation for Arrays, Objects and NodeLists.
		 * @private
		 * @author Todd Motto
		 * @link   https://github.com/toddmotto/foreach
		 * @param {Array|Object|NodeList} collection Collection of items to iterate
		 * @param {Function}              callback   Callback function for each iteration
		 * @param {Array|Object|NodeList} scope      Object/NodeList/Array that forEach is iterating over (aka `this`)
		 */
		var forEach = function ( collection, callback, scope ) {
			if ( Object.prototype.toString.call( collection ) === '[object Object]' ) {
				for ( var prop in collection ) {
					if ( Object.prototype.hasOwnProperty.call( collection, prop ) ) {
						callback.call( scope, collection[prop], prop, collection );
					}
				}
			} else {
				for ( var i = 0, len = collection.length; i < len; i++ ) {
					callback.call( scope, collection[i], i, collection );
				}
			}
		};

		/**
		 * Merge two or more objects. Returns a new object.
		 * @private
		 * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
		 * @param {Object}   objects  The objects to merge together
		 * @returns {Object}          Merged values of defaults and options
		 */
		var extend = function () {

			// Variables
			var extended = {};
			var deep = false;
			var i = 0;
			var length = arguments.length;

			// Check if a deep merge
			if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
				deep = arguments[0];
				i++;
			}

			// Merge the object into the extended object
			var merge = function (obj) {
				for ( var prop in obj ) {
					if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
						// If deep merge and property is an object, merge properties
						if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
							extended[prop] = extend( true, extended[prop], obj[prop] );
						} else {
							extended[prop] = obj[prop];
						}
					}
				}
			};

			// Loop through each object and conduct a merge
			for ( ; i < length; i++ ) {
				var obj = arguments[i];
				merge(obj);
			}

			return extended;

		};

		/**
		 * Get the height of an element.
		 * @private
		 * @param  {Node} elem The element to get the height of
		 * @return {Number}    The element's height in pixels
		 */
		var getHeight = function ( elem ) {
			return Math.max( elem.scrollHeight, elem.offsetHeight, elem.clientHeight );
		};

		/**
		 * Get the document element's height
		 * @private
		 * @returns {Number}
		 */
		var getDocumentHeight = function () {
			return Math.max(
				document.body.scrollHeight, document.documentElement.scrollHeight,
				document.body.offsetHeight, document.documentElement.offsetHeight,
				document.body.clientHeight, document.documentElement.clientHeight
			);
		};

		/**
		 * Get an element's distance from the top of the Document.
		 * @private
		 * @param  {Node} elem The element
		 * @return {Number}    Distance from the top in pixels
		 */
		var getOffsetTop = function ( elem ) {
			var location = 0;
			if (elem.offsetParent) {
				do {
					location += elem.offsetTop;
					elem = elem.offsetParent;
				} while (elem);
			} else {
				location = elem.offsetTop;
			}
			location = location - headerHeight - settings.offset;
			return location >= 0 ? location : 0;
		};

		/**
		 * Determine if an element is in the viewport
		 * @param  {Node}    elem The element
		 * @return {Boolean}      Returns true if element is in the viewport
		 */
		var isInViewport = function ( elem ) {
			var distance = elem.getBoundingClientRect();
			return (
				distance.top >= 0 &&
				distance.left >= 0 &&
				distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				distance.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
		};

		/**
		 * Arrange nagivation elements from furthest from the top to closest
		 * @private
		 */
		var sortNavs = function () {
			navs.sort( function (a, b) {
				if (a.distance > b.distance) {
					return -1;
				}
				if (a.distance < b.distance) {
					return 1;
				}
				return 0;
			});
		};

		/**
		 * Calculate the distance of elements from the top of the document
		 * @public
		 */
		gumshoe.setDistances = function () {

			// Calculate distances
			docHeight = getDocumentHeight(); // The document
			headerHeight = header ? ( getHeight(header) + getOffsetTop(header) ) : 0; // The fixed header
			forEach(navs, function (nav) {
				nav.distance = getOffsetTop(nav.target); // Each navigation target
			});

			// When done, organization navigation elements
			sortNavs();

		};

		/**
		 * Get all navigation elements and store them in an array
		 * @private
		 */
		var getNavs = function () {

			// Get all navigation links
			var navLinks = document.querySelectorAll( settings.selector );

			// For each link, create an object of attributes and push to an array
			forEach( navLinks, function (nav) {
				if ( !nav.hash ) return;
				var target = document.querySelector( nav.hash );
				if ( !target ) return;
				navs.push({
					nav: nav,
					target: target,
					parent: nav.parentNode.tagName.toLowerCase() === 'li' ? nav.parentNode : null,
					distance: 0
				});
			});

		};


		/**
		 * Remove the activation class from the currently active navigation element
		 * @private
		 */
		var deactivateCurrentNav = function () {
			if ( currentNav ) {
				currentNav.nav.classList.remove( settings.activeClass );
				if ( currentNav.parent ) {
					currentNav.parent.classList.remove( settings.activeClass );
				}
			}
		};

		/**
		 * Add the activation class to the currently active navigation element
		 * @private
		 * @param  {Node} nav The currently active nav
		 */
		var activateNav = function ( nav ) {

			// If a current Nav is set, deactivate it
			deactivateCurrentNav();

			// Activate the current target's navigation element
			nav.nav.classList.add( settings.activeClass );
			if ( nav.parent ) {
				nav.parent.classList.add( settings.activeClass );
			}

			settings.callback( nav ); // Callback after methods are run

			// Set new currentNav
			currentNav = {
				nav: nav.nav,
				parent: nav.parent
			};

		};

		/**
		 * Determine which navigation element is currently active and run activation method
		 * @public
		 * @returns {Object} The current nav data.
		 */
		gumshoe.getCurrentNav = function () {

			// Get current position from top of the document
			var position = root.pageYOffset;

			// If at the bottom of the page and last section is in the viewport, activate the last nav
			if ( (root.innerHeight + position) >= docHeight && isInViewport( navs[0].target ) ) {
				activateNav( navs[0] );
				return navs[0];
			}

			// Otherwise, loop through each nav until you find the active one
			for (var i = 0, len = navs.length; i < len; i++) {
				var nav = navs[i];
				if ( nav.distance <= position ) {
					activateNav( nav );
					return nav;
				}
			}

			// If no active nav is found, deactivate the current nav
			deactivateCurrentNav();
			settings.callback();

		};

		/**
		 * If nav element has active class on load, set it as currently active navigation
		 * @private
		 */
		var setInitCurrentNav = function () {
			forEach(navs, function (nav) {
				if ( nav.nav.classList.contains( settings.activeClass ) ) {
					currentNav = {
						nav: nav.nav,
						parent: nav.parent
					};
				}
			});
		};

		/**
		 * Destroy the current initialization.
		 * @public
		 */
		gumshoe.destroy = function () {

			// If plugin isn't already initialized, stop
			if ( !settings ) return;

			// Remove event listeners
			settings.container.removeEventListener('resize', eventThrottler, false);
			settings.container.removeEventListener('scroll', eventThrottler, false);

			// Reset variables
			navs = [];
			settings = null;
			eventTimeout = null;
			docHeight = null;
			header = null;
			headerHeight = null;
			currentNav = null;

		};

		/**
		 * On window scroll and resize, only run events at a rate of 15fps for better performance
		 * @private
		 * @param  {Function} eventTimeout Timeout function
		 * @param  {Object} settings
		 */
		var eventThrottler = function (event) {
			if ( !eventTimeout ) {
				eventTimeout = setTimeout(function() {

					eventTimeout = null; // Reset timeout

					// If scroll event, get currently active nav
					if ( event.type === 'scroll' ) {
						gumshoe.getCurrentNav();
					}

					// If resize event, recalculate distances and then get currently active nav
					if ( event.type === 'resize' ) {
						gumshoe.setDistances();
						gumshoe.getCurrentNav();
					}

				}, 66);
			}
		};

		/**
		 * Initialize Plugin
		 * @public
		 * @param {Object} options User settings
		 */
		gumshoe.init = function ( options ) {

			// feature test
			if ( !supports ) return;

			// Destroy any existing initializations
			gumshoe.destroy();

			// Set variables
			settings = extend( defaults, options || {} ); // Merge user options with defaults
			header = document.querySelector( settings.selectorHeader ); // Get fixed header
			getNavs(); // Get navigation elements

			// If no navigation elements exist, stop running gumshoe
			if ( navs.length === 0 ) return;

			// Run init methods
			setInitCurrentNav();
			gumshoe.setDistances();
			gumshoe.getCurrentNav();

			// Listen for events
			settings.container.addEventListener('resize', eventThrottler, false);
			settings.container.addEventListener('scroll', eventThrottler, false);

		};


		//
		// Public APIs
		//

		return gumshoe;

	});

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	var Sticky = __webpack_require__(4);

	module.exports = Sticky;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Sticky.js
	 * Library for sticky elements written in vanilla javascript. With this library you can easily set sticky elements on your website. It's also responsive.
	 *
	 * @version 1.1.5
	 * @author Rafal Galus <biuro@rafalgalus.pl>
	 * @website https://rgalus.github.io/sticky-js/
	 * @repo https://github.com/rgalus/sticky-js
	 * @license https://github.com/rgalus/sticky-js/blob/master/LICENSE
	 */

	var Sticky = function () {
	  /**
	   * Sticky instance constructor
	   * @constructor
	   * @param {string} selector - Selector which we can find elements
	   * @param {string} options - Global options for sticky elements (could be overwritten by data-{option}="" attributes)
	   */
	  function Sticky() {
	    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, Sticky);

	    this.selector = selector;
	    this.elements = [];

	    this.version = '1.1.5';

	    this.vp = this.getViewportSize();
	    this.scrollTop = this.getScrollTopPosition();

	    this.options = {
	      marginTop: options.marginTop || 0,
	      stickyFor: options.stickFor || 0,
	      stickyClass: options.stickyClass || null
	    };

	    this.run();
	  }

	  /**
	   * Function that waits for page to be fully loaded and then renders & activates every sticky element found with specified selector
	   * @function
	   */


	  Sticky.prototype.run = function run() {
	    var _this = this;

	    // wait for page to be fully loaded
	    var pageLoaded = setInterval(function () {
	      if (document.readyState === 'complete') {
	        clearInterval(pageLoaded);

	        var elements = document.querySelectorAll(_this.selector);
	        _this.forEach(elements, function (element) {
	          return _this.renderElement(element);
	        });
	      }
	    }, 10);
	  };

	  /**
	   * Function that assign needed variables for sticky element, that are used in future for calculations and other
	   * @function
	   * @param {node} element - Element to be rendered
	   */


	  Sticky.prototype.renderElement = function renderElement(element) {
	    var _this2 = this;

	    // create container for variables needed in future
	    element.sticky = {};

	    // set default variables
	    element.sticky.active = false;

	    element.sticky.marginTop = parseInt(element.getAttribute('data-margin-top')) || this.options.marginTop;
	    element.sticky.stickyFor = parseInt(element.getAttribute('data-sticky-for')) || this.options.stickyFor;
	    element.sticky.stickyClass = element.getAttribute('data-sticky-class') || this.options.stickyClass;

	    element.sticky.container = this.getStickyContainer(element);
	    element.sticky.container.rect = this.getRectangle(element.sticky.container);

	    element.sticky.rect = this.getRectangle(element);

	    // fix when element is image that has not yet loaded and width, height = 0
	    if (element.tagName.toLowerCase === 'img') {
	      element.onload = function () {
	        return element.sticky.rect = _this2.getRectangle(element);
	      };
	    }

	    // activate rendered element
	    this.activate(element);
	  };

	  /**
	   * Function that activates element when specified conditions are met and then initalise events
	   * @function
	   * @param {node} element - Element to be activated
	   */


	  Sticky.prototype.activate = function activate(element) {
	    if (element.sticky.rect.top + element.sticky.rect.height < element.sticky.container.rect.top + element.sticky.container.rect.height && element.sticky.stickyFor < this.vp.width && !element.sticky.active) {
	      element.sticky.active = true;
	    }

	    if (this.elements.indexOf(element) < 0) {
	      this.elements.push(element);
	    }

	    if (!element.sticky.resizeEvent) {
	      this.initResizeEvents(element);
	      element.sticky.resizeEvent = true;
	    }

	    if (!element.sticky.scrollEvent) {
	      this.initScrollEvents(element);
	      element.sticky.scrollEvent = true;
	    }

	    this.setPosition(element);
	  };

	  /**
	   * Function which is adding onResizeEvents to window listener and assigns function to element as resizeListener
	   * @function
	   * @param {node} element - Element for which resize events are initialised
	   */


	  Sticky.prototype.initResizeEvents = function initResizeEvents(element) {
	    var _this3 = this;

	    element.sticky.resizeListener = function () {
	      return _this3.onResizeEvents(element);
	    };
	    window.addEventListener('resize', element.sticky.resizeListener);
	  };

	  /**
	   * Function which is fired when user resize window. It checks if element should be activated or deactivated and then run setPosition function
	   * @function
	   * @param {node} element - Element for which event function is fired
	   */


	  Sticky.prototype.onResizeEvents = function onResizeEvents(element) {
	    this.vp = this.getViewportSize();

	    element.sticky.rect = this.getRectangle(element);
	    element.sticky.container.rect = this.getRectangle(element.sticky.container);

	    if (element.sticky.rect.top + element.sticky.rect.height < element.sticky.container.rect.top + element.sticky.container.rect.height && element.sticky.stickyFor < this.vp.width && !element.sticky.active) {
	      element.sticky.active = true;
	    } else if (element.sticky.rect.top + element.sticky.rect.height >= element.sticky.container.rect.top + element.sticky.container.rect.height || element.sticky.stickyFor >= this.vp.width && element.sticky.active) {
	      element.sticky.active = false;
	    }

	    this.setPosition(element);
	  };

	  /**
	   * Function which is adding onScrollEvents to window listener and assigns function to element as scrollListener
	   * @function
	   * @param {node} element - Element for which scroll events are initialised
	   */


	  Sticky.prototype.initScrollEvents = function initScrollEvents(element) {
	    var _this4 = this;

	    element.sticky.scrollListener = function () {
	      return _this4.onScrollEvents(element);
	    };
	    window.addEventListener('scroll', element.sticky.scrollListener);
	  };

	  /**
	   * Function which is fired when user scroll window. If element is active, function is invoking setPosition function
	   * @function
	   * @param {node} element - Element for which event function is fired
	   */


	  Sticky.prototype.onScrollEvents = function onScrollEvents(element) {
	    this.scrollTop = this.getScrollTopPosition();

	    if (element.sticky.active) {
	      this.setPosition(element);
	    }
	  };

	  /**
	   * Main function for the library. Here are some condition calculations and css appending for sticky element when user scroll window
	   * @function
	   * @param {node} element - Element that will be positioned if it's active
	   */


	  Sticky.prototype.setPosition = function setPosition(element) {
	    this.css(element, { position: '', width: '', top: '', left: '' });

	    if (this.vp.height < element.sticky.rect.height || !element.sticky.active) {
	      return;
	    }

	    if (!element.sticky.rect.width) {
	      element.sticky.rect = this.getRectangle(element);
	    }

	    if (element.sticky.rect.top === 0 && element.sticky.container === document.querySelector('body')) {
	      this.css(element, {
	        position: 'fixed',
	        top: element.sticky.rect.top + 'px',
	        left: element.sticky.rect.left + 'px',
	        width: element.sticky.rect.width + 'px'
	      });
	    } else if (this.scrollTop > element.sticky.rect.top - element.sticky.marginTop) {
	      this.css(element, {
	        position: 'fixed',
	        width: element.sticky.rect.width + 'px',
	        left: element.sticky.rect.left + 'px'
	      });

	      if (this.scrollTop + element.sticky.rect.height + element.sticky.marginTop > element.sticky.container.rect.top + element.sticky.container.offsetHeight) {

	        if (element.sticky.stickyClass) element.classList.remove(element.sticky.stickyClass);

	        this.css(element, {
	          top: element.sticky.container.rect.top + element.sticky.container.offsetHeight - (this.scrollTop + element.sticky.rect.height) + 'px' });
	      } else {
	        if (element.sticky.stickyClass) element.classList.add(element.sticky.stickyClass);

	        this.css(element, { top: element.sticky.marginTop + 'px' });
	      }
	    } else {
	      if (element.sticky.stickyClass) element.classList.remove(element.sticky.stickyClass);

	      this.css(element, { position: '', width: '', top: '', left: '' });
	    }
	  };

	  /**
	   * Function that updates element sticky rectangle (with sticky container), then activate or deactivate element, then update position if it's active
	   * @function
	   */


	  Sticky.prototype.update = function update() {
	    var _this5 = this;

	    this.forEach(this.elements, function (element) {
	      element.sticky.rect = _this5.getRectangle(element);
	      element.sticky.container.rect = _this5.getRectangle(element.sticky.container);

	      _this5.activate(element);
	      _this5.setPosition(element);
	    });
	  };

	  /**
	   * Function that returns container element in which sticky element is stuck (if is not specified, then it's stuck to body)
	   * @function
	   * @param {node} element - Element which sticky container are looked for
	   * @return {node} element - Sticky container
	   */


	  Sticky.prototype.getStickyContainer = function getStickyContainer(element) {
	    var container = element;

	    while (!container.hasAttribute('data-sticky-container') && container !== document.querySelector('body')) {
	      container = container.parentNode;
	    }

	    return container;
	  };

	  /**
	   * Function that returns element rectangle & position (width, height, top, left)
	   * @function
	   * @param {node} element - Element which position & rectangle are returned
	   * @return {object}
	   */


	  Sticky.prototype.getRectangle = function getRectangle(element) {
	    this.css(element, { position: '', width: '', top: '', left: '' });

	    var width = Math.max(element.offsetWidth, element.clientWidth, element.scrollWidth);
	    var height = Math.max(element.offsetHeight, element.clientHeight, element.scrollHeight);

	    var top = 0;
	    var left = 0;

	    do {
	      top += element.offsetTop || 0;
	      left += element.offsetLeft || 0;
	      element = element.offsetParent;
	    } while (element);

	    return { top: top, left: left, width: width, height: height };
	  };

	  /**
	   * Function that returns viewport dimensions
	   * @function
	   * @return {object}
	   */


	  Sticky.prototype.getViewportSize = function getViewportSize() {
	    return {
	      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
	      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	    };
	  };

	  /**
	   * Function that returns scroll position offset from top
	   * @function
	   * @return {number}
	   */


	  Sticky.prototype.getScrollTopPosition = function getScrollTopPosition() {
	    return (window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0;
	  };

	  /**
	   * Helper function for loops
	   * @helper
	   * @param {array}
	   * @param {function} callback - Callback function (no need for explanation)
	   */


	  Sticky.prototype.forEach = function forEach(array, callback) {
	    for (var i = 0, len = array.length; i < len; i++) {
	      callback(array[i]);
	    }
	  };

	  /**
	   * Helper function to add/remove css properties for specified element.
	   * @helper
	   * @param {node} element - DOM element
	   * @param {object} properties - CSS properties that will be added/removed from specified element
	   */


	  Sticky.prototype.css = function css(element, properties) {
	    for (var property in properties) {
	      if (properties.hasOwnProperty(property)) {
	        element.style[property] = properties[property];
	      }
	    }
	  };

	  return Sticky;
	}();

	/**
	 * Export function that supports AMD, CommonJS and Plain Browser.
	 */


	(function (root, factory) {
	  if (true) {
	    module.exports = factory;
	  } else if (typeof define === 'function' && define.amd) {
	    define([], factory);
	  } else {
	    root.Sticky = factory;
	  }
	})(this, Sticky);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./styles.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./styles.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "h1, h2, h3 {\n  font-family: 'Oswald';\n}\n\nh1 {\n  font-size: 2.8rem;\n}\n\nh2 {\n  color: #36227f;\n  font-size: 2.5rem;\n}\n\nh3 {\n  font-size: 2.3rem;\n}\n\np, li, a {\n  font-family: 'Roboto Condensed';\n}\n\nimg {\n  max-width: 100%;\n}\n\n.container {\n  padding-top: 2rem;\n}\n\n.columns {\n  min-height: 1px;\n}\n\n.header__image {\n  border-radius: 50%;\n  display: block;\n  margin:  0 auto 2rem;\n  width: 150px;\n}\n\n.nav {\n\n}\n\n.nav__list {\n  list-style-type: none;\n}\n\n.nav__item {\n  margin-bottom: 0.5rem;\n}\n\n.nav__link {\n  color: black;\n  display: block;\n  font-size: 2rem;\n  text-decoration: none;\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  padding: 0.5rem 1rem;\n}\n\n\n.nav__link:hover, .nav__link:focus, .nav__link:active {\n  background: rgb(227, 224, 237);\n  color: black;\n}\n\n.nav__item--active .nav__link {\n  background: #36227f;\n  color: white;\n}\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);