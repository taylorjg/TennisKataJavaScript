(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.factory = (function() {

        var _createPlayer = function(name) {
            return window.tennisKata.player(name);
        };

        var _createScoreboard = function(scorecard) {
            return window.tennisKata.scoreboard(scorecard);
        };

        var _createScoreSummary = function(scorecard) {
            return window.tennisKata.scoreSummary(scorecard);
        };

        var _createController = function() {
            return window.tennisKata.controller();
        };

        var _createScorecard = function (player1, player2) {
            return window.tennisKata.scorecard(player1, player2);
        };

        var _createScoreSummaryFormatter = function () {
            return window.tennisKata.scoreSummaryFormatter();
        };

        return {
            createPlayer: _createPlayer,
            createScorecard: _createScorecard,
            createScoreboard: _createScoreboard,
            createScoreSummary: _createScoreSummary,
            createController: _createController,
            createScoreSummaryFormatter: _createScoreSummaryFormatter
        };
    }());
} ());
