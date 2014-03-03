/**
 * Created by taylojo on 24/02/14.
 */

(function(){

    "use strict";

    describe("ScoreSummaryFormatter tests", function() {

        var _matchUtils;
        var _scoreSummaryFormatter;

        beforeEach(function() {
            _matchUtils = window.tennisKata.tests.common.matchUtils("Azarenka", "Wozniacki", 3);
            _scoreSummaryFormatter = window.tennisKata.presentation.scoreSummaryFormatter();
        });

        it_multiple(
            "is correct for various match states",
            function(player1ScoreParts, player2ScoreParts, player1First, expectedScoreSummaryText) {

                // Arrange, Act
                _matchUtils.scorePoints(player1ScoreParts, player2ScoreParts);

                // Assert
                var scoreSummaryText = _scoreSummaryFormatter.formatScoreSummary(_matchUtils.getMatch(), player1First);
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
    });
}());
