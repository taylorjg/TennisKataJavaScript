/**
 * Created by jonathantaylor on 21/02/2014.
 */

(function() {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.scoreSummaryFormatter = function() {

        var _buildSetScoreHelper = function(setValues, idx1, idx2, idx3, idx4) {
            if (setValues.length >= 2) {
                var setScore = setValues[idx1] + "-" + setValues[idx2];
                if (setValues.length === 4) {
                    setScore += " <sup><i>(" + setValues[idx3] + "-" + setValues[idx4] + ")</i></sup>";
                }
                return setScore;
            }
            return null;
        };

        var _buildScoreSummaryTextHelper = function(setData, idx1, idx2, idx3, idx4) {
            var setScores = [];
            for (var i = 0; i < setData.length; i++) {
                var setValues = setData[i];
                var setScore = _buildSetScoreHelper(setValues, idx1, idx2, idx3, idx4);
                if (setScore) {
                    setScores.push(setScore);
                }
            }
            return setScores.join(", ");
        };

        var _buildScoreSummaryTextWithPlayer1First = function(setData) {
            return _buildScoreSummaryTextHelper(setData, 0, 1, 2, 3);
        };

        var _buildScoreSummaryTextWithPlayer2First = function(setData) {
            return _buildScoreSummaryTextHelper(setData, 1, 0, 3, 2);
        };

        var _formatScoreSummary = function(setData, player1First) {
            return (player1First)
                ? _buildScoreSummaryTextWithPlayer1First(setData)
                : _buildScoreSummaryTextWithPlayer2First(setData);
        };

        return {
            formatScoreSummary: _formatScoreSummary
        };
    };
}());
