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

        var _buildScoreSummaryTextHelper = function(scoreSummaryData, idx1, idx2, idx3, idx4) {
            var setScores = [];
            for (var i = 0; i < scoreSummaryData.length; i++) {
                var setValues = scoreSummaryData[i];
                var setScore = _buildSetScoreHelper(setValues, idx1, idx2, idx3, idx4);
                if (setScore) {
                    setScores.push(setScore);
                }
            }
            return setScores.join(", ");
        };

        var _buildScoreSummaryTextWithPlayer1First = function(scoreSummaryData) {
            return _buildScoreSummaryTextHelper(scoreSummaryData, 0, 1, 2, 3);
        };

        var _buildScoreSummaryTextWithPlayer2First = function(scoreSummaryData) {
            return _buildScoreSummaryTextHelper(scoreSummaryData, 1, 0, 3, 2);
        };

        var _formatScoreSummary = function(scoreSummaryData, player1First) {
            return (player1First) ? _buildScoreSummaryTextWithPlayer1First(scoreSummaryData)
                : _buildScoreSummaryTextWithPlayer2First(scoreSummaryData);
        };

        return {
            formatScoreSummary: _formatScoreSummary
        };
    };
}());
