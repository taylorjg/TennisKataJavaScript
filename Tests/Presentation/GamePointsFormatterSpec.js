/**
 * Created by taylojo on 24/02/14.
 */

(function(){

    "use strict";

    var _matchUtils;
    var _gamePointsFormatter;

    beforeEach(function() {
        _matchUtils = window.tennisKata.tests.common.matchUtils("Azarenka", "Wozniacki", 3);
        _gamePointsFormatter = window.tennisKata.presentation.gamePointsFormatter();
    });

    describe("GamePointsFormatter tests", function() {

        it_multiple(
            "reports the correct score when points are scored in a normal game",
            function(numPoints1, numPoints2, expectedScoreText1, expectedScoreText2) {

                // Arrange, Act
                for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                    if (numPoints1 >= i) { _matchUtils.player1WinsPoint(); }
                    if (numPoints2 >= i) { _matchUtils.player2WinsPoint(); }
                }

                var lastGame = _matchUtils.getLastGame();
                var separateGamePointsText = _gamePointsFormatter.formatGamePointsSeparately(lastGame);

                // Assert
                expect(separateGamePointsText[0]).toBe(expectedScoreText1);
                expect(separateGamePointsText[1]).toBe(expectedScoreText2);
            },
            [
                [1, 0, "15", "0"],
                [2, 0, "30", "0"],
                [3, 0, "40", "0"],

                [1, 1, "15", "15"],
                [2, 1, "30", "15"],
                [3, 1, "40", "15"],

                [1, 2, "15", "30"],
                [2, 2, "30", "30"],
                [3, 2, "40", "30"],

                [1, 3, "15", "40"],
                [2, 3, "30", "40"],
                [3, 3, "40", "40"],

                [0, 1, "0", "15"],
                [0, 2, "0", "30"],
                [0, 3, "0", "40"],

                [4, 3, "A", "40"],
                [3, 4, "40", "A"],
                [4, 4, "40", "40"],
                [5, 4, "A", "40"],
                [4, 5, "40", "A"],
                [5, 5, "40", "40"],
                [6, 5, "A", "40"],
                [5, 6, "40", "A"]
            ]
        );

        it_multiple(
            "reports the correct score when points are scored in a tie break game",
            function(numPoints1, numPoints2, expectedScoreText1, expectedScoreText2) {

                // Arrange
                _matchUtils.playersWinSixGamesEach();

                // Act
                for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                    if (numPoints1 >= i) { _matchUtils.player1WinsPoint(); }
                    if (numPoints2 >= i) { _matchUtils.player2WinsPoint(); }
                }

                var lastGame = _matchUtils.getLastGame();
                var separateGamePointsText = _gamePointsFormatter.formatGamePointsSeparately(lastGame);

                // Assert
                expect(separateGamePointsText[0]).toBe(expectedScoreText1);
                expect(separateGamePointsText[1]).toBe(expectedScoreText2);
            },
            [
                [1, 2, "1", "2"]
            ]);
    });

}());
