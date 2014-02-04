/**
 * Created by jonathantaylor on 02/02/2014.
 */

(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.scoreSummary = function(scorecard) {

        var _scorecard = scorecard;
        var _setData = [];
        var _scoreSummaryChangedEventHandlers = [];

        var _buildScoreSummaryTextFromSetData = function() {
            var setScores = [];
            for (var i = 0; i < _setData.length; i++) {
                var setValues = _setData[i];
                if (setValues.length >= 2) {
                    var setScore = setValues[0] + "-" + setValues[1];
                    if (setValues.length === 4) {
                        var tieBreakerResult = " (" + setValues[2] + "-" + setValues[3] + ")";
                        setScore += tieBreakerResult;
                    }
                    setScores.push(setScore);
                }
            }
            return setScores.join(", ");
        };

        var _raiseScoreSummaryChangedEvent = function() {
            var scoreSummaryText = _buildScoreSummaryTextFromSetData();
            for (var i = 0; i < _scoreSummaryChangedEventHandlers.length; i++) {
                _scoreSummaryChangedEventHandlers[i](scoreSummaryText);
            }
        };

        var _addScoreSummaryChangedEventHandler = function(handler) {
            _scoreSummaryChangedEventHandlers.push(handler);
        };

        var _getCurrentSet = function() {
            var currentSet = null;
            if (_setData.length === 0) {
                currentSet = [];
                _setData.push(currentSet);
            }
            else {
                currentSet = _setData[_setData.length - 1];
            }
            return currentSet;
        };

        var _onReset = function() {
            _setData = [];
            _raiseScoreSummaryChangedEvent();
        };

        var _onGameWon = function(player1Games, player2Games) {
            var currentSet = _getCurrentSet();
            currentSet[0] = player1Games;
            currentSet[1] = player2Games;
            _raiseScoreSummaryChangedEvent();
        };

        var _onTieBreakerWon = function(player1Points, player2Points) {
            var currentSet = _getCurrentSet();
            currentSet[2] = player1Points;
            currentSet[3] = player2Points;
        };

        var _onSetWon = function(/* player1Sets, player2Sets */) {
            _setData.push([]);
            _raiseScoreSummaryChangedEvent();
        };

        _scorecard.addResetEventHandler(_onReset);
        _scorecard.addGameWonEventHandler(_onGameWon);
        _scorecard.addTieBreakerWonEventHandler(_onTieBreakerWon);
        _scorecard.addSetWonEventHandler(_onSetWon);

        return {
            addScoreSummaryChangedEventHandler: _addScoreSummaryChangedEventHandler
        };
    };
} ());
