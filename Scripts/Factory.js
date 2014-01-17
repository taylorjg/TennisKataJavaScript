(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.factory = (function() {

        var _createPlayer = function(name) {
            return new window.tennisKata.Player(name);
        };

        var _createGame = function(player1, player2) {
            return new window.tennisKata.Game(player1, player2);
        };

        var _createScoreboard = function(game) {
            return new window.tennisKata.Scoreboard(game);
        };

        var _createController = function() {
            return new window.tennisKata.Controller();
        };

        return {
            createPlayer: _createPlayer,
            createGame: _createGame,
            createScoreboard: _createScoreboard,
            createController: _createController
        };
    }());
} ());
