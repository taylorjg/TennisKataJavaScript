// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.Player = function() {
    };

    window.tennisKata.Game = function() {

        this.player1Score = 0;
        this.player2Score = 0;

        this.getPlayer1Score = function() {
            return this.player1Score;
        };

        this.getPlayer2Score = function() {
            return this.player2Score;
        };

        this.pointScoredByPlayer1 = function() {
            this.player1Score = this.player1Score + 1;
        };

        this.pointScoredByPlayer2 = function() {
            this.player2Score = this.player2Score + 1;
        };
    };

    window.tennisKata.Scoreboard = function(game) {

        var scoreToText = ["", "15", "30", "40"];

        this.game = game;

        this.getPlayer1Score = function() {
            var score1 = game.getPlayer1Score();
            var score2 = game.getPlayer2Score();
            if (score1 >= 4 && score1 - score2 >= 2) {
                return "W";
            }
            if (score2 >= 4 && score2 - score1 >= 2) {
                return "L";
            }
            if (score1 >= 3 && score2 >= 3 && score1 === score2 + 1) {
                return "A";
            }
            if (score1 >= 3 && score2 >= 3) {
                return "40";
            }
            return scoreToText[score1];
        };

        this.getPlayer2Score = function() {
            var score1 = game.getPlayer1Score();
            var score2 = game.getPlayer2Score();
            if (score2 >= 4 && score2 - score1 >= 2) {
                return "W";
            }
            if (score1 >= 4 && score1 - score2 >= 2) {
                return "L";
            }
            if (score2 >= 3 && score1 >= 3 && score2 === score1 + 1) {
                return "A";
            }
            if (score1 >= 3 && score2 >= 3) {
                return "40";
            }
            return scoreToText[score2];
        };
    };

    window.tennisKata.Controller = function() {
    };

} ());
