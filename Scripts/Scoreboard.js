// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.Scoreboard = function(game) {

        var _privateStuff = [];
        var _scoreToText = ["", "15", "30", "40"];

        _privateStuff[this] = {
            game: game
        };

        this.getPlayer1Score = function() {
            var score1 = _privateStuff[this].game.getPlayer1Score();
            var score2 = _privateStuff[this].game.getPlayer2Score();
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

        this.getPlayer2Score = function() {
            var score1 = _privateStuff[this].game.getPlayer1Score();
            var score2 = _privateStuff[this].game.getPlayer2Score();
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
    };
} ());
