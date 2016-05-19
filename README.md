# jQuery Sliding Drawer

### A simple jquery drawer slider

This plugin is a simple sliding drawer that can show any html content. Typically seen with chat windows. Currently in development. Use at your own risk.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.slidingdrawer.min.js"></script>
	<link rel="stylesheet" href="dist/jquery.slidingdrawer.css">
	```

3. Add HTML after the footer:

	```html
	<div id="drawer">
		<div class="drawer-body">
			<button type="button" class="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
			Any HTML code
		</div>
	</div>
	```

4. Call the plugin:

	```javascript
	$( function() {
		$( "body > footer" ).slidingDrawer( {
			openSpeed: "1000", //speed of drawer opening
			drawerHeight: "320", //if changing, edit jquery.slidingdrawer.css (height of drawer + any padding on drawer)
			drawerWidth: "325", //if changing, edit jquery.slidingdrawer.css
			title: "Subscribe", //Title in drawer. Overridden if appendDrawer is false.
			innerContent: "<p>Stay updated with our Newsletter!</p>", //Inner Content of drawer. HTML is allowed. Overridden if appendDrawer is false.
			useLocalStorage: true, //Adds a local storage variable to track if drawer has already been opened. Set false to always show the drawer. Probably only useful for testing.
			appendDrawer: true, //Use js to append the drawer div. Set to false if you need to add div manually.
			showAgainAfter: 2160, //How long in hours before the popup should display again. Defaults to 90 days.
			disable: false //Disable the drawer completely. Useful for not showing after a person is registered, etc.
		} );
	} );
	```

The appearance of the drawer can be modified in /dist/jquery.slidingdrawer.css. The width and heights of the drawer are currently hardcoded in the js.

## License

[MIT License](http://mit-license.org/) © Kaynen Heikkinen
