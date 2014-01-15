// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.Player = function(name) {

        this.name = name;

        this.getName = function() {
            return this.name;
        }
    };

    window.tennisKata.Game = function(player1, player2) {

        var privateStuff = [];

        privateStuff[this] = {
            player1Score: 0,
            player2Score: 0,
            player1: player1,
            player2: player2
        };

        this.getPlayer1Name = function() {
            return privateStuff[this].player1.getName();
        };

        this.getPlayer2Name = function() {
            return privateStuff[this].player2.getName();
        };

        this.getPlayer1Score = function() {
            return privateStuff[this].player1Score;
        };

        this.getPlayer2Score = function() {
            return privateStuff[this].player2Score;
        };

        this.pointScoredByPlayer1 = function() {
            return privateStuff[this].player1Score++;
        };

        this.pointScoredByPlayer2 = function() {
            return privateStuff[this].player2Score++;
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
            if (score1 + score2 >= 6) {
                return score1 === score2 + 1 ? "A" : "40";
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
            if (score1 + score2 >= 6) {
                return score2 === score1 + 1 ? "A" : "40";
            }
            return scoreToText[score2];
        };
    };

    window.tennisKata.Controller = function() {
    };

} ());
