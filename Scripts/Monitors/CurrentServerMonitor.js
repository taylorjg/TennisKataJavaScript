/**
 * Created by jonathantaylor on 01/03/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.monitors = window.tennisKata.monitors || {};

    window.tennisKata.monitors.currentServerMonitor = function(player1First) {

        var _player1First = player1First;
        var _currentServer = null;
        var _inTieBreak = false;
        var _tieBreakServesCount = 0;
        var _serverChangedEventHandlers = [];

        var _onPointWon = function(match /*, point */) {
            if (_inTieBreak) {
                _tieBreakServesCount++;
                if (_tieBreakServesCount === 2) {
                    _tieBreakServesCount = 0;
                    _flipServer(match);
                }
            }
            else {
                var currentSet = null;
                match.iterateSets(function(s) {
                    currentSet = s;
                });
                if (currentSet) {
                    var currentGame = null;
                    currentSet.iterateGames(function(g) {
                        currentGame = g;
                    });
                    if (currentGame && currentGame.isTieBreakGame()) {
                        _inTieBreak = true;
                        _tieBreakServesCount = 0;
                        _flipServer(match);
                    }
                }
            }
        };

        var _onGameWon = function(match, game) {

            if (game.extendedProperties.getServer() === match.getPlayer1()) {
                _currentServer = match.getPlayer2();
            }
            else {
                _currentServer = match.getPlayer1();
            }
            _raiseServerChangedEvent();

            if (_inTieBreak) {
                _inTieBreak = false;
                _tieBreakServesCount = 0;
            }
        };

        var _onSetWon = function(/* match, set */) {
        };

        var _onMatchWon = function(/* match */) {
            _currentServer = null;
            _raiseServerChangedEvent();
        };

        var _onNewPoint = function(match, point) {
            point.extendedProperties.getServer = function() {
                return _currentServer;
            };
            var currentReceiver = _currentReceiver(match);
            point.extendedProperties.getReceiver = function() {
                return currentReceiver;
            };
        };

        var _onNewGame = function(match, game) {
            game.extendedProperties.getServer = function() {
                return _currentServer;
            };
        };

        var _onNewSet = function(/* match, set */) {
        };

        var _init = function(match) {
            _currentServer = (_player1First) ? match.getPlayer1() : match.getPlayer2();
            _inTieBreak = false;
            _tieBreakServesCount = 0;
            _raiseServerChangedEvent();
        };

        var _reset = function(match) {
            _init(match);
        };

        var _flipServer = function(match) {
            _currentServer = _currentReceiver(match);
            _raiseServerChangedEvent();
        };

        var _currentReceiver = function(match) {
            if (_currentServer === match.getPlayer1()) {
                return match.getPlayer2();
            }
            return match.getPlayer1();
        };

        var _raiseServerChangedEvent = function() {
            for (var i = 0; i < _serverChangedEventHandlers.length; i++) {
                _serverChangedEventHandlers[i](_currentServer);
            }
        };

        var _addServerChangedEventHandler = function(handler) {
            _serverChangedEventHandlers.push(handler);
        };

        return {
            onPointWon: _onPointWon,
            onGameWon: _onGameWon,
            onSetWon: _onSetWon,
            onMatchWon: _onMatchWon,
            onNewPoint: _onNewPoint,
            onNewGame: _onNewGame,
            onNewSet: _onNewSet,
            init: _init,
            reset: _reset,
            addServerChangedEventHandler: _addServerChangedEventHandler
        };
    };
}());
