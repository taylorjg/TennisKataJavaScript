(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.controller = function() {

        var _player1 = window.tennisKata.factory.createPlayer("Player1");
        var _player2 = window.tennisKata.factory.createPlayer("Player2");
        var _scorecard = window.tennisKata.factory.createScorecard(_player1, _player2);
        var _scoreboard = window.tennisKata.factory.createScoreboard(_scorecard);
        var _scoreChangedEventHandlers = [];

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

        var _setPlayerNames = function(playerName1, playerName2) {
            var newPlayer1 = window.tennisKata.factory.createPlayer(playerName1);
            var newPlayer2 = window.tennisKata.factory.createPlayer(playerName2);
            _scorecard.changePlayers(newPlayer1, newPlayer2);
            _raiseScoreChangedEvent();
        };

        var _setMatchLength = function(matchLength) {
            _scorecard.changeMatchLength(matchLength);
            _raiseScoreChangedEvent();
        };

        var _addScoreChangedEventHandler = function(handler) {
            _scoreChangedEventHandlers.push(handler);
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

        return {
            setPlayerNames: _setPlayerNames,
            setMatchLength: _setMatchLength,
            player1WinsPoint: _player1WinsPoint,
            player2WinsPoint: _player2WinsPoint,
            reset: _reset,
            addScoreChangedEventHandler: _addScoreChangedEventHandler
        };
    };
} ());
