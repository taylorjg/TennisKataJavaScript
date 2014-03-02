/**
 * Created by jonathantaylor on 23/02/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.model = window.tennisKata.model || {};

    window.tennisKata.model.point = function(pointWinner) {

        var _pointWinner = pointWinner;

        var _getPointWinner = function() {
            return _pointWinner;
        };

        return {
            getPointWinner: _getPointWinner,
            extendedProperties: {}
        };
    };
}());
