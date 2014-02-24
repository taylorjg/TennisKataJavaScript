/**
 * Created by taylojo on 24/02/14.
 */

(function(){

    "use strict";

    describe("ScoreSummaryFormatter tests", function() {

        var _player1;
        var _player2;
        var _match;
        var _scoreSummaryFormatter;

        beforeEach(function() {
            _player1 = window.tennisKata.factory.createPlayer("Azarenka");
            _player2 = window.tennisKata.factory.createPlayer("Wozniacki");
            _match = window.tennisKata.model.match(_player1, _player2, _player1, 3);
            _scoreSummaryFormatter = window.tennisKata.presentation.scoreSummaryFormatter();
        });

        it_multiple(
            "is correct for various match states that do not involve a tie break",
            function(player1ScoreParts, player2ScoreParts, expectedScoreSummaryText) {

                // Arrange, Act
                var num1stSetGames1 = player1ScoreParts[0];
                var num1stSetGames2 = player2ScoreParts[0];

                var num2ndSetGames1 = player1ScoreParts[1];
                var num2ndSetGames2 = player2ScoreParts[1];

                var num3rdSetGames1 = player1ScoreParts[2];
                var num3rdSetGames2 = player2ScoreParts[2];

                var numPoints1 = player1ScoreParts[3];
                var numPoints2 = player2ScoreParts[3];

                playersWinLoveGames(num1stSetGames1, num1stSetGames2);
                playersWinLoveGames(num2ndSetGames1, num2ndSetGames2);
                playersWinLoveGames(num3rdSetGames1, num3rdSetGames2);

                for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                    if (numPoints1 >= i) { player1WinsPoint(); }
                    if (numPoints2 >= i) { player2WinsPoint(); }
                }

                // Assert
                var scoreSummaryText = _scoreSummaryFormatter.formatScoreSummary(_match, true);
                expect(scoreSummaryText).toBe(expectedScoreSummaryText);
            },
            [
                [[0, 0, 0, 0], [0, 0, 0, 0], ""],
                [[2, 0, 0, 0], [1, 0, 0, 0], "2-1"],
                [[3, 0, 0, 0], [5, 0, 0, 0], "3-5"],
                [[6, 2, 0, 0], [3, 4, 0, 0], "6-3, 2-4"]
            ]
        );

        it_multiple(
            "is correct for various match states that do involve a tie break",
            function(player1ScoreParts, player2ScoreParts, expectedScoreSummaryText) {

                // Arrange, Act
                var i;

                var num1stSetGames1 = player1ScoreParts[0][0];
                var num1stSetGames2 = player2ScoreParts[0][0];
                playersWinLoveGames(num1stSetGames1, num1stSetGames2);
                if (player1ScoreParts[0].length === 2 && player2ScoreParts[0].length === 2) {
                    var num1stSetTieBreakerPoints1 = player1ScoreParts[0][1];
                    var num1stSetTieBreakerPoints2 = player2ScoreParts[0][1];
                    for (i = 1; i <= Math.max(num1stSetTieBreakerPoints1, num1stSetTieBreakerPoints2); i++) {
                        if (num1stSetTieBreakerPoints1 >= i) { player1WinsPoint(); }
                        if (num1stSetTieBreakerPoints2 >= i) { player2WinsPoint(); }
                    }
                }

                var num2ndSetGames1 = player1ScoreParts[1][0];
                var num2ndSetGames2 = player2ScoreParts[1][0];
                playersWinLoveGames(num2ndSetGames1, num2ndSetGames2);
                if (player1ScoreParts[1].length === 2 && player2ScoreParts[1].length === 2) {
                    var num2ndSetTieBreakerPoints1 = player1ScoreParts[1][1];
                    var num2ndSetTieBreakerPoints2 = player2ScoreParts[1][1];
                    for (i = 1; i <= Math.max(num2ndSetTieBreakerPoints1, num2ndSetTieBreakerPoints2); i++) {
                        if (num2ndSetTieBreakerPoints1 >= i) { player1WinsPoint(); }
                        if (num2ndSetTieBreakerPoints2 >= i) { player2WinsPoint(); }
                    }
                }

                var num3rdSetGames1 = player1ScoreParts[2];
                var num3rdSetGames2 = player2ScoreParts[2];
                playersWinLoveGames(num3rdSetGames1, num3rdSetGames2);

                var numPoints1 = player1ScoreParts[3];
                var numPoints2 = player2ScoreParts[3];
                for (i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                    if (numPoints1 >= i) { player1WinsPoint(); }
                    if (numPoints2 >= i) { player2WinsPoint(); }
                }

                // Assert
                var scoreSummaryText = _scoreSummaryFormatter.formatScoreSummary(_match, true);
                expect(scoreSummaryText).toBe(expectedScoreSummaryText);
            },
            [
                [[[6, 7], [0], 0, 0], [[6, 4], [0], 0, 0], "7-6<sup><i>(7-4)</i></sup>"],
                [[[3], [6, 8], 2, 0], [[6], [6, 10], 5, 0], "3-6, 6-7<sup><i>(8-10)</i></sup>, 2-5"]
            ]
        );

        var player1WinsPoint = function() {
            var point = window.tennisKata.model.point(_player1);
            _match.scorePoint(point);
        };

        var player2WinsPoint = function() {
            var point = window.tennisKata.model.point(_player2);
            _match.scorePoint(point);
        };

        var player1WinsLoveGame = function() {
            for (var i = 1; i <= 4; i++) {
                player1WinsPoint();
            }
        };

        var player2WinsLoveGame = function() {
            for (var i = 1; i <= 4; i++) {
                player2WinsPoint();
            }
        };

        var playersWinLoveGames = function(numGames1, numGames2) {
            for (var i = 1; i <= Math.max(numGames1, numGames2); i++) {
                if (numGames1 >= i) { player1WinsLoveGame(); }
                if (numGames2 >= i) { player2WinsLoveGame(); }
            }
        };
    });
}());
