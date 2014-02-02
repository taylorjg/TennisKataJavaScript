(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.player = function(name) {

        var _name = name;

        var _getName = function() {
            return _name;
        };

        return {
            getName: _getName
        };
    };
} ());
