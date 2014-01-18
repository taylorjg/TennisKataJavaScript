(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    var _nextId = 0;

    window.tennisKata.player = function(name) {

        var _name = name;
        var _id = _nextId++;

        var _getId = function() {
            return _id;
        };

        var _getName = function() {
            return _name;
        };

        return {
            getId: _getId,
            getName: _getName
        };
    };
} ());
