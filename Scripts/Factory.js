(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.factory = (function() {

        var _createPlayer = function(name) {
            return window.tennisKata.player(name);
        };

        var _createGame = function(player1, player2) {
            return window.tennisKata.game(player1, player2);
        };

        var _createScoreboard = function(game) {
            return window.tennisKata.scoreboard(game);
        };

        var _createController = function() {
            return window.tennisKata.controller();
        };

        var _createScorecard = function (player1, player2) {
            return window.tennisKata.scorecard(player1, player2);
        };

        return {
            createPlayer: _createPlayer,
            createGame: _createGame,
            createScoreboard: _createScoreboard,
            createController: _createController,
            createScorecard: _createScorecard
        };
    }());
} ());
