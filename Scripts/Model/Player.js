(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.model = window.tennisKata.model || {};

    window.tennisKata.model.player = function(name) {

        var _name = name;

        var _getName = function() {
            return _name;
        };

        return {
            getName: _getName
        };
    };
} ());
