/**
 * Created by jonathantaylor on 02/03/2014.
 */

(function(){

    "use strict";

    describe("CurrentServerMonitor tests", function() {

        var _controllerUtils;
        var _controller;
        var _currentServerMonitor;

        beforeEach(function() {
            _controllerUtils = window.tennisKata.tests.common.controllerUtils();
            _controller = _controllerUtils.getController();
            _currentServerMonitor = window.tennisKata.monitors.currentServerMonitor(true /* player1First */);
            _controller.addMonitor(_currentServerMonitor);
            _controller.init();
        });

        it_multiple(
            "raises the serverChanged event at the correct time",
            function(player1ScoreParts, player2ScoreParts, expectedServerChangeHistory) {

                // Arrange
                var serverChangeHistory = [];
                _currentServerMonitor.addServerChangedEventHandler(function(currentServer) {
                    var playerNumber = (currentServer === _controller.getPlayer1()) ? 1 : 2;
                    serverChangeHistory.push(playerNumber);
                });

                // Act
                _controllerUtils.scorePoints(player1ScoreParts, player2ScoreParts);

                // Assert
                expect(serverChangeHistory).toEqual(expectedServerChangeHistory);
            },
            [
                [[[0], [0], 0, 0], [[0], [0], 0, 0], []],
                [[[1], [0], 0, 0], [[0], [0], 0, 0], [2]],
                [[[2], [0], 0, 0], [[0], [0], 0, 0], [2, 1]],
                [[[3], [0], 0, 0], [[0], [0], 0, 0], [2, 1, 2]],
                [[[4], [0], 0, 0], [[0], [0], 0, 0], [2, 1, 2, 1]],
                [[[5], [0], 0, 0], [[0], [0], 0, 0], [2, 1, 2, 1, 2]],
                [[[6], [0], 0, 0], [[0], [0], 0, 0], [2, 1, 2, 1, 2, 1]],
                [[[6, 3], [0], 0, 0], [[6, 3], [0], 0, 0], [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]]
            ]
        );
    });
}());
