(function () {

    "use strict";

    describe("Controller tests", function() {

        var _player1;
        var _player2;
        var _controller;

        beforeEach(function() {
            _player1 = window.tennisKata.model.player("Becker");
            _player2 = window.tennisKata.model.player("McEnroe");
            _controller = window.tennisKata.controller();
            _controller.init();
        });

        it("raises the scoredChanged event when a point is scored", function() {
            var eventRaised = false;
            _controller.addScoreChangedEventHandler(function() {
                eventRaised = true;
            });
            _controller.player1WinsPoint();
            expect(eventRaised).toBe(true);
        });

        it("raises the reset event when the controller is reset", function() {
            var resetEventRaised = false;
            _controller.addResetEventHandler(function() {
                resetEventRaised = true;
            });
            _controller.reset();
            expect(resetEventRaised).toBe(true);
        });

        it_multiple(
            "raises the matchWon event passing the winner when the match is won",
            function(matchLength, numSets1, numSets2, expectedWinnerNumber) {

                // Arrange
                var matchWonEventData = null;
                _controller.addMatchWonEventHandler(function(x) {
                    matchWonEventData = x;
                });

                // Act
                _controller.setMatchLength(matchLength);
                for (var i = 1; i <= Math.max(numSets1, numSets2); i++) {
                    if (numSets1 >= i) { player1WinsLoveSet(); }
                    if (numSets2 >= i) { player2WinsLoveSet(); }
                }

                // Assert
                var actualWinner = matchWonEventData.getMatchWinner();
                var expectedWinner = (expectedWinnerNumber === 1) ? _controller.getPlayer1() : _controller.getPlayer2();
                expect(actualWinner).toBe(expectedWinner);
            },
            [
                [1, 1, 0, 1],
                [1, 0, 1, 2],

                [3, 2, 0, 1],
                [3, 2, 1, 1],
                [3, 0, 2, 2],
                [3, 1, 2, 2],

                [5, 3, 0, 1],
                [5, 3, 1, 1],
                [5, 3, 2, 1],
                [5, 0, 3, 2],
                [5, 1, 3, 2],
                [5, 2, 3, 2]
            ]
        );

        it("allows the match length to be retrieved", function() {
            _controller.setMatchLength(3);
            expect(_controller.getMatchLength()).toBe(3);
            _controller.setMatchLength(5);
            expect(_controller.getMatchLength()).toBe(5);
        });

        var player1WinsLoveGame = function() {
            for (var i = 1; i <= 4; i++) {
                _controller.player1WinsPoint();
            }
        };

        var player2WinsLoveGame = function() {
            for (var i = 1; i <= 4; i++) {
                _controller.player2WinsPoint();
            }
        };

        var player1WinsLoveSet = function() {
            for (var i = 1; i <= 6; i++) {
                player1WinsLoveGame();
            }
        };

        var player2WinsLoveSet = function() {
            for (var i = 1; i <= 6; i++) {
                player2WinsLoveGame();
            }
        };
    });
} ());
