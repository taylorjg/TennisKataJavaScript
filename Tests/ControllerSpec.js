/// <reference path="jasmine-1.3.1/jasmine.js" />
/// <reference path="it_multiple.js" />

(function () {

    "use strict";

    describe("Tests for TennisKata", function () {

        var player1;
        var player2;

        beforeEach(function() {
            player1 = window.tennisKata.factory.createPlayer("Becker");
            player2 = window.tennisKata.factory.createPlayer("McEnroe");
        });

        describe("Player tests", function() {

            it("players are independent of each other", function() {
                var playerX = window.tennisKata.factory.createPlayer("Azarenka");
                var playerY = window.tennisKata.factory.createPlayer("Wozniacki");
                expect(playerX.getName()).toBe("Azarenka");
                expect(playerY.getName()).toBe("Wozniacki");
            });
        });

//        describe("Scorecard tests", function() {
//
//            var scorecard;
//
//            var player1WinsLoveGame = function() {
//                for (var i = 1; i <= 4; i++) {
//                    scorecard.player1WinsPoint();
//                }
//            };
//
//            var player2WinsLoveGame = function() {
//                for (var i = 1; i <= 4; i++) {
//                    scorecard.player2WinsPoint();
//                }
//            };
//
//            var player1WinsLoveSet = function() {
//                for (var i = 1; i <= 6; i++) {
//                    player1WinsLoveGame();
//                }
//            };
//
//            var player2WinsLoveSet = function() {
//                for (var i = 1; i <= 6; i++) {
//                    player2WinsLoveGame();
//                }
//            };
//
//            var playersWinSixGamesEach = function() {
//                for (var i = 1; i <= 6; i++) {
//                    player1WinsLoveGame();
//                    player2WinsLoveGame();
//                }
//            };
//
//            beforeEach(function() {
//                scorecard = window.tennisKata.factory.createScorecard(player1, player2);
//            });
//
//            describe("First game tests", function() {
//
//                it_multiple(
//                    "raises the gameWon event if a game is won",
//                    function(numPoints1, numPoints2, expected) {
//
//                        // Arrange
//                        var gameWonEventRaised = false;
//                        scorecard.addGameWonEventHandler(function() {
//                            gameWonEventRaised = true;
//                        });
//
//                        // Act
//                        for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
//                            if (numPoints1 >= i) { scorecard.player1WinsPoint(); }
//                            if (numPoints2 >= i) { scorecard.player2WinsPoint(); }
//                        }
//
//                        // Assert
//                        expect(gameWonEventRaised).toBe(expected);
//                    },
//                    [
//                        [4, 0, true],
//                        [0, 4, true],
//                        [2, 2, false],
//                        [4, 4, false],
//                        [3, 5, true],
//                        [5, 3, true],
//                        [6, 5, false],
//                        [7, 5, true]
//                    ]
//                );
//
//                it_multiple(
//                    "has the correct score properties after raising the gameWon event",
//                    function(numPoints1, numPoints2, expectedData) {
//
//                        // Arrange
//
//                        // Act
//                        for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
//                            if (numPoints1 >= i) { scorecard.player1WinsPoint(); }
//                            if (numPoints2 >= i) { scorecard.player2WinsPoint(); }
//                        }
//
//                        // Assert
//                        expect(scorecard.getPlayer1Points()).toEqual(expectedData.player1Points);
//                        expect(scorecard.getPlayer1Games()).toEqual(expectedData.player1Games);
//                        expect(scorecard.getPlayer1Sets()).toEqual(expectedData.player1Sets);
//                        expect(scorecard.getPlayer2Points()).toEqual(expectedData.player2Points);
//                        expect(scorecard.getPlayer2Games()).toEqual(expectedData.player2Games);
//                        expect(scorecard.getPlayer2Sets()).toEqual(expectedData.player2Sets);
//                    },
//                    [
//                        [4, 0, {
//                            player1Points: 0,
//                            player1Games: 1,
//                            player1Sets: 0,
//                            player2Points: 0,
//                            player2Games: 0,
//                            player2Sets: 0
//                        }]
//                    ]
//                );
//
//                it("supports multiple listeners for the gameWon event", function() {
//
//                    // Arrange
//                    var gameWonEventRaised1 = false;
//                    var gameWonEventRaised2 = false;
//                    scorecard.addGameWonEventHandler(function() {
//                        gameWonEventRaised1 = true;
//                    });
//                    scorecard.addGameWonEventHandler(function() {
//                        gameWonEventRaised2 = true;
//                    });
//
//                    // Act
//                    player1WinsLoveGame();
//
//                    // Assert
//                    expect(gameWonEventRaised1).toBe(true);
//                    expect(gameWonEventRaised2).toBe(true);
//                });
//            });
//
//            describe("Set tests", function() {
//
//                it_multiple(
//                    "raises the setWon event if a set is won",
//                    function(numGames1, numGames2, expected) {
//
//                        // Arrange
//                        var setWonEventRaised = false;
//                        scorecard.addSetWonEventHandler(function() {
//                            setWonEventRaised = true;
//                        });
//
//                        // Act
//                        for (var i = 1; i <= Math.max(numGames1, numGames2); i++) {
//                            if (numGames1 >= i) { player1WinsLoveGame(); }
//                            if (numGames2 >= i) { player2WinsLoveGame(); }
//                        }
//
//                        // Assert
//                        expect(setWonEventRaised).toBe(expected);
//                    },
//                    [
//                        [1, 0, false],
//                        [2, 0, false],
//                        [3, 0, false],
//                        [4, 0, false],
//                        [5, 0, false],
//                        [6, 0, true]
//                    ]);
//
//                it_multiple(
//                    "has the correct score properties after raising the setWon event",
//                    function(numGames1, numGames2, expectedData) {
//
//                        // Arrange
//
//                        // Act
//                        for (var i = 1; i <= Math.max(numGames1, numGames2); i++) {
//                            if (numGames1 >= i) { player1WinsLoveGame(); }
//                            if (numGames2 >= i) { player2WinsLoveGame(); }
//                        }
//
//                        // Assert
//                        expect(scorecard.getPlayer1Points()).toEqual(expectedData.player1Points);
//                        expect(scorecard.getPlayer1Games()).toEqual(expectedData.player1Games);
//                        expect(scorecard.getPlayer1Sets()).toEqual(expectedData.player1Sets);
//                        expect(scorecard.getPlayer2Points()).toEqual(expectedData.player2Points);
//                        expect(scorecard.getPlayer2Games()).toEqual(expectedData.player2Games);
//                        expect(scorecard.getPlayer2Sets()).toEqual(expectedData.player2Sets);
//                    },
//                    [
//                        [6, 0, {
//                            player1Points: 0,
//                            player1Games: 0,
//                            player1Sets: 1,
//                            player2Points: 0,
//                            player2Games: 0,
//                            player2Sets: 0
//                        }]
//                    ]
//                );
//            });
//
//            describe("Tiebreaker tests", function() {
//
//                it("enters tie-breaker mode at six games all when not last set", function() {
//
//                    scorecard.setMatchLength(5);
//                    playersWinSixGamesEach();
//
//                    expect(scorecard.getPlayer1Points()).toEqual(0);
//                    expect(scorecard.getPlayer1Games()).toEqual(6);
//                    expect(scorecard.getPlayer1Sets()).toEqual(0);
//                    expect(scorecard.getPlayer2Points()).toEqual(0);
//                    expect(scorecard.getPlayer2Games()).toEqual(6);
//                    expect(scorecard.getPlayer2Sets()).toEqual(0);
//                    expect(scorecard.isTieBreaker()).toBe(true);
//                });
//
//                it("leaves tie-breaker mode after a tie-breaker set is won", function() {
//
//                    scorecard.setMatchLength(5);
//                    playersWinSixGamesEach();
//
//                    expect(scorecard.getPlayer1Points()).toEqual(0);
//                    expect(scorecard.getPlayer1Games()).toEqual(6);
//                    expect(scorecard.getPlayer1Sets()).toEqual(0);
//                    expect(scorecard.getPlayer2Points()).toEqual(0);
//                    expect(scorecard.getPlayer2Games()).toEqual(6);
//                    expect(scorecard.getPlayer2Sets()).toEqual(0);
//                    expect(scorecard.isTieBreaker()).toBe(true);
//
//                    for (var i = 1; i <= 7; i++) {
//                        scorecard.player1WinsPoint();
//                    }
//
//                    expect(scorecard.getPlayer1Points()).toEqual(0);
//                    expect(scorecard.getPlayer1Games()).toEqual(0);
//                    expect(scorecard.getPlayer1Sets()).toEqual(1);
//                    expect(scorecard.getPlayer2Points()).toEqual(0);
//                    expect(scorecard.getPlayer2Games()).toEqual(0);
//                    expect(scorecard.getPlayer2Sets()).toEqual(0);
//                    expect(scorecard.isTieBreaker()).toBe(false);
//                });
//
//                it("does not enter tie-breaker mode at six games all when last set", function() {
//
//                    scorecard.setMatchLength(5);
//                    player1WinsLoveSet();
//                    player1WinsLoveSet();
//                    player2WinsLoveSet();
//                    player2WinsLoveSet();
//                    playersWinSixGamesEach();
//
//                    expect(scorecard.getPlayer1Points()).toEqual(0);
//                    expect(scorecard.getPlayer1Games()).toEqual(6);
//                    expect(scorecard.getPlayer1Sets()).toEqual(2);
//                    expect(scorecard.getPlayer2Points()).toEqual(0);
//                    expect(scorecard.getPlayer2Games()).toEqual(6);
//                    expect(scorecard.getPlayer2Sets()).toEqual(2);
//                    expect(scorecard.isTieBreaker()).toBe(false);
//                });
//            });
//
//            describe("Reset tests", function() {
//
//                it("sets points, game and sets back to 0 after a reset", function() {
//
//                    player1WinsLoveSet();
//                    player1WinsLoveSet();
//                    player2WinsLoveSet();
//
//                    player1WinsLoveGame();
//                    player1WinsLoveGame();
//                    player2WinsLoveGame();
//                    player2WinsLoveGame();
//                    player2WinsLoveGame();
//
//                    scorecard.player1WinsPoint();
//                    scorecard.player2WinsPoint();
//                    scorecard.player2WinsPoint();
//
//                    expect(scorecard.getPlayer1Points()).toEqual(1);
//                    expect(scorecard.getPlayer1Games()).toEqual(2);
//                    expect(scorecard.getPlayer1Sets()).toEqual(2);
//                    expect(scorecard.getPlayer2Points()).toEqual(2);
//                    expect(scorecard.getPlayer2Games()).toEqual(3);
//                    expect(scorecard.getPlayer2Sets()).toEqual(1);
//
//                    scorecard.reset();
//
//                    expect(scorecard.getPlayer1Points()).toEqual(0);
//                    expect(scorecard.getPlayer1Games()).toEqual(0);
//                    expect(scorecard.getPlayer1Sets()).toEqual(0);
//                    expect(scorecard.getPlayer2Points()).toEqual(0);
//                    expect(scorecard.getPlayer2Games()).toEqual(0);
//                    expect(scorecard.getPlayer2Sets()).toEqual(0);
//                });
//            });
//        });

        describe("Controller tests", function() {

            var controller;

            var player1WinsLoveGame = function() {
                for (var i = 1; i <= 4; i++) {
                    controller.player1WinsPoint();
                }
            };

            var player2WinsLoveGame = function() {
                for (var i = 1; i <= 4; i++) {
                    controller.player2WinsPoint();
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

//            var playersWinSixGamesEach = function() {
//                for (var i = 1; i <= 6; i++) {
//                    player1WinsLoveGame();
//                    player2WinsLoveGame();
//                }
//            };

            beforeEach(function() {
                controller = window.tennisKata.controller();
                controller.init();
            });

            it("raises the scoredChanged event when a point is scored", function() {
                var eventRaised = false;
                controller.addScoreChangedEventHandler(function() {
                    eventRaised = true;
                });
                controller.player1WinsPoint();
                expect(eventRaised).toBe(true);
            });

//            describe("which player is currently serving", function() {
//
//                var servingHistory;
//
//                beforeEach(function() {
//
//                    servingHistory = [];
//
//                    controller.addServerChangedEventHandler(function(server) {
//                        servingHistory.push(server);
//                    });
//                });
//
//                it("changes after each game", function() {
//
//                    controller.setMatchLength(3);
//                    player1WinsLoveGame();
//                    player2WinsLoveGame();
//                    player1WinsLoveGame();
//                    player2WinsLoveGame();
//
//                    expect(servingHistory.length).toBe(4);
//                    expect(servingHistory[0]).toBe(controller.getPlayer2());
//                    expect(servingHistory[1]).toBe(controller.getPlayer1());
//                    expect(servingHistory[2]).toBe(controller.getPlayer2());
//                    expect(servingHistory[3]).toBe(controller.getPlayer1());
//                });
//
//                it("is correct for the first few points of a tie-breaker", function() {
//
//                    controller.setMatchLength(3);
//                    playersWinSixGamesEach();
//
//                    controller.player1WinsPoint();
//
//                    controller.player1WinsPoint();
//                    controller.player1WinsPoint();
//
//                    controller.player1WinsPoint();
//                    controller.player1WinsPoint();
//
//                    controller.player1WinsPoint();
//
//                    expect(servingHistory.length).toBe(15);
//                    expect(servingHistory[0]).toBe(controller.getPlayer2());
//                    expect(servingHistory[1]).toBe(controller.getPlayer1());
//                    expect(servingHistory[2]).toBe(controller.getPlayer2());
//                    expect(servingHistory[3]).toBe(controller.getPlayer1());
//                    expect(servingHistory[4]).toBe(controller.getPlayer2());
//                    expect(servingHistory[5]).toBe(controller.getPlayer1());
//                    expect(servingHistory[6]).toBe(controller.getPlayer2());
//                    expect(servingHistory[7]).toBe(controller.getPlayer1());
//                    expect(servingHistory[8]).toBe(controller.getPlayer2());
//                    expect(servingHistory[9]).toBe(controller.getPlayer1());
//                    expect(servingHistory[10]).toBe(controller.getPlayer2());
//                    expect(servingHistory[11]).toBe(controller.getPlayer1());
//
//                    expect(servingHistory[12]).toBe(controller.getPlayer2());
//                    expect(servingHistory[13]).toBe(controller.getPlayer1());
//                    expect(servingHistory[14]).toBe(controller.getPlayer2());
//                });
//
//                it("is correct at the start of a new set that was not decided by a tie-breaker", function() {
//
//                    controller.setMatchLength(3);
//                    player1WinsLoveSet();
//                    player1WinsLoveGame();
//
//                    expect(servingHistory.length).toBe(7);
//                    expect(servingHistory[0]).toBe(controller.getPlayer2());
//                    expect(servingHistory[1]).toBe(controller.getPlayer1());
//                    expect(servingHistory[2]).toBe(controller.getPlayer2());
//                    expect(servingHistory[3]).toBe(controller.getPlayer1());
//                    expect(servingHistory[4]).toBe(controller.getPlayer2());
//                    expect(servingHistory[5]).toBe(controller.getPlayer1());
//                    expect(servingHistory[6]).toBe(controller.getPlayer2());
//                });
//
//                describe("is correct at the start of a new set that was decided by a tie-breaker", function() {
//
//                    it("when the first and last tie-breaker points were served by different players", function() {
//
//                        controller.setMatchLength(3);
//                        playersWinSixGamesEach();
//                        servingHistory = [];
//
//                        controller.player1WinsPoint(); // p1 -> p2
//
//                        controller.player1WinsPoint();
//                        controller.player1WinsPoint(); // p2 -> p1
//
//                        controller.player1WinsPoint();
//                        controller.player1WinsPoint(); // p1 -> p2
//
//                        controller.player1WinsPoint();
//                        controller.player1WinsPoint(); // p2 to serve the first game of the next set so no flip
//
//                        expect(servingHistory.length).toBe(3);
//                        expect(servingHistory[0]).toBe(controller.getPlayer2());
//                        expect(servingHistory[1]).toBe(controller.getPlayer1());
//                        expect(servingHistory[2]).toBe(controller.getPlayer2());
//                    });
//
//                    it("when the first and last tie-breaker points were served by the same player", function() {
//
//                        controller.setMatchLength(3);
//                        playersWinSixGamesEach();
//                        servingHistory = [];
//
//                        controller.player1WinsPoint(); // p1 -> p2
//
//                        controller.player1WinsPoint();
//                        controller.player1WinsPoint(); // p2 -> p1
//
//                        controller.player1WinsPoint();
//                        controller.player1WinsPoint(); // p1 -> p2
//
//                        controller.player2WinsPoint();
//                        controller.player2WinsPoint(); // p2 -> p1
//
//                        controller.player1WinsPoint();
//                        controller.player1WinsPoint(); // p1 -> p2
//
//                        expect(servingHistory.length).toBe(5);
//                        expect(servingHistory[0]).toBe(controller.getPlayer2());
//                        expect(servingHistory[1]).toBe(controller.getPlayer1());
//                        expect(servingHistory[2]).toBe(controller.getPlayer2());
//                        expect(servingHistory[3]).toBe(controller.getPlayer1());
//                        expect(servingHistory[4]).toBe(controller.getPlayer2());
//                    });
//                });
//            });

            it("raises the reset event when the controller is reset", function() {
                var resetEventRaised = false;
                controller.addResetEventHandler(function() {
                    resetEventRaised = true;
                });
                controller.reset();
                expect(resetEventRaised).toBe(true);
            });

            it_multiple(
                "raises the matchWon event passing the winner when the match is won",
                function(matchLength, numSets1, numSets2, expectedWinnerNumber) {

                    // Arrange
                    var matchWonEventData = null;
                    controller.addMatchWonEventHandler(function(x) {
                        matchWonEventData = x;
                    });

                    // Act
                    controller.setMatchLength(matchLength);
                    for (var i = 1; i <= Math.max(numSets1, numSets2); i++) {
                        if (numSets1 >= i) { player1WinsLoveSet(); }
                        if (numSets2 >= i) { player2WinsLoveSet(); }
                    }

                    // Assert
                    var actualWinner = matchWonEventData.getMatchWinner();
                    var expectedWinner = (expectedWinnerNumber === 1) ? controller.getPlayer1() : controller.getPlayer2();
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
                controller.setMatchLength(3);
                expect(controller.getMatchLength()).toBe(3);
                controller.setMatchLength(5);
                expect(controller.getMatchLength()).toBe(5);
            });
        });
    });
} ());
