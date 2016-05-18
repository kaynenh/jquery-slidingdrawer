// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variables rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var slidingDrawer = "slidingDrawer",
			defaults = {
				openSpeed: "1000",
				title: "Subscribe",
				innerContent: "<p>Stay updated with our Newsletter!</p>",
				useLocalStorage: true
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;

			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = slidingDrawer;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {

				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example below
				//this.yourOtherFunction( "jQuery Boilerplate" );

				var hasScrolled = false;
				var alreadyShown = false;

				if (localStorage.getItem("popState") === "shown" && this.settings.useLocalStorage === true) {
					alreadyShown = true;
				} else {
					$(this.element).after("<div id=\"drawer\"><div class=\"drawer-body\"><button type=\"button\" class=\"close\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button><h3>" + this.settings.title + "</h3>" + this.settings.innerContent + "</div></div>");

					//@todo: remove hardcoded speed and height/width
					$(window).on("mousewheel DOMMouseScroll", function (e) {

						var direction = (function () {

							var delta = (e.type === "DOMMouseScroll" ?
							e.originalEvent.detail * -40 :
								e.originalEvent.wheelDelta);

							return delta > 0 ? 0 : 1;
						}());

						if (direction === 1) {
							if (!hasScrolled && !alreadyShown) {
								$("#drawer")
									.animate({
										bottom: 0,
									}, 1000, function () {
										//Animation complete
									});
								hasScrolled = true;
								localStorage.setItem("popState", "shown");
							}
						}
						if (direction === 0) {
							// scroll up
						}
					});

					$("#drawer .close").on("click", function () {
						$("#drawer")
							.animate({
								bottom: "-300px",
							}, 500, function () {
								//Animation complete
							});
					});
				}
			},
			yourOtherFunction: function( text ) {

				// some logic
				$( this.element ).text( text );
			}
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ slidingDrawer ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + slidingDrawer ) ) {
					$.data( this, "plugin_" +
						slidingDrawer, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
