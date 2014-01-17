(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.scoreboard = function(game) {

        var _game = game;
        var _scoreToText = ["", "15", "30", "40"];

        var _getPlayer1Score = function() {
            var score1 = _game.getPlayer1Score();
            var score2 = _game.getPlayer2Score();
            if (score1 >= 4 && score1 - score2 >= 2) {
                return "W";
            }
            if (score2 >= 4 && score2 - score1 >= 2) {
                return "L";
            }
            if (score1 + score2 >= 6) {
                return score1 === score2 + 1 ? "A" : "40";
            }
            return _scoreToText[score1];
        };

        var _getPlayer2Score = function() {
            var score1 = _game.getPlayer1Score();
            var score2 = _game.getPlayer2Score();
            if (score2 >= 4 && score2 - score1 >= 2) {
                return "W";
            }
            if (score1 >= 4 && score1 - score2 >= 2) {
                return "L";
            }
            if (score1 + score2 >= 6) {
                return score2 === score1 + 1 ? "A" : "40";
            }
            return _scoreToText[score2];
        };

        return {
            getPlayer1Score: _getPlayer1Score,
            getPlayer2Score: _getPlayer2Score
        };
    };
} ());
