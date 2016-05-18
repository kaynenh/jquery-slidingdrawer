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
	<link rel="stylesheet" href="../dist/jquery.slidingdrawer.css">
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
		$( "#drawer" ).slidingDrawer( {
			openSpeed: '1000'
		} );
	} );
	```

## License

[MIT License](http://mit-license.org/) © Kaynen Heikkinen
