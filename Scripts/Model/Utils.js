/**
 * Created by jonathantaylor on 23/02/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.model = window.tennisKata.model || {};
    window.tennisKata.model.utils = window.tennisKata.model.utils || {};

    window.tennisKata.model.utils.partition = function(elems, getWinner) {

        var xs1 = [];
        var xs2 = [];

        for (var i = 0; i < elems.length; i++) {
            var elem = elems[i];
            var elemWinner = getWinner(elem);
            if (elemWinner) {
                if (xs1.length) {
                    var xs1Winner = getWinner(xs1[0]);
                    if (elemWinner === xs1Winner) {
                        xs1.push(elem);
                    }
                    else {
                        xs2.push(elem);
                    }
                }
                else {
                    xs1.push(elem);
                }
            }
        }

        return [xs1, xs2];
    };
}());
