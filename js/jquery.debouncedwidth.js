/*!
 *
 * jquery-debouncedwidth
 * https://github.com/janrembold/jquery-debouncedwidth
 * Copyright (c) 2015 Jan Rembold <janrembold@gmail.com>; License: MIT
 *
 * */

(function($) {
    'use strict';

    var timeout;
    var $window = $(window);
    var lastWidth = 0;
    var elements = [];
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    var rAF = window.requestAnimationFrame;

    // setup local requestAnimationFrame polyfill
    for(var x = 0; x < vendors.length && !rAF; ++x) {
        rAF = window[vendors[x]+'RequestAnimationFrame'];
    }

    if(!rAF) {
        rAF = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    // use timeouts to debounce resize event
    var debouncer = function(){
        clearTimeout(timeout);
        timeout = setTimeout( function(){

            // check if width really changed
            var currentWidth = $window.width();
            if(currentWidth !== lastWidth) {
                // set current width to last seen width
                lastWidth = currentWidth;

                // trigger debouncedwidth event for all elements
                var index = elements.length;

                // use requestAnimationFrame to prevent wrong trigger timings
                rAF(function () {
                    while(index--) {
                      elements[index].dispatchEvent(new Event('debouncedwidth'));
                    }
                });
            }

        }, $.event.special.debouncedwidth.threshold);

    };

    $.event.special.debouncedwidth = {
        setup: function(){
            // start resize event only once
            if(elements.length === 0) {
                lastWidth = $window.width();
                $(this).on('resize.debouncedwidth', debouncer);
            }

            // push new elements to internal array
            if($.inArray(this, elements) === -1) {
                elements.push(this);
            }
        },

        teardown: function(){
            // remove element from internal array
            var index = $.inArray(this, elements);
            if(index > -1) {
                elements.splice(index, 1);
            }

            // clean up, if nothing is left to listen to
            if(elements.length === 0) {
                $(this).off('resize.debouncedwidth');
            }
        },

        threshold: 150
    };

})(window.jQuery);
