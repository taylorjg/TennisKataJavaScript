/**
 * Created by taylojo on 03/03/14.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.tests = window.tennisKata.tests || {};
    window.tennisKata.tests.common = window.tennisKata.tests.common || {};

    window.tennisKata.tests.common.matchUtils = function(player1Name, player2Name, matchLength) {

        var _player1;
        var _player2;
        var _match;

        var _player1WinsPoint = function() {
            var point = window.tennisKata.model.point(_player1);
            _match.scorePoint(point);
        };

        var _player2WinsPoint = function() {
            var point = window.tennisKata.model.point(_player2);
            _match.scorePoint(point);
        };

        var _player1WinsLoveGame = function() {
            for (var i = 1; i <= 4; i++) {
                _player1WinsPoint();
            }
        };

        var _player2WinsLoveGame = function() {
            for (var i = 1; i <= 4; i++) {
                _player2WinsPoint();
            }
        };

        var _playersWinLoveGames = function(numGames1, numGames2) {
            for (var i = 1; i <= Math.max(numGames1, numGames2); i++) {
                if (numGames1 >= i) { _player1WinsLoveGame(); }
                if (numGames2 >= i) { _player2WinsLoveGame(); }
            }
        };

        var _playersWinSixGamesEach = function() {
            _playersWinLoveGames(6, 6);
        };

        var _getLastSet = function() {
            var lastSet = null;
            _match.iterateSets(function(s){
                lastSet = s;
            });
            return lastSet;
        };

        var _getLastGame = function() {
            var lastGame = null;
            var lastSet = _getLastSet();
            if (lastSet) {
                lastSet.iterateGames(function(g) {
                    lastGame = g;
                });
            }
            return lastGame;
        };

        var _getMatch = function() {
            return _match;
        };

        _player1 = window.tennisKata.model.player(player1Name);
        _player2 = window.tennisKata.model.player(player2Name);
        var nullMonitor = window.tennisKata.monitors.nullMonitor();
        _match = window.tennisKata.model.match(_player1, _player2, matchLength, nullMonitor);

        return {
            player1WinsPoint: _player1WinsPoint,
            player2WinsPoint: _player2WinsPoint,
            player1WinsLoveGame: _player1WinsLoveGame,
            player2WinsLoveGame: _player2WinsLoveGame,
            playersWinLoveGames: _playersWinLoveGames,
            playersWinSixGamesEach: _playersWinSixGamesEach,
            getLastSet: _getLastSet,
            getLastGame: _getLastGame,
            getMatch: _getMatch
        };
    };
}());
