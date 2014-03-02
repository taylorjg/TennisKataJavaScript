(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.factory = (function() {

        var _createPlayer = function(name) {
            return window.tennisKata.player(name);
        };

        var _createController = function() {
            return window.tennisKata.controller();
        };

        return {
            createPlayer: _createPlayer,
            createController: _createController
        };
    }());
} ());
