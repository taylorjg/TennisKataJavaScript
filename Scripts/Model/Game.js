/**
 * Created by jonathantaylor on 23/02/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.model = window.tennisKata.model || {};

    window.tennisKata.model.game = function(server, isTieBreakFlag) {

        var _points = [];
        var _server = server;
        var _isTieBreakFlag = (arguments.length === 2) ? isTieBreakFlag : false;
        var _gameWinner = null;

        var _countPoints = function(player) {
            var result = 0;
            for (var i = 0; i < _points.length; i++) {
                if (_points[i].getPointWinner() === player) {
                    result += 1;
                }
            }
            return result;
        };

        // TODO: extract method
        var _partitionPoints = function() {
            var x1 = [];
            var x2 = [];
            for (var i = 0; i < _points.length; i++) {
                var point = _points[i];
                if (x1.length) {
                    if (point.getPointWinner() === x1[0].getPointWinner()) {
                        x1.push(point);
                    }
                    else {
                        x2.push(point);
                    }
                }
                else {
                    x1.push(point);
                }
            }
            return [x1, x2];
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

        var _addPoint = function(point) {
            // TODO: throw if !!_gameWinner
            _points.push(point);
        };

        var _getPlayer1Points = function(player1) {
            return _countPoints(player1);
        };

        var _getPlayer2Points = function(player2) {
            return _countPoints(player2);
        };

        var _getServer = function() {
            return _server;
        };

        var _isTieBreak = function() {
            return _isTieBreakFlag;
        };

        var _getGameWinner = function() {
            if (_gameWinner === null) {
                _gameWinner = (_isTieBreak()) ? _calculateTieBreakGameWinner() : _calculateNormalGameWinner();
            }
            return _gameWinner;
        };

        return {
            addPoint: _addPoint,
            isTieBreak: _isTieBreak,
            getPlayer1Points: _getPlayer1Points,
            getPlayer2Points: _getPlayer2Points,
            getServer: _getServer,
            getGameWinner: _getGameWinner
        };
    };
}());
