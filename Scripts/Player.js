// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.Player = function(name) {

        var _privateStuff = [];

        _privateStuff[this] = {
            name: name
        };

        this.getName = function() {
            return _privateStuff[this].name;
        }
    };
} ());
