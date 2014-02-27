/**
 * Created by taylojo on 24/02/14.
 */

(function(){

    "use strict";

    var LOVE_TEXT = "0";
    var FIFTEEN_TEXT = "15";
    var THIRTY_TEXT = "30";
    var FORTY_TEXT = "40";
    var ADVANTAGE_TEXT = "A";

    var POINTS_TO_TEXT = [
        LOVE_TEXT,
        FIFTEEN_TEXT,
        THIRTY_TEXT,
        FORTY_TEXT
    ];

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.presentation = window.tennisKata.presentation || {};

    window.tennisKata.presentation.gamePointsFormatter = function() {

        var _formatTieBreakGamePoints = function(game) {
            var player1PointsText = game.getPlayer1Points().toString();
            var player2PointsText = game.getPlayer2Points().toString();
            return [player1PointsText, player2PointsText];
        };

        var _formatNormalGamePoints = function(game) {

            var player1Points = game.getPlayer1Points();
            var player2Points = game.getPlayer2Points();

            var player1PointsText = "";
            var player2PointsText = "";

            if (player1Points + player2Points >= 6) {

                player1PointsText = FORTY_TEXT;
                player2PointsText = FORTY_TEXT;

                if (player1Points === player2Points + 1) {
                    player1PointsText = ADVANTAGE_TEXT;
                }
                if (player2Points === player1Points + 1) {
                    player2PointsText = ADVANTAGE_TEXT;
                }
            }
            else {
                player1PointsText = POINTS_TO_TEXT[player1Points];
                player2PointsText = POINTS_TO_TEXT[player2Points];
            }

            return [player1PointsText, player2PointsText];
        };

        var _formatGamePointsSeparately = function(game) {

            if (game.getPlayer1Points() === 0 && game.getPlayer2Points() === 0) {
                return ["", ""];
            }

            return (game.isTieBreakGame()) ? _formatTieBreakGamePoints(game)
                : _formatNormalGamePoints(game);
        };

        var _formatGamePointsTogether = function(game, player1First) {
            var separateGamePointsText = _formatGamePointsSeparately(game);
            if (!player1First) {
                separateGamePointsText = separateGamePointsText.reverse();
            }
            return separateGamePointsText.join("-");
        };

        return {
            formatGamePointsSeparately: _formatGamePointsSeparately,
            formatGamePointsTogether: _formatGamePointsTogether
        };
    };
}());
