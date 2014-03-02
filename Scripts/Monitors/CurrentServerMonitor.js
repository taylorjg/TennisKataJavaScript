/**
 * Created by jonathantaylor on 01/03/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.monitors = window.tennisKata.monitors || {};

    window.tennisKata.monitors.currentServerMonitor = function(initialServer) {

        var _initialServer = initialServer;
        var _currentServer = _initialServer;
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

        var _onGameWon = function(match /*, game */) {
            _flipServer(match);
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

        var _reset = function() {
            _currentServer = _initialServer;
            _inTieBreak = false;
            _tieBreakServesCount = 0;
            _raiseServerChangedEvent();
        };

        var _flipServer = function(match) {
            if (_currentServer === match.getPlayer1()) {
                _currentServer = match.getPlayer2();
            }
            else {
                _currentServer = match.getPlayer1();
            }
            _raiseServerChangedEvent();
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
            reset: _reset,
            addServerChangedEventHandler: _addServerChangedEventHandler
        };
    };
}());
