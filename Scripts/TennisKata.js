// ReSharper disable InconsistentNaming

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

    window.tennisKata.Player = function(name) {

        var privateStuff = [];

        privateStuff[this] = {
            name: name
        };

        this.getName = function() {
            return privateStuff[this].name;
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

        this.getPlayer1 = function() {
            return privateStuff[this].player1;
        };

        this.getPlayer2 = function() {
            return privateStuff[this].player2;
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

        var _player1 = window.tennisKata.factory.createPlayer("Player1");
        var _player2 = window.tennisKata.factory.createPlayer("Player2");
        var _game = window.tennisKata.factory.createGame(_player1, _player2);
        var _scoreboard = window.tennisKata.factory.createScoreboard(_game);

        // Should we have an array of these ?
        var _scoreChangedCallback = null;

        var _reportScore = function() {
            if (_scoreChangedCallback !== null) {
                _scoreChangedCallback({
                    player1Name: _game.getPlayer1().getName(),
                    player1Score: _scoreboard.getPlayer1Score(),
                    player2Name: _game.getPlayer2().getName(),
                    player2Score: _scoreboard.getPlayer2Score()
                });
            }
        };


        this.setScoreChangedCallback = function(cb) {
            _scoreChangedCallback = cb;
        };

        this.pointScoredByPlayer1 = function() {
            _game.pointScoredByPlayer1();
            _reportScore();
        };

        this.pointScoredByPlayer2 = function() {
            _game.pointScoredByPlayer2();
            _reportScore();
        };
    };

} ());
