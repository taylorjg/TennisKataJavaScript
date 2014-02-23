/**
 * Created by jonathantaylor on 23/02/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.model = window.tennisKata.model || {};
    window.tennisKata.model.utils = window.tennisKata.model.utils || {};

    window.tennisKata.model.utils.partition = function(arr, fn) {

        var x1 = [];
        var x2 = [];

        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            var fnOfItem = fn(item);
            if (!fnOfItem) {
                break;
            }
            if (x1.length) {
                if (fnOfItem === fn(x1[0])) {
                    x1.push(item);
                }
                else {
                    x2.push(item);
                }
            }
            else {
                x1.push(item);
            }
        }

        return [x1, x2];
    };
}());
