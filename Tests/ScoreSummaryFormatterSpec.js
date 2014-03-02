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
            _match = window.tennisKata.model.match(_player1, _player2, 3, null);
            _scoreSummaryFormatter = window.tennisKata.presentation.scoreSummaryFormatter();
        });

        it_multiple(
            "is correct for various match states",
            function(player1ScoreParts, player2ScoreParts, player1First, expectedScoreSummaryText) {

                // Arrange, Act
                var i;

                var num1stSetGames1 = player1ScoreParts[0][0];
                var num1stSetGames2 = player2ScoreParts[0][0];
                playersWinLoveGames(num1stSetGames1, num1stSetGames2);
                if (num1stSetGames1 === 6 && num1stSetGames2 === 6) {
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
                if (num2ndSetGames1 === 6 && num2ndSetGames2 === 6) {
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
                var scoreSummaryText = _scoreSummaryFormatter.formatScoreSummary(_match, player1First);
                expect(scoreSummaryText).toBe(expectedScoreSummaryText);
            },
            [
                [[[0], [0], 0, 0], [[0], [0], 0, 0], true, ""],
                [[[0], [0], 0, 0], [[0], [0], 0, 0], false, ""],

                [[[2], [0], 0, 0], [[1], [0], 0, 0], true, "2-1"],
                [[[2], [0], 0, 0], [[1], [0], 0, 0], false, "1-2"],

                [[[2], [0], 0, 1], [[1], [0], 0, 2], true, "2-1 (15-30)"],
                [[[2], [0], 0, 1], [[1], [0], 0, 2], false, "1-2 (30-15)"],

                [[[3], [0], 0, 0], [[5], [0], 0, 0], true, "3-5"],
                [[[3], [0], 0, 0], [[5], [0], 0, 0], false, "5-3"],

                [[[6], [2], 0, 0], [[3], [4], 0, 0], true, "6-3, 2-4"],
                [[[6], [2], 0, 0], [[3], [4], 0, 0], false, "3-6, 4-2"],

                [[[6, 4], [0], 0, 0], [[6, 3], [0], 0, 0], true, "6-6 (4-3)"],
                [[[6, 4], [0], 0, 0], [[6, 3], [0], 0, 0], false, "6-6 (3-4)"],

                [[[6, 7], [0], 0, 0], [[6, 4], [0], 0, 0], true, "7-6<sup><i>(7-4)</i></sup>"],
                [[[6, 7], [0], 0, 0], [[6, 4], [0], 0, 0], false, "6-7<sup><i>(4-7)</i></sup>"],

                [[[3], [6, 8], 2, 0], [[6], [6, 10], 5, 0], true, "3-6, 6-7<sup><i>(8-10)</i></sup>, 2-5"],
                [[[3], [6, 8], 2, 0], [[6], [6, 10], 5, 0], false, "6-3, 7-6<sup><i>(10-8)</i></sup>, 5-2"]
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
