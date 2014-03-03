/**
 * Created by taylojo on 26/02/14.
 */

(function(){

    "use strict";

    var _matchUtils;
    var _setsGamesPointsFormatter;

    beforeEach(function() {
        _matchUtils = window.tennisKata.tests.common.matchUtils("Azarenka", "Wozniacki", 3);
        _setsGamesPointsFormatter = window.tennisKata.presentation.setsGamesPointsFormatter();
    });

    describe("SetsGamesPointsFormatter test", function() {

        it_multiple(
            "works",
            function(player1ScoreParts, player2ScoreParts, expectedViewModelParts) {

                // Arrange, Act
                var i;

                var num1stSetGames1 = player1ScoreParts[0][0];
                var num1stSetGames2 = player2ScoreParts[0][0];
                _matchUtils.playersWinLoveGames(num1stSetGames1, num1stSetGames2);
                if (num1stSetGames1 === 6 && num1stSetGames2 === 6) {
                    var num1stSetTieBreakerPoints1 = player1ScoreParts[0][1];
                    var num1stSetTieBreakerPoints2 = player2ScoreParts[0][1];
                    for (i = 1; i <= Math.max(num1stSetTieBreakerPoints1, num1stSetTieBreakerPoints2); i++) {
                        if (num1stSetTieBreakerPoints1 >= i) { _matchUtils.player1WinsPoint(); }
                        if (num1stSetTieBreakerPoints2 >= i) { _matchUtils.player2WinsPoint(); }
                    }
                }

                var num2ndSetGames1 = player1ScoreParts[1][0];
                var num2ndSetGames2 = player2ScoreParts[1][0];
                _matchUtils.playersWinLoveGames(num2ndSetGames1, num2ndSetGames2);
                if (num2ndSetGames1 === 6 && num2ndSetGames2 === 6) {
                    var num2ndSetTieBreakerPoints1 = player1ScoreParts[1][1];
                    var num2ndSetTieBreakerPoints2 = player2ScoreParts[1][1];
                    for (i = 1; i <= Math.max(num2ndSetTieBreakerPoints1, num2ndSetTieBreakerPoints2); i++) {
                        if (num2ndSetTieBreakerPoints1 >= i) { _matchUtils.player1WinsPoint(); }
                        if (num2ndSetTieBreakerPoints2 >= i) { _matchUtils.player2WinsPoint(); }
                    }
                }

                var num3rdSetGames1 = player1ScoreParts[2];
                var num3rdSetGames2 = player2ScoreParts[2];
                _matchUtils.playersWinLoveGames(num3rdSetGames1, num3rdSetGames2);

                var numPoints1 = player1ScoreParts[3];
                var numPoints2 = player2ScoreParts[3];
                for (i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                    if (numPoints1 >= i) { _matchUtils.player1WinsPoint(); }
                    if (numPoints2 >= i) { _matchUtils.player2WinsPoint(); }
                }

                // Assert
                var viewModel = _setsGamesPointsFormatter.formatSetsGamesPoints(_matchUtils.getMatch());
                expect(viewModel.player1SetsText).toBe(expectedViewModelParts[0]);
                expect(viewModel.player2SetsText).toBe(expectedViewModelParts[1]);
                expect(viewModel.player1GamesText).toBe(expectedViewModelParts[2]);
                expect(viewModel.player2GamesText).toBe(expectedViewModelParts[3]);
                expect(viewModel.player1PointsText).toBe(expectedViewModelParts[4]);
                expect(viewModel.player2PointsText).toBe(expectedViewModelParts[5]);
            },
            [
                [[[0], [0], 0, 0], [[0], [0], 0, 0], ["", "", "", "", "", ""]],
                [[[0], [0], 0, 1], [[0], [0], 0, 2], ["", "", "", "", "15", "30"]],
                [[[0], [0], 0, 3], [[0], [0], 0, 3], ["", "", "", "", "40", "40"]],
                [[[0], [0], 0, 4], [[0], [0], 0, 3], ["", "", "", "", "&nbsp;A", "40"]],
                [[[0], [0], 0, 3], [[0], [0], 0, 4], ["", "", "", "", "40", "&nbsp;A"]],
                [[[2], [0], 0, 0], [[1], [0], 0, 0], ["", "", "&nbsp;2", "&nbsp;1", "", ""]],
                [[[4], [0], 0, 2], [[4], [0], 0, 0], ["", "", "&nbsp;4", "&nbsp;4", "30", "&nbsp;0"]],
                [[[4], [0], 0, 1], [[4], [0], 0, 3], ["", "", "&nbsp;4", "&nbsp;4", "15", "40"]],
                [[[6], [0], 0, 0], [[4], [0], 0, 0], ["1", "0", "", "", "", ""]],
                [[[6, 4], [0], 0, 0], [[6, 3], [0], 0, 0], ["", "", "&nbsp;6", "&nbsp;6", "&nbsp;4", "&nbsp;3"]],
                [[[6, 7], [0], 0, 0], [[6, 4], [0], 0, 0], ["1", "0", "", "", "", ""]]
            ]
        );
    });
}());
