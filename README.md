# jquery-debouncedwidth
The debouncedwidth event combines two performance critical features:
* Reducing the amount of fired resize events
* Disable resize events for height changes

The second feature is especially useful to ignore height changes in mobile browsers
when the address bar hides or shows up while scrolling.

## Usage, Demo
Just include `jquery.debouncedwidth.min.js` after jQuery and use the `debouncedwidth` 
event as a substitute for the ordinary `resize` event.

```javascript
$(window).on('debouncedwidth', function(){
  // your code
});
```

To see a simple demo and comparison between the `debouncedwidth` and `resize` event 
open [demo/index.html](demo/index.html) in your browser and start resizing (width and height) to see it in action.
 
## Options
You can modify the threshold value globally once the script has been loaded:
```javascript
// default value in ms: 150
$.event.special.debouncedwidth.threshold = 250;
```

## License
* Author: Jan Rembold - Inspired by [louisremi/jquery-smartresize](https://github.com/louisremi/jquery-smartresize)
* License: MIT