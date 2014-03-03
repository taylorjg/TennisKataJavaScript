/**
 * Created by jonathantaylor on 27/02/2014.
 */

(function(){

    "use strict";

    var _matchUtils;
    var _previousSetsFormatter;

    beforeEach(function() {
        _matchUtils = window.tennisKata.tests.common.matchUtils("Azarenka", "Wozniacki", 3);
        _previousSetsFormatter = window.tennisKata.presentation.previousSetsFormatter();
    });

    describe("PreviousSetsFormatter tests", function() {

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
                var viewModel = _previousSetsFormatter.formatPreviousSets(_matchUtils.getMatch());
                expect(viewModel.player1Set1Games).toBe(expectedViewModelParts[0]);
                expect(viewModel.player2Set1Games).toBe(expectedViewModelParts[1]);
                expect(viewModel.player1Set2Games).toBe(expectedViewModelParts[2]);
                expect(viewModel.player2Set2Games).toBe(expectedViewModelParts[3]);
                expect(viewModel.player1Set3Games).toBe(expectedViewModelParts[4]);
                expect(viewModel.player2Set3Games).toBe(expectedViewModelParts[5]);
                expect(viewModel.player1Set4Games).toBe(expectedViewModelParts[6]);
                expect(viewModel.player2Set4Games).toBe(expectedViewModelParts[7]);
            },
            [
                [[[0], [0], 0, 0], [[0], [0], 0, 0], ["", "", "", "", "", "", "", ""]],
                [[[5], [0], 0, 0], [[3], [0], 0, 0], ["", "", "", "", "", "", "", ""]],
                [[[6], [0], 0, 0], [[4], [0], 0, 0], ["6", "4", "", "", "", "", "", ""]],
                [[[6, 4], [0], 0, 0], [[6, 3], [0], 0, 0], ["", "", "", "", "", "", "", ""]],
                [[[6, 7], [0], 0, 0], [[6, 4], [0], 0, 0], ["7", "6", "", "", "", "", "", ""]],
                [[[6], [6], 6, 0], [[1], [2], 3, 0], ["6", "1", "6", "2", "", "", "", ""]]
            ]
        );
    });
}());
