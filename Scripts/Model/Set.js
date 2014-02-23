/**
 * Created by jonathantaylor on 23/02/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.model = window.tennisKata.model || {};

    window.tennisKata.model.set = function(islastSetFlag) {

        var _games = [];
        var _islastSetFlag = (arguments.length === 1) ? islastSetFlag : false;
        var _tieBreak = null;
        var _setWinner = null;

        var _isLastSet = function() {
            return _islastSetFlag;
        };

        var _addGame = function(game) {
            // TODO: throw if !!_setWinner
            _games.push(game);
        };

        var _addTieBreak = function(tieBreak) {
            // TODO: throw if !!_isLastSetFLag
            // TODO: throw if !!_tieBreak
            _tieBreak = tieBreak;
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

        var _getPlayer1TieBreakPoints = function(player1) {
            if (_tieBreak) {
                return _tieBreak.getPlayer1Points(player1);
            }
            return null;
        };

        var _getPlayer2TieBreakPoints = function(player2) {
            if (_tieBreak) {
                return _tieBreak.getPlayer2Points(player2);
            }
            return null;
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

        return {
            addGame: _addGame,
            addTieBreak: _addTieBreak,
            isLastSet: _isLastSet,
            getPlayer1Games: _getPlayer1Games,
            getPlayer2Games: _getPlayer2Games,
            getPlayer1TieBreakPoints: _getPlayer1TieBreakPoints,
            getPlayer2TieBreakPoints: _getPlayer2TieBreakPoints,
            getSetWinner: _getSetWinner
        };
    };
}());
