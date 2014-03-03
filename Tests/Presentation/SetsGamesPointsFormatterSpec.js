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
                _matchUtils.scorePoints(player1ScoreParts, player2ScoreParts);

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
