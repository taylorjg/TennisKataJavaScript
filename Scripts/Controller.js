(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.controller = function() {

        var _player1 = window.tennisKata.factory.createPlayer("Player1");
        var _player2 = window.tennisKata.factory.createPlayer("Player2");
        var _matchLength = 3;
        var _scorecard = window.tennisKata.factory.createScorecard(_player1, _player2);
        var _match;
        var _resetEventHandlers = [];
        var _scoreChangedEventHandlers = [];
        var _matchWonEventHandlers = [];
        var _serverChangedEventHandlers = [];
        var _monitors = [];

        var _createMatch = function() {
            _match = window.tennisKata.model.match(_player1, _player2, _player1, _matchLength, _mainDispatchingMonitor);
        };

        var _getPlayer1 = function() { return _player1; };
        var _getPlayer2 = function() { return _player2; };
        var _getServer = function() { return _scorecard.getServer(); };
        var _getMatchLength = function() { return _scorecard.getMatchLength(); };

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

        var _raiseServerChangedEvent = function(eventData) {
            for (var i = 0; i < _serverChangedEventHandlers.length; i++) {
                _serverChangedEventHandlers[i](eventData);
            }
        };

        var _setPlayerNames = function(playerName1, playerName2) {
            _player1 = window.tennisKata.factory.createPlayer(playerName1);
            _player2 = window.tennisKata.factory.createPlayer(playerName2);
            _scorecard.changePlayers(_player1, _player2);
            _createMatch();
        };

        var _setMatchLength = function(matchLength) {
            _scorecard.setMatchLength(matchLength);
            _matchLength = matchLength;
            _createMatch();
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

        var _addServerChangedEventHandler = function(handler) {
            _serverChangedEventHandlers.push(handler);
        };

        var _player1WinsPoint = function() {
            var point = window.tennisKata.model.point(_player1);
            _match.scorePoint(point);
            _scorecard.player1WinsPoint();
            _raiseScoreChangedEvent();
        };

        var _player2WinsPoint = function() {
            var point = window.tennisKata.model.point(_player2);
            _match.scorePoint(point);
            _scorecard.player2WinsPoint();
            _raiseScoreChangedEvent();
        };

        var _reset = function() {
            _scorecard.reset();
            _match.reset();
            _raiseScoreChangedEvent();
        };

        var _onReset = function() {
            _match.reset();
            _raiseResetEvent();
            _raiseScoreChangedEvent();
        };

        var _onServerChanged = function(eventData) {
            _raiseServerChangedEvent(eventData);
        };

        var _mainDispatchingMonitor = {
            onPointWon: function(point) {
                console.log("_monitor.onPointWon - pointWinner:" + point.getPointWinner().getName());
            },
            onGameWon: function(game) {
                console.log("_monitor.onGameWon - gameWinner: " + game.getGameWinner().getName());
            },
            onSetWon: function(set) {
                console.log("_monitor.onSetWon - setWinner: " + set.getSetWinner().getName());
            },
            onMatchWon: function(/* match */) {
                console.log("_monitor.onMatchWon - matchWinner: " + _match.getMatchWinner().getName());
                _raiseMatchWonEvent(_match);
            }
        };

        _scorecard.addResetEventHandler(_onReset);
        _scorecard.addServerChangedEventHandler(_onServerChanged);
        _createMatch();

        return {
            setPlayerNames: _setPlayerNames,
            getPlayer1: _getPlayer1,
            getPlayer2: _getPlayer2,
            getServer: _getServer,
            getMatchLength: _getMatchLength,
            setMatchLength: _setMatchLength,
            player1WinsPoint: _player1WinsPoint,
            player2WinsPoint: _player2WinsPoint,
            reset: _reset,
            addResetEventHandler: _addResetEventHandler,
            addScoreChangedEventHandler: _addScoreChangedEventHandler,
            addMatchWonEventHandler: _addMatchWonEventHandler,
            addServerChangedEventHandler: _addServerChangedEventHandler
        };
    };
} ());
