/**
 * Created by taylojo on 24/02/14.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.presentation = window.tennisKata.presentation || {};

    window.tennisKata.presentation.scoreSummaryFormatter = function() {

        var _buildSetScoreSummaryText = function(set) {

            var player1Games = set.getPlayer1Games();
            var player2Games = set.getPlayer2Games();
            var setScoreSummaryText = player1Games + "-" + player2Games;

            var lastGame = null;
            set.iterateGames(function(game){
                lastGame = game;
            });
            if (lastGame && lastGame.isTieBreakGame()) {
                var player1TieBreakPoints = lastGame.getPlayer1Points();
                var player2TieBreakPoints = lastGame.getPlayer2Points();
                var tieBreakText = "<sup><i>(" + player1TieBreakPoints + "-" + player2TieBreakPoints + ")</i></sup>";
                setScoreSummaryText += tieBreakText;
            }

            return setScoreSummaryText;
        };

        var _buildScoreSummaryText = function(match) {
            var parts = [];
            match.iterateSets(function(set) {
                var part = _buildSetScoreSummaryText(set);
                if (part) {
                    parts.push(part);
                }
            });
            return parts.join(", ");
        };

        var _formatScoreSummary = function(match, player1First) {
            return _buildScoreSummaryText(match);
        };

        return {
            formatScoreSummary: _formatScoreSummary
        };
    };
}());
