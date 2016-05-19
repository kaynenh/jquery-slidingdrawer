Date.prototype.addHours= function(h){
	this.setHours(this.getHours()+h);
	return this;
}
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
				openSpeed: "1000", //speed of drawer opening
				drawerHeight: "320", //if changing, edit jquery.slidingdrawer.css (height of drawer + any padding on drawer)
				drawerWidth: "325", //if changing, edit jquery.slidingdrawer.css
				title: "Subscribe", //Title in drawer. Overridden if appendDrawer is false.
				innerContent: "<p>Stay updated with our Newsletter!</p>", //Inner Content of drawer. HTML is allowed. Overridden if appendDrawer is false.
				useLocalStorage: true, //Adds a local storage variable to track if drawer has already been opened. Set false to always show the drawer. Probably only useful for testing.
				appendDrawer: true, //Use js to append the drawer div. Set to false if you need to add div manually.
				showAgainAfter: 2160, //How long in hours before the popup should display again. Defaults to 90 days.
				disable: false //Disable the drawer completely. Useful for not showing after a person is registered, etc.
			};

		// The actual plugin constructor
		function SlidingDrawerPlugin ( element, options ) {
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
		$.extend( SlidingDrawerPlugin.prototype, {
			init: function() {

				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example below
				// this.yourOtherFunction( "jQuery Boilerplate" );

				var hasScrolled = false,
					alreadyShown = false,
					nextShowDate = new Date(),
					nowDate = new Date(),
					thisDrawer = this;

				//Get the date to check against by adding original date and showAgainAfter
				nextShowDate.setTime(localStorage.getItem("shownDate"));
				nextShowDate.addHours(this.settings.showAgainAfter);
				var dateExpired = (nowDate.getTime() > nextShowDate.getTime());

				/*
				 * Useful console logs for dates if you need them
				 *
				console.log(nowDate);
				console.log(nextShowDate);
				console.log(dateExpired);
				console.log(localStorage.getItem("shownDate"));
				console.log(this.settings.disable);*/

				if ((localStorage.getItem("popState") === "shown" && this.settings.useLocalStorage === true && !dateExpired) || this.settings.disable === true) {
					alreadyShown = true; //Don't show the drawer
				} else {

					//If we are planning to show the drawer and it isn't already added to the page, add it
					if (this.settings.appendDrawer) {
						$(this.element).after("<div id=\"drawer\"><div class=\"drawer-body\"><button type=\"button\" class=\"close\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button><h3>" + this.settings.title + "</h3>" + this.settings.innerContent + "</div></div>");
					}

					//Add a window scroll function and check which direction. If scrolling down, show. If up, don't show.
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
									}, thisDrawer.settings.openSpeed, function () {
										//Animation complete
									});
								hasScrolled = true;
								localStorage.setItem("popState", "shown");
								localStorage.setItem("shownDate", Date.now());
							}
						}
						if (direction === 0) {
							// scroll up
						}
					});

					$("#drawer .close").on("click", function () {
						$("#drawer")
							.animate({
								bottom: "-"+thisDrawer.settings.drawerHeight+"px",
							}, thisDrawer.settings.openSpeed, function () {
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
						slidingDrawer, new SlidingDrawerPlugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
