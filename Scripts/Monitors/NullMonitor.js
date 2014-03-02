/**
 * Created by jonathantaylor on 02/03/2014.
 */

(function() {

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.monitors = window.tennisKata.monitors || {};

    window.tennisKata.monitors.nullMonitor = function() {
        return {
            onPointWon: function() {},
            onGameWon: function() {},
            onSetWon: function() {},
            onMatchWon: function() {},
            onNewPoint: function() {},
            onNewGame: function() {},
            onNewSet: function() {},
            init: function() {},
            reset: function() {}
        };
    };
}());
