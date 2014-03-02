/**
 * Created by jonathantaylor on 23/02/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.model = window.tennisKata.model || {};

    window.tennisKata.model.game = function(player1, player2, isTieBreakFlag, monitor) {

        var _player1 = player1;
        var _player2 = player2;
        var _isTieBreakFlag = isTieBreakFlag;
        var _monitor = monitor;
        var _points = [];
        var _gameWinner = null;

        var _scorePoint = function(point) {
            _points.push(point);
            _monitor.onPointWon(point);
            if (_getGameWinner()) {
                _monitor.onGameWon(this);
            }
        };

        var _countPoints = function(player) {
            var result = 0;
            for (var i = 0; i < _points.length; i++) {
                if (_points[i].getPointWinner() === player) {
                    result += 1;
                }
            }
            return result;
        };

        var _partitionPoints = function() {
            return window.tennisKata.model.utils.partition(
                _points,
                function(point) {
                    return point.getPointWinner();
                });
        };

        var _calculateGameWinner = function(minPointsToWin) {
            var xs = _partitionPoints();
            var x1 = xs[0];
            var x2 = xs[1];
            var x1len = x1.length;
            var x2len = x2.length;
            if (x1len >= minPointsToWin && x1len - x2len >= 2) {
                return x1[0].getPointWinner();
            }
            if (x2len >= minPointsToWin && x2len - x1len >= 2) {
                return x2[0].getPointWinner();
            }
            return null;
        };

        var _calculateNormalGameWinner = function() {
            return _calculateGameWinner(4);
        };

        var _calculateTieBreakGameWinner = function() {
            return _calculateGameWinner(7);
        };

        var _getPlayer1Points = function() {
            return _countPoints(_player1);
        };

        var _getPlayer2Points = function() {
            return _countPoints(_player2);
        };

        var _getGameWinner = function() {
            if (_gameWinner === null) {
                _gameWinner = (_isTieBreakFlag) ? _calculateTieBreakGameWinner() : _calculateNormalGameWinner();
            }
            return _gameWinner;
        };

        var _iteratePoints = function(fn) {
            for (var i = 0; i < _points.length; i++) {
                fn(_points[i]);
            }
        };

        var _isTieBreakGame = function() {
            return _isTieBreakFlag;
        };

        return {
            getPlayer1Points: _getPlayer1Points,
            getPlayer2Points: _getPlayer2Points,
            iteratePoints: _iteratePoints,
            scorePoint: _scorePoint,
            isTieBreakGame: _isTieBreakGame,
            getGameWinner: _getGameWinner,
            extendedProperties: {}
        };
    };
}());
