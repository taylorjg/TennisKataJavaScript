/**
 * Created by jonathantaylor on 23/02/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.model = window.tennisKata.model || {};

    window.tennisKata.model.set = function(player1, player2, initialServer, isFinalSet) {

        var _player1 = player1;
        var _player2 = player2;
        var _initialServer = initialServer;
        var _isFinalSetFlag = (arguments.length === 1) ? isFinalSet : false;
        var _games = [];
        var _tieBreak = null;
        var _setWinner = null;

        var _determineServerForNewGame = function() {

            if (_games.length === 0) {
                return _initialServer;
            }

            var lastGame = _games[_games.length - 1];
            var lastServer = lastGame.getLastServer();
            return (lastServer === _player1) ? _player2 : _player1;
        };

        var _determineIfNewGameIsTieBreak = function() {

            if (_isFinalSet()) {
                return false;
            }

            var xs = _partitionGames();
            var x1 = xs[0];
            var x2 = xs[1];
            return x1.length === 6 && x2.length === 6;
        };

        var _newGame = function() {
            var initialServerForNewGame = _determineServerForNewGame();
            var isTieBreak = _determineIfNewGameIsTieBreak();
            var newGame = window.tennisKata.model.game(_player1, _player2, initialServerForNewGame, isTieBreak);
            _games.push(newGame);
            return newGame;
        };

        var _currentGame = function() {
            if (_games.length) {
                var last = _games[_games.length - 1];
                if (!last.getGameWinner()) {
                    return last;
                }
            }
            return _newGame();
        };

        var _scorePoint = function(point) {
            // TODO: throw if !!_setWinner
            var currentGame = _currentGame();
            currentGame.scorePoint(point);
        };

        var _isFinalSet = function() {
            return _isFinalSetFlag;
        };

        var _countGames = function(player) {
            var result = 0;
            for (var i = 0; i < _games.length; i++) {
                if (_games[i].getGameWinner() === player) {
                    result += 1;
                }
            }
            if (_tieBreak && _tieBreak.getGameWinner() === player) {
                result += 1;
            }
            return result;
        };

        var _getPlayer1Games = function(player1) {
            return _countGames(player1);
        };

        var _getPlayer2Games = function(player2) {
            return _countGames(player2);
        };

        // TODO: extract method
        var _partitionGames = function() {
            var x1 = [];
            var x2 = [];
            for (var i = 0; i < _games.length; i++) {
                var game = _games[i];
                if (x1.length) {
                    if (game.getGameWinner() === x1[0].getGameWinner()) {
                        x1.push(game);
                    }
                    else {
                        x2.push(game);
                    }
                }
                else {
                    x1.push(game);
                }
            }
            return [x1, x2];
        };

        var _calculateSetWinner = function() {

            if (_tieBreak) {
                return _tieBreak.getGameWinner();
            }

            var xs = _partitionGames();
            var x1 = xs[0];
            var x2 = xs[1];
            var x1len = x1.length;
            var x2len = x2.length;
            if (x1len >= 6 && x1len - x2len >= 2) {
                return x1[0].getGameWinner();
            }
            if (x2len >= 6 && x2len - x1len >= 2) {
                return x2[0].getGameWinner();
            }
            return null;
        };

        var _getSetWinner = function() {
            if (_setWinner === null) {
                _setWinner = _calculateSetWinner();
            }
            return _setWinner;
        };

        var _getLastServer = function() {

            if (_tieBreak) {
                return _tieBreak.getServer();
            }

            if (_games.length) {
                return _games[_games.length - 1].getServer();
            }

            return null;
        };

        return {
            scorePoint: _scorePoint,
            getPlayer1Games: _getPlayer1Games,
            getPlayer2Games: _getPlayer2Games,
            getSetWinner: _getSetWinner,
            getLastServer: _getLastServer
        };
    };
}());
