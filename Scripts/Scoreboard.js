(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    var LOVE_TEXT = "";
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

    window.tennisKata.scoreboard = function(scorecard) {

        var _scorecard = scorecard;

        var _getScores = function() {

            var player1PointsText = LOVE_TEXT;
            var player1GamesText = LOVE_TEXT;
            var player1SetsText = LOVE_TEXT;
            var player2PointsText = LOVE_TEXT;
            var player2GamesText = LOVE_TEXT;
            var player2SetsText = LOVE_TEXT;

            var p1p = _scorecard.getPlayer1Points();
            var p2p = _scorecard.getPlayer2Points();

            if (_scorecard.isTieBreaker()) {
                if (p1p > 0) { player1PointsText = p1p.toString(); }
                if (p2p > 0) { player2PointsText = p2p.toString(); }
            }
            else {
                if (p1p + p2p >= 6) {
                    player1PointsText = FORTY_TEXT;
                    player2PointsText = FORTY_TEXT;
                    if (p1p === p2p + 1) {
                        player1PointsText = ADVANTAGE_TEXT;
                    }
                    if (p2p === p1p + 1) {
                        player2PointsText = ADVANTAGE_TEXT;
                    }
                }
                else {
                    player1PointsText = POINTS_TO_TEXT[p1p];
                    player2PointsText = POINTS_TO_TEXT[p2p];
                }
            }

            var p1g = _scorecard.getPlayer1Games();
            var p2g = _scorecard.getPlayer2Games();

            if (p1g > 0) { player1GamesText = p1g.toString(); }
            if (p2g > 0) { player2GamesText = p2g.toString(); }

            var p1s = _scorecard.getPlayer1Sets();
            var p2s = _scorecard.getPlayer2Sets();

            if (p1s > 0) { player1SetsText = p1s.toString(); }
            if (p2s > 0) { player2SetsText = p2s.toString(); }

            var player1Score = [player1PointsText, player1GamesText, player1SetsText];
            var player2Score = [player2PointsText, player2GamesText, player2SetsText];

            return [player1Score, player2Score];
        };

        return {
            getScores: _getScores
        };
    };
} ());
