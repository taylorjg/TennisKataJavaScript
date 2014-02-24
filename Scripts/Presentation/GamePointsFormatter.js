/**
 * Created by taylojo on 24/02/14.
 */

(function(){

    "use strict";
    window.tennisKata = window.tennisKata || {};
    window.tennisKata.presentation = window.tennisKata.presentation || {};

    window.tennisKata.presentation.gamePointsFormatter = function() {

        var _formatTieBreakGamePoints = function(game) {
            var player1Points = game.getPlayer1Points();
            var player2Points = game.getPlayer2Points();
            return [player1Points, player2Points];
        };

        var _formatNormalGamePoints = function(game) {
            var player1Points = game.getPlayer1Points();
            var player2Points = game.getPlayer2Points();
            return [player1Points, player2Points];
        };

        var _formatGamePointsSeparately = function(game) {
            return (game.isTieBreakGame()) ? _formatTieBreakGamePoints(game)
                : _formatNormalGamePoints(game);
        };

        var _formatGamePointsTogether = function(game) {
            var separateGamePointsText = _formatGamePointsSeparately(game);
            return separateGamePointsText.join("-");
        };

        return {
            formatGamePointsSeparately: _formatGamePointsSeparately,
            formatGamePointsTogether: _formatGamePointsTogether
        };
    };
}());
