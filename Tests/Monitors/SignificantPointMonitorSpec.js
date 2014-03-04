/**
 * Created by jonathantaylor on 04/03/2014.
 */

(function(){

    "use strict";

    describe("SignificantPointMonitor tests", function() {

        var _controllerUtils;
        var _controller;
        var _currentServerMonitor;
        var _significantPointMonitor;
        var _actualBreakPointEventData = null;
        var _actualSetPointEventData = null;
        var _actualMatchPointEventData = null;

        beforeEach(function() {
            _controllerUtils = window.tennisKata.tests.common.controllerUtils();
            _controller = _controllerUtils.getController();
            _currentServerMonitor = window.tennisKata.monitors.currentServerMonitor(true /* player1First */);
            _significantPointMonitor = window.tennisKata.monitors.significantPointMonitor();
            _controller.addMonitor(_currentServerMonitor);
            _controller.addMonitor(_significantPointMonitor);
            _controller.init();

            _actualBreakPointEventData = null;
            _actualSetPointEventData = null;
            _actualMatchPointEventData = null;

            _significantPointMonitor.addBreakPointEventHandler(function(breakPoints, player) {
                _actualBreakPointEventData = {
                    breakPoints: breakPoints
                };
                if (player === _controller.getPlayer1()) { _actualBreakPointEventData.playerNumber = 1; }
                if (player === _controller.getPlayer2()) { _actualBreakPointEventData.playerNumber = 2; }
            });

            _significantPointMonitor.addSetPointEventHandler(function(setPoints, player) {
                _actualSetPointEventData = {
                    setPoints: setPoints
                };
                if (player === _controller.getPlayer1()) { _actualSetPointEventData.playerNumber = 1; }
                if (player === _controller.getPlayer2()) { _actualSetPointEventData.playerNumber = 2; }
            });

            _significantPointMonitor.addMatchPointEventHandler(function(matchPoints, player) {
                _actualMatchPointEventData = {
                    matchPoints: matchPoints
                };
                if (player === _controller.getPlayer1()) { _actualMatchPointEventData.playerNumber = 1; }
                if (player === _controller.getPlayer2()) { _actualMatchPointEventData.playerNumber = 2; }
            });
        });

        it_multiple(
            "raises the breakPoint event at the right time",
            function(player1ScoreParts, player2ScoreParts, expectedEventData) {

                // Arrange, Act
                _controllerUtils.scorePoints(player1ScoreParts, player2ScoreParts);

                // Assert
                expect(_actualBreakPointEventData).toEqual(expectedEventData);
                expect(_actualSetPointEventData).toBeNull();
                expect(_actualMatchPointEventData).toBeNull();
            },
            [
                [[[0], [0], 0, 0], [[0], [0], 0, 0], null],
                [[[1], [0], 0, 3], [[0], [0], 0, 2], { breakPoints: 1, playerNumber: 1}],
                [[[1], [0], 0, 3], [[0], [0], 0, 1], { breakPoints: 2, playerNumber: 1}],
                [[[1], [0], 0, 3], [[0], [0], 0, 0], { breakPoints: 3, playerNumber: 1}],
                [[[0], [0], 0, 2], [[0], [0], 0, 3], { breakPoints: 1, playerNumber: 2}],
                [[[0], [0], 0, 1], [[0], [0], 0, 3], { breakPoints: 2, playerNumber: 2}],
                [[[0], [0], 0, 0], [[0], [0], 0, 3], { breakPoints: 3, playerNumber: 2}]
            ]
        );

        it_multiple(
            "raises the setPoint event at the right time",
            function(player1ScoreParts, player2ScoreParts, expectedEventData) {

                // Arrange, Act
                _controllerUtils.scorePoints(player1ScoreParts, player2ScoreParts);

                // Assert
                expect(_actualSetPointEventData).toEqual(expectedEventData);
                expect(_actualMatchPointEventData).toBeNull();
            },
            [
                [[[0], [0], 0, 0], [[0], [0], 0, 0], null],
                [[[5], [0], 0, 3], [[2], [0], 0, 2], { setPoints: 1, playerNumber: 1}],
                [[[5], [0], 0, 3], [[2], [0], 0, 1], { setPoints: 2, playerNumber: 1}],
                [[[5], [0], 0, 3], [[2], [0], 0, 0], { setPoints: 3, playerNumber: 1}],
                [[[2], [0], 0, 2], [[5], [0], 0, 3], { setPoints: 1, playerNumber: 2}],
                [[[2], [0], 0, 1], [[5], [0], 0, 3], { setPoints: 2, playerNumber: 2}],
                [[[2], [0], 0, 0], [[5], [0], 0, 3], { setPoints: 3, playerNumber: 2}],
                [[[6, 6], [0], 0, 0], [[6, 5], [0], 0, 0], { setPoints: 1, playerNumber: 1}],
                [[[6, 6], [0], 0, 0], [[6, 4], [0], 0, 0], { setPoints: 2, playerNumber: 1}],
                [[[6, 6], [0], 0, 0], [[6, 3], [0], 0, 0], { setPoints: 3, playerNumber: 1}],
                [[[6, 6], [0], 0, 0], [[6, 2], [0], 0, 0], { setPoints: 4, playerNumber: 1}],
                [[[6, 6], [0], 0, 0], [[6, 1], [0], 0, 0], { setPoints: 5, playerNumber: 1}],
                [[[6, 6], [0], 0, 0], [[6, 0], [0], 0, 0], { setPoints: 6, playerNumber: 1}],
                [[[6, 7], [0], 0, 0], [[6, 6], [0], 0, 0], { setPoints: 1, playerNumber: 1}],
                [[[6, 5], [0], 0, 0], [[6, 6], [0], 0, 0], { setPoints: 1, playerNumber: 2}],
                [[[6, 4], [0], 0, 0], [[6, 6], [0], 0, 0], { setPoints: 2, playerNumber: 2}],
                [[[6, 3], [0], 0, 0], [[6, 6], [0], 0, 0], { setPoints: 3, playerNumber: 2}],
                [[[6, 2], [0], 0, 0], [[6, 6], [0], 0, 0], { setPoints: 4, playerNumber: 2}],
                [[[6, 1], [0], 0, 0], [[6, 6], [0], 0, 0], { setPoints: 5, playerNumber: 2}],
                [[[6, 0], [0], 0, 0], [[6, 6], [0], 0, 0], { setPoints: 6, playerNumber: 2}],
                [[[6, 6], [0], 0, 0], [[6, 7], [0], 0, 0], { setPoints: 1, playerNumber: 2}]
            ]
        );

        it_multiple(
            "raises the matchPoint event at the right time",
            function(player1ScoreParts, player2ScoreParts, expectedEventData) {

                // Arrange, Act
                _controllerUtils.scorePoints(player1ScoreParts, player2ScoreParts);

                // Assert
                expect(_actualMatchPointEventData).toEqual(expectedEventData);
            },
            [
                [[[0], [0], 0, 0], [[0], [0], 0, 0], null],
                [[[6], [5], 0, 3], [[0], [2], 0, 2], { matchPoints: 1, playerNumber: 1}],
                [[[6], [5], 0, 3], [[0], [2], 0, 1], { matchPoints: 2, playerNumber: 1}],
                [[[6], [5], 0, 3], [[0], [2], 0, 0], { matchPoints: 3, playerNumber: 1}],
                [[[6], [0], 8, 3], [[0], [6], 7, 2], { matchPoints: 1, playerNumber: 1}],
                [[[6], [0], 8, 3], [[0], [6], 7, 1], { matchPoints: 2, playerNumber: 1}],
                [[[6], [0], 8, 3], [[0], [6], 7, 0], { matchPoints: 3, playerNumber: 1}],
                [[[0], [2], 0, 2], [[6], [5], 0, 3], { matchPoints: 1, playerNumber: 2}],
                [[[0], [2], 0, 1], [[6], [5], 0, 3], { matchPoints: 2, playerNumber: 2}],
                [[[0], [2], 0, 0], [[6], [5], 0, 3], { matchPoints: 3, playerNumber: 2}],
                [[[0], [6], 7, 2], [[6], [0], 8, 3], { matchPoints: 1, playerNumber: 2}],
                [[[0], [6], 7, 1], [[6], [0], 8, 3], { matchPoints: 2, playerNumber: 2}],
                [[[0], [6], 7, 0], [[6], [0], 8, 3], { matchPoints: 3, playerNumber: 2}]
            ]
        );
    });
}());
