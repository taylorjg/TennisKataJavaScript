/**
 * Created by taylojo on 26/02/14.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.presentation = window.tennisKata.presentation || {};

    window.tennisKata.presentation.setsGamesPointsFormatter = function() {

        var _gamePointsFormatter = window.tennisKata.presentation.gamePointsFormatter();

        var _rightJustifyScoreText = function(scoreText, minWidth) {
            var padding = "";
            for (var i = scoreText.length; i < minWidth; i++) {
                padding += "&nbsp;";
            }
            return padding + scoreText;
        };

        var _formatSetsGamesPoints = function(match) {

            var player1SetsText = "";
            var player2SetsText = "";
            var player1GamesText = "";
            var player2GamesText = "";
            var player1PointsText = "";
            var player2PointsText = "";

            var player1Sets = match.getPlayer1Sets();
            var player2Sets = match.getPlayer2Sets();
            if (player1Sets || player2Sets) {
                player1SetsText = _rightJustifyScoreText(player1Sets.toString(), 2);
                player2SetsText = _rightJustifyScoreText(player2Sets.toString(), 2);
            }

            var currentSet = null;
            match.iterateSets(function(set) {
                currentSet = set;
            });

            if (currentSet) {

                if (!currentSet.getSetWinner() || match.getMatchWinner()) {
                    var player1Games = currentSet.getPlayer1Games();
                    var player2Games = currentSet.getPlayer2Games();
                    if (player1Games || player2Games) {
                        player1GamesText = _rightJustifyScoreText(player1Games.toString(), 2);
                        player2GamesText = _rightJustifyScoreText(player2Games.toString(), 2);
                    }
                }

                var currentGame = null;
                currentSet.iterateGames(function(game) {
                    currentGame = game;
                });

                if (currentGame && !currentGame.getGameWinner()) {
                    var separateGamePointsText = _gamePointsFormatter.formatGamePointsSeparately(currentGame);
                    player1PointsText = separateGamePointsText[0];
                    player2PointsText = separateGamePointsText[1];
                }
            }

            return {
                player1SetsText: player1SetsText,
                player2SetsText: player2SetsText,
                player1GamesText: player1GamesText,
                player2GamesText: player2GamesText,
                player1PointsText: player1PointsText,
                player2PointsText: player2PointsText
            };
        };

        return {
            formatSetsGamesPoints: _formatSetsGamesPoints
        };
    };
}());
