﻿(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.controller = function() {

        var _player1 = window.tennisKata.factory.createPlayer("Player1");
        var _player2 = window.tennisKata.factory.createPlayer("Player2");
        var _scorecard = window.tennisKata.factory.createScorecard(_player1, _player2);
        var _scoreboard = window.tennisKata.factory.createScoreboard(_scorecard);
        var _scoreSummary = window.tennisKata.factory.createScoreSummary(_scorecard);
        var _resetEventHandlers = [];
        var _scoreChangedEventHandlers = [];
        var _scoreSummaryChangedEventHandlers = [];
        var _matchWonEventHandlers = [];
        var _serverChangedEventHandlers = [];

        var _raiseResetEvent = function() {
            for (var i = 0; i < _resetEventHandlers.length; i++) {
                _resetEventHandlers[i]();
            }
        };

        var _raiseScoreChangedEvent = function() {

            var scores = _scoreboard.getScores();

            var eventData = {
                player1Name: _scorecard.getPlayer1().getName(),
                player1Points: scores[0][0],
                player1Games: scores[0][1],
                player1Sets: scores[0][2],
                player2Name: _scorecard.getPlayer2().getName(),
                player2Points: scores[1][0],
                player2Games: scores[1][1],
                player2Sets: scores[1][2]
            };

            for (var i = 0; i < _scoreChangedEventHandlers.length; i++) {
                _scoreChangedEventHandlers[i](eventData);
            }
        };

        var _raiseScoreSummaryChangedEvent = function(eventData) {
            for (var i = 0; i < _scoreSummaryChangedEventHandlers.length; i++) {
                _scoreSummaryChangedEventHandlers[i](eventData);
            }
        };

        var _raiseMatchWonEvent = function(eventData) {
            for (var i = 0; i < _matchWonEventHandlers.length; i++) {
                _matchWonEventHandlers[i](eventData);
            }
        };

        var _raiseServerChangedEvent = function(eventData) {
            for (var i = 0; i < _serverChangedEventHandlers.length; i++) {
                _serverChangedEventHandlers[i](eventData);
            }
        };

        var _setPlayerNames = function(playerName1, playerName2) {
            var newPlayer1 = window.tennisKata.factory.createPlayer(playerName1);
            var newPlayer2 = window.tennisKata.factory.createPlayer(playerName2);
            _scorecard.changePlayers(newPlayer1, newPlayer2);
        };

        var _getPlayer1 = function() { return _player1; };
        var _getPlayer2 = function() { return _player2; };
        var _getServer = function() { return _scorecard.getServer(); };

        var _getMatchLength = function() {
            return _scorecard.getMatchLength();
        };

        var _setMatchLength = function(matchLength) {
            _scorecard.setMatchLength(matchLength);
        };

        var _addResetEventHandler = function(handler) {
            _resetEventHandlers.push(handler);
        };

        var _addScoreChangedEventHandler = function(handler) {
            _scoreChangedEventHandlers.push(handler);
        };

        var _addScoreSummaryChangedEventHandler = function(handler) {
            _scoreSummaryChangedEventHandlers.push(handler);
        };

        var _addMatchWonEventHandler = function(handler) {
            _matchWonEventHandlers.push(handler);
        };

        var _addServerChangedEventHandler = function(handler) {
            _serverChangedEventHandlers.push(handler);
        };

        var _player1WinsPoint = function() {
            _scorecard.player1WinsPoint();
            _raiseScoreChangedEvent();
        };

        var _player2WinsPoint = function() {
            _scorecard.player2WinsPoint();
            _raiseScoreChangedEvent();
        };

        var _reset = function() {
            _scorecard.reset();
            _raiseScoreChangedEvent();
        };

        var _onReset = function() {
            _raiseResetEvent();
            _raiseScoreChangedEvent();
        };

        var _onMatchWon = function(eventData) {
            _raiseMatchWonEvent(eventData);
        };

        var _onServerChanged = function(eventData) {
            _raiseServerChangedEvent(eventData);
        };

        var _onScoreSummaryChanged = function(eventData) {
            _raiseScoreSummaryChangedEvent(eventData);
        };

        _scorecard.addResetEventHandler(_onReset);
        _scorecard.addMatchWonEventHandler(_onMatchWon);
        _scorecard.addServerChangedEventHandler(_onServerChanged);
        _scoreSummary.addScoreSummaryChangedEventHandler(_onScoreSummaryChanged);

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
            addScoreSummaryChangedEventHandler: _addScoreSummaryChangedEventHandler,
            addMatchWonEventHandler: _addMatchWonEventHandler,
            addServerChangedEventHandler: _addServerChangedEventHandler
        };
    };
} ());
