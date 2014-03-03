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
                _matchUtils.scorePoints(player1ScoreParts, player2ScoreParts);

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
