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
            var formattedBits = [];
            for (var i = 0; i < _setData.length; i++) {
                var set = _setData[i];
                formattedBits.push(set[0] + "-" + set[1]);
            }
            return formattedBits.join(", ");
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

        var _onReset = function() {
            _setData = [];
            _raiseScoreSummaryChangedEvent();
        };

        var _onGameWon = function() {
            var currentSet = null;
            if (_setData.length === 0) {
                currentSet = [];
                _setData.push(currentSet);
            }
            else {
                currentSet = _setData[_setData.length - 1];
            }
            currentSet[0] = _scorecard.getPlayer1Games();
            currentSet[1] = _scorecard.getPlayer2Games();
            _raiseScoreSummaryChangedEvent();
        };

        var _onSetWon = function() {
            _setData.push([]);
        };

        _scorecard.addResetEventHandler(_onReset);
        _scorecard.addGameWonEventHandler(_onGameWon);
        _scorecard.addSetWonEventHandler(_onSetWon);

        return {
            addScoreSummaryChangedEventHandler: _addScoreSummaryChangedEventHandler
        };
    };
} ());
