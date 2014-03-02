/**
 * Created by jonathantaylor on 02/03/2014.
 */

(function(){

    describe("CurrentServerMonitor tests", function() {

        var _controller;
        var _currentServerMonitor;

        beforeEach(function() {
            _controller = window.tennisKata.controller();
            _currentServerMonitor = window.tennisKata.monitors.currentServerMonitor(_controller.getPlayer1());
            _controller.addMonitor(_currentServerMonitor);
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
            ]);
        var player1WinsPoint = function() {
            _controller.player1WinsPoint();
        };

        var player2WinsPoint = function() {
            _controller.player2WinsPoint();
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
