(function($) {
    'use strict';

    var $event = $.event,
        $special,
        resizeTimeout,
        lastWidth;

    $special = $event.special.debouncedwidth = {

        setup: function() {
            // save last viewport width
            lastWidth = $special.width();

            // attach resize handler
            $(this).on('resize', $special.handler);
        },

        teardown: function() {
            // remove resize handler
            $(this).off('resize');
        },

        handler: function(event) {
            // save context and arguments
            var context = this,
                args = arguments;

            // clear and re-set resize timeout
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout( function(){
                $special.dispatcher(event, context, args);
            }, $special.threshold);
        },

        dispatcher: function(event, context, args){
            var newWidth = $special.width();
            if(newWidth !== lastWidth) {
                lastWidth = newWidth;

                // set correct event type
                event.type = 'debouncedwidth';
                $event.dispatch.apply( context, args );
            }
        },

        width: function(){
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        },

        threshold: 150

    };

})(window.jQuery || window.Zepto || window.ender);