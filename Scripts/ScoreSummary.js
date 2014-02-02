/**
 * Created by jonathantaylor on 02/02/2014.
 */

(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.scoreSummary = function(scorecard) {

        var _scorecard = scorecard;
        var _scoreSummaryChangedEventHandlers = [];

        var _raiseScoreSummaryChangedEvent = function(eventData) {
            for (var i = 0; i < _scoreSummaryChangedEventHandlers.length; i++) {
                _scoreSummaryChangedEventHandlers[i](eventData);
            }
        };

        var _addScoreSummaryChangedEventHandler = function(handler) {
            _scoreSummaryChangedEventHandlers.push(handler);
        };

        var _onReset = function() {
            _raiseScoreSummaryChangedEvent("");
        };

        _scorecard.addResetEventHandler(_onReset);

        return {
            addScoreSummaryChangedEventHandler: _addScoreSummaryChangedEventHandler
        };
    };
} ());
