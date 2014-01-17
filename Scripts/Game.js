(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.Game = function(player1, player2) {

        var _privateStuff = [];

        _privateStuff[this] = {
            player1Score: 0,
            player2Score: 0,
            player1: player1,
            player2: player2
        };

        var _isGameOver = function() {
            var score1 = _privateStuff[this].player1Score;
            var score2 = _privateStuff[this].player2Score;
            return (
                (score1 >= 4 && score1 - score2 >= 2) ||
                (score2 >= 4 && score2 - score1 >= 2));
        };

        this.getPlayer1 = function() {
            return _privateStuff[this].player1;
        };

        this.getPlayer2 = function() {
            return _privateStuff[this].player2;
        };

        this.getPlayer1Score = function() {
            return _privateStuff[this].player1Score;
        };

        this.getPlayer2Score = function() {
            return _privateStuff[this].player2Score;
        };

        this.pointScoredByPlayer1 = function() {
            if (_isGameOver.apply(this, arguments)) {
                return;
            }
            _privateStuff[this].player1Score++;
        };

        this.pointScoredByPlayer2 = function() {
            if (_isGameOver.apply(this, arguments)) {
                return;
            }
            _privateStuff[this].player2Score++;
        };

        this.reset = function() {
            _privateStuff[this].player1Score = 0;
            _privateStuff[this].player2Score = 0;
        };
    };
} ());
