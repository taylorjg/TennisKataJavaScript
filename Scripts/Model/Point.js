/**
 * Created by jonathantaylor on 23/02/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.model = window.tennisKata.model || {};

    window.tennisKata.model.point = function(server, winner) {

        var _server = server;
        var _winner = winner;

        var _getServer = function() {
            return _server;
        };

        var _getPointWinner = function() {
            return _winner;
        };

        return {
            getServer: _getServer,
            getPointWinner: _getPointWinner
        };
    };
}());
