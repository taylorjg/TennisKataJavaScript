(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.game = function(player1, player2) {

        var _player1Score = 0;
        var _player2Score = 0;
        var _player1 = player1;
        var _player2 = player2;

        var _isGameOver = function() {
            return (
                (_player1Score >= 4 && _player1Score - _player2Score >= 2) ||
                (_player2Score >= 4 && _player2Score - _player1Score >= 2));
        };

        var _getPlayer1 = function() {
            return _player1;
        };

        var _getPlayer2 = function() {
            return _player2;
        };

        var _getPlayer1Score = function() {
            return _player1Score;
        };

        var _getPlayer2Score = function() {
            return _player2Score;
        };

        var _pointScoredByPlayer1 = function() {
            if (!_isGameOver()) {
                _player1Score++;
            }
        };

        var _pointScoredByPlayer2 = function() {
            if (!_isGameOver()) {
                _player2Score++;
            }
        };

        var _reset = function() {
            _player1Score = 0;
            _player2Score = 0;
        };

        return {
            getPlayer1: _getPlayer1,
            getPlayer2: _getPlayer2,
            getPlayer1Score: _getPlayer1Score,
            getPlayer2Score: _getPlayer2Score,
            pointScoredByPlayer1: _pointScoredByPlayer1,
            pointScoredByPlayer2: _pointScoredByPlayer2,
            reset: _reset
        };
    };
} ());
