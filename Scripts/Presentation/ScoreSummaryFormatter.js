/**
 * Created by taylojo on 24/02/14.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.presentation = window.tennisKata.presentation || {};

    window.tennisKata.presentation.scoreSummaryFormatter = function() {

        var _gamePointsFormatter = window.tennisKata.presentation.gamePointsFormatter();

        var _buildSetScoreSummaryText = function(set, player1First) {

            var playerAGames = (player1First) ? set.getPlayer1Games() : set.getPlayer2Games();
            var playerBGames = (player1First) ? set.getPlayer2Games() : set.getPlayer1Games();
            var setScoreSummaryText = playerAGames + "-" + playerBGames;

            var lastGame = null;
            set.iterateGames(function(game){
                lastGame = game;
            });

            if (lastGame !== null) {
                if (lastGame.getGameWinner()) {
                    if (lastGame.isTieBreakGame()) {
                        var playerATieBreakPoints = (player1First) ? lastGame.getPlayer1Points() : lastGame.getPlayer2Points();
                        var playerBTieBreakPoints = (player1First) ? lastGame.getPlayer2Points() : lastGame.getPlayer1Points();
                        setScoreSummaryText += "<sup><i>(" + playerATieBreakPoints + "-" + playerBTieBreakPoints + ")</i></sup>";
                    }
                }
                else {
                    setScoreSummaryText += " (" + _gamePointsFormatter.formatGamePointsTogether(lastGame, player1First) + ")";
                }
            }

            return setScoreSummaryText;
        };

        var _buildScoreSummaryText = function(match, player1First) {
            var parts = [];
            match.iterateSets(function(set) {
                var part = _buildSetScoreSummaryText(set, player1First);
                if (part) {
                    parts.push(part);
                }
            });
            return parts.join(", ");
        };

        var _formatScoreSummary = function(match, player1First) {
            return _buildScoreSummaryText(match, player1First);
        };

        return {
            formatScoreSummary: _formatScoreSummary
        };
    };
}());
