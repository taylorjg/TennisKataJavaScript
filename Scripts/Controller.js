(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.controller = function() {

        var _player1 = window.tennisKata.factory.createPlayer("Player1");
        var _player2 = window.tennisKata.factory.createPlayer("Player2");
        var _match;
        var _resetEventHandlers = [];
        var _scoreChangedEventHandlers = [];
        var _matchWonEventHandlers = [];
        var _monitors = [];

        var _createMatch = function(matchLength) {
            _match = window.tennisKata.model.match(_player1, _player2, matchLength, _mainDispatchingMonitor);
        };

        var _getPlayer1 = function() { return _player1; };
        var _getPlayer2 = function() { return _player2; };
        var _getMatchLength = function() { return _match.getMatchLength(); };

        var _raiseResetEvent = function() {
            for (var i = 0; i < _resetEventHandlers.length; i++) {
                _resetEventHandlers[i](_match);
            }
        };

        var _raiseScoreChangedEvent = function() {
            for (var i = 0; i < _scoreChangedEventHandlers.length; i++) {
                _scoreChangedEventHandlers[i](_match);
            }
        };

        var _raiseMatchWonEvent = function(match) {
            for (var i = 0; i < _matchWonEventHandlers.length; i++) {
                _matchWonEventHandlers[i](match);
            }
        };

        var _setPlayerNames = function(playerName1, playerName2) {
            _player1 = window.tennisKata.factory.createPlayer(playerName1);
            _player2 = window.tennisKata.factory.createPlayer(playerName2);
            var matchLength = _match.getMatchLength();
            _createMatch(matchLength);
            _reset();
        };

        var _setMatchLength = function(matchLength) {
            _createMatch(matchLength);
            _reset();
        };

        var _addResetEventHandler = function(handler) {
            _resetEventHandlers.push(handler);
        };

        var _addScoreChangedEventHandler = function(handler) {
            _scoreChangedEventHandlers.push(handler);
        };

        var _addMatchWonEventHandler = function(handler) {
            _matchWonEventHandlers.push(handler);
        };

        var _playerWinsPoint = function(player) {
            var point = window.tennisKata.model.point(player);
            _mainDispatchingMonitor.onNewPoint(point);
            _match.scorePoint(point);
            _raiseScoreChangedEvent();
        };

        var _player1WinsPoint = function() {
            _playerWinsPoint(_player1);
        };

        var _player2WinsPoint = function() {
            _playerWinsPoint(_player2);
        };

        var _reset = function() {
            _match.reset();
            for (var i = 0; i < _monitors.length; i++) {
                _monitors[i].reset(_match);
            }
            _raiseResetEvent();
        };

        var _mainDispatchingMonitor = {
            onPointWon: function(point) {
                for (var i = 0; i < _monitors.length; i++) {
                    _monitors[i].onPointWon(_match, point);
                }
            },
            onGameWon: function(game) {
                for (var i = 0; i < _monitors.length; i++) {
                    _monitors[i].onGameWon(_match, game);
                }
            },
            onSetWon: function(set) {
                for (var i = 0; i < _monitors.length; i++) {
                    _monitors[i].onSetWon(_match, set);
                }
            },
            onMatchWon: function(/* match */) {
                for (var i = 0; i < _monitors.length; i++) {
                    _monitors[i].onMatchWon(_match);
                }
                _raiseMatchWonEvent(_match);
            },
            onNewPoint: function(point) {
                for (var i = 0; i < _monitors.length; i++) {
                    _monitors[i].onNewPoint(_match, point);
                }
            },
            onNewGame: function(game) {
                for (var i = 0; i < _monitors.length; i++) {
                    _monitors[i].onNewGame(_match, game);
                }
            },
            onNewSet: function(set) {
                for (var i = 0; i < _monitors.length; i++) {
                    _monitors[i].onNewSet(_match, set);
                }
            }
        };

        var _addMonitor = function(monitor) {
            _monitors.push(monitor);
        };

        var _init = function() {
            _createMatch(3);
            for (var i = 0; i < _monitors.length; i++) {
                _monitors[i].init(_match);
            }
            _raiseResetEvent();
        };

        return {
            setPlayerNames: _setPlayerNames,
            getPlayer1: _getPlayer1,
            getPlayer2: _getPlayer2,
            getMatchLength: _getMatchLength,
            setMatchLength: _setMatchLength,
            player1WinsPoint: _player1WinsPoint,
            player2WinsPoint: _player2WinsPoint,
            init: _init,
            reset: _reset,
            addResetEventHandler: _addResetEventHandler,
            addScoreChangedEventHandler: _addScoreChangedEventHandler,
            addMatchWonEventHandler: _addMatchWonEventHandler,
            addMonitor: _addMonitor
        };
    };
} ());
