/// <reference path="RomanNumerals.js" />
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
                expect(playerX.getId()).not.toBe(playerY.getId());
            });
        });

        describe("Scorecard tests", function() {

            var scorecard;

            var player1WinsLoveGame = function() {
                for (var i = 1; i <= 4; i++) {
                    scorecard.player1WinsPoint();
                }
            };

            var player2WinsLoveGame = function() {
                for (var i = 1; i <= 4; i++) {
                    scorecard.player2WinsPoint();
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

            var winSixGamesEach = function() {
                for (var i = 1; i <= 6; i++) {
                    player1WinsLoveGame();
                    player2WinsLoveGame();
                }
            };

            beforeEach(function() {
                scorecard = window.tennisKata.factory.createScorecard(player1, player2);
            });

            describe("First game tests", function() {

                it_multiple(
                    "raises the gameWon event if a game is won",
                    function(numPoints1, numPoints2, expected) {

                        // Arrange
                        var gameWonEventRaised = false;
                        scorecard.addGameWonEventHandler(function() {
                            gameWonEventRaised = true;
                        });

                        // Act
                        for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                            if (numPoints1 >= i) { scorecard.player1WinsPoint(); }
                            if (numPoints2 >= i) { scorecard.player2WinsPoint(); }
                        }

                        // Assert
                        expect(gameWonEventRaised).toBe(expected);
                    },
                    [
                        [4, 0, true],
                        [0, 4, true],
                        [2, 2, false],
                        [4, 4, false],
                        [3, 5, true],
                        [5, 3, true],
                        [6, 5, false],
                        [7, 5, true]
                    ]
                );

                it_multiple(
                    "has the correct score properties after raising the gameWon event",
                    function(numPoints1, numPoints2, expectedData) {

                        // Arrange

                        // Act
                        for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                            if (numPoints1 >= i) { scorecard.player1WinsPoint(); }
                            if (numPoints2 >= i) { scorecard.player2WinsPoint(); }
                        }

                        // Assert
                        expect(scorecard.getPlayer1Points()).toEqual(expectedData.player1Points);
                        expect(scorecard.getPlayer1Games()).toEqual(expectedData.player1Games);
                        expect(scorecard.getPlayer1Sets()).toEqual(expectedData.player1Sets);
                        expect(scorecard.getPlayer2Points()).toEqual(expectedData.player2Points);
                        expect(scorecard.getPlayer2Games()).toEqual(expectedData.player2Games);
                        expect(scorecard.getPlayer2Sets()).toEqual(expectedData.player2Sets);
                    },
                    [
                        [4, 0, {
                            player1Points: 0,
                            player1Games: 1,
                            player1Sets: 0,
                            player2Points: 0,
                            player2Games: 0,
                            player2Sets: 0
                        }]
                    ]
                );

                it("supports multiple listeners for the gameWon event", function() {

                    // Arrange
                    var gameWonEventRaised1 = false;
                    var gameWonEventRaised2 = false;
                    scorecard.addGameWonEventHandler(function() {
                        gameWonEventRaised1 = true;
                    });
                    scorecard.addGameWonEventHandler(function() {
                        gameWonEventRaised2 = true;
                    });

                    // Act
                    player1WinsLoveGame();

                    // Assert
                    expect(gameWonEventRaised1).toBe(true);
                    expect(gameWonEventRaised2).toBe(true);
                });
            });

            describe("Set tests", function() {

                it_multiple(
                    "raises the setWon event if a set is won",
                    function(numGames1, numGames2, expected) {

                        // Arrange
                        var setWonEventRaised = false;
                        scorecard.addSetWonEventHandler(function() {
                            setWonEventRaised = true;
                        });

                        // Act
                        for (var i = 1; i <= Math.max(numGames1, numGames2); i++) {
                            if (numGames1 >= i) { player1WinsLoveGame(); }
                            if (numGames2 >= i) { player2WinsLoveGame(); }
                        }

                        // Assert
                        expect(setWonEventRaised).toBe(expected);
                    },
                    [
                        [1, 0, false],
                        [2, 0, false],
                        [3, 0, false],
                        [4, 0, false],
                        [5, 0, false],
                        [6, 0, true]
                    ]);

                it_multiple(
                    "has the correct score properties after raising the setWon event",
                    function(numGames1, numGames2, expectedData) {

                        // Arrange

                        // Act
                        for (var i = 1; i <= Math.max(numGames1, numGames2); i++) {
                            if (numGames1 >= i) { player1WinsLoveGame(); }
                            if (numGames2 >= i) { player2WinsLoveGame(); }
                        }

                        // Assert
                        expect(scorecard.getPlayer1Points()).toEqual(expectedData.player1Points);
                        expect(scorecard.getPlayer1Games()).toEqual(expectedData.player1Games);
                        expect(scorecard.getPlayer1Sets()).toEqual(expectedData.player1Sets);
                        expect(scorecard.getPlayer2Points()).toEqual(expectedData.player2Points);
                        expect(scorecard.getPlayer2Games()).toEqual(expectedData.player2Games);
                        expect(scorecard.getPlayer2Sets()).toEqual(expectedData.player2Sets);
                    },
                    [
                        [6, 0, {
                            player1Points: 0,
                            player1Games: 0,
                            player1Sets: 1,
                            player2Points: 0,
                            player2Games: 0,
                            player2Sets: 0
                        }]
                    ]
                );
            });

            describe("Tiebreaker tests", function() {

                it("enters tie-breaker mode at six games all when not last set", function() {

                    scorecard.setMatchLength(5);
                    winSixGamesEach();

                    expect(scorecard.getPlayer1Points()).toEqual(0);
                    expect(scorecard.getPlayer1Games()).toEqual(6);
                    expect(scorecard.getPlayer1Sets()).toEqual(0);
                    expect(scorecard.getPlayer2Points()).toEqual(0);
                    expect(scorecard.getPlayer2Games()).toEqual(6);
                    expect(scorecard.getPlayer2Sets()).toEqual(0);
                    expect(scorecard.isTieBreaker()).toBe(true);
                });

                it("leaves tie-breaker mode after a tie-breaker set is won", function() {

                    scorecard.setMatchLength(5);
                    winSixGamesEach();

                    expect(scorecard.getPlayer1Points()).toEqual(0);
                    expect(scorecard.getPlayer1Games()).toEqual(6);
                    expect(scorecard.getPlayer1Sets()).toEqual(0);
                    expect(scorecard.getPlayer2Points()).toEqual(0);
                    expect(scorecard.getPlayer2Games()).toEqual(6);
                    expect(scorecard.getPlayer2Sets()).toEqual(0);
                    expect(scorecard.isTieBreaker()).toBe(true);

                    for (var i = 1; i <= 7; i++) {
                        scorecard.player1WinsPoint();
                    }

                    expect(scorecard.getPlayer1Points()).toEqual(0);
                    expect(scorecard.getPlayer1Games()).toEqual(0);
                    expect(scorecard.getPlayer1Sets()).toEqual(1);
                    expect(scorecard.getPlayer2Points()).toEqual(0);
                    expect(scorecard.getPlayer2Games()).toEqual(0);
                    expect(scorecard.getPlayer2Sets()).toEqual(0);
                    expect(scorecard.isTieBreaker()).toBe(false);
                });

                it("does not enter tie-breaker mode at six games all when last set", function() {

                    scorecard.setMatchLength(5);
                    player1WinsLoveSet();
                    player1WinsLoveSet();
                    player2WinsLoveSet();
                    player2WinsLoveSet();
                    winSixGamesEach();

                    expect(scorecard.getPlayer1Points()).toEqual(0);
                    expect(scorecard.getPlayer1Games()).toEqual(6);
                    expect(scorecard.getPlayer1Sets()).toEqual(2);
                    expect(scorecard.getPlayer2Points()).toEqual(0);
                    expect(scorecard.getPlayer2Games()).toEqual(6);
                    expect(scorecard.getPlayer2Sets()).toEqual(2);
                    expect(scorecard.isTieBreaker()).toBe(false);
                });
            });

            describe("Reset tests", function() {

                it("sets points, game and sets back to 0 after a reset", function() {

                    player1WinsLoveSet();
                    player1WinsLoveSet();
                    player2WinsLoveSet();

                    player1WinsLoveGame();
                    player1WinsLoveGame();
                    player2WinsLoveGame();
                    player2WinsLoveGame();
                    player2WinsLoveGame();

                    scorecard.player1WinsPoint();
                    scorecard.player2WinsPoint();
                    scorecard.player2WinsPoint();

                    expect(scorecard.getPlayer1Points()).toEqual(1);
                    expect(scorecard.getPlayer1Games()).toEqual(2);
                    expect(scorecard.getPlayer1Sets()).toEqual(2);
                    expect(scorecard.getPlayer2Points()).toEqual(2);
                    expect(scorecard.getPlayer2Games()).toEqual(3);
                    expect(scorecard.getPlayer2Sets()).toEqual(1);

                    scorecard.reset();

                    expect(scorecard.getPlayer1Points()).toEqual(0);
                    expect(scorecard.getPlayer1Games()).toEqual(0);
                    expect(scorecard.getPlayer1Sets()).toEqual(0);
                    expect(scorecard.getPlayer2Points()).toEqual(0);
                    expect(scorecard.getPlayer2Games()).toEqual(0);
                    expect(scorecard.getPlayer2Sets()).toEqual(0);
                });
            });
        });

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

            var winSixGamesEach = function() {
                for (var i = 1; i <= 6; i++) {
                    player1WinsLoveGame();
                    player2WinsLoveGame();
                }
            };

            beforeEach(function() {
                controller = window.tennisKata.factory.createController();
            });

            it("fires scored changed callback when a point is scored", function() {
                var eventRaised = false;
                controller.addScoreChangedEventHandler(function() {
                    eventRaised = true;
                });
                controller.player1WinsPoint();
                expect(eventRaised).toBe(true);
            });

            it_multiple(
                "reports the correct score when points are scored",
                function(numPoints1, numPoints2, expectedScoreText1, expectedScoreText2) {

                    var eventData = null;
                    controller.addScoreChangedEventHandler(function(x) {
                        eventData = x;
                    });

                    for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                        if (numPoints1 >= i) { controller.player1WinsPoint(); }
                        if (numPoints2 >= i) { controller.player2WinsPoint(); }
                    }

                    expect(eventData.player1Name).toBe("Player1");
                    expect(eventData.player1Points).toBe(expectedScoreText1);
                    expect(eventData.player1Games).toBe("");
                    expect(eventData.player1Sets).toBe("");
                    expect(eventData.player2Name).toBe("Player2");
                    expect(eventData.player2Points).toBe(expectedScoreText2);
                    expect(eventData.player2Games).toBe("");
                    expect(eventData.player2Sets).toBe("");
                },
                [
                    [1, 0, "15", "0"],
                    [2, 0, "30", "0"],
                    [3, 0, "40", "0"],

                    [1, 1, "15", "15"],
                    [2, 1, "30", "15"],
                    [3, 1, "40", "15"],

                    [1, 2, "15", "30"],
                    [2, 2, "30", "30"],
                    [3, 2, "40", "30"],

                    [1, 3, "15", "40"],
                    [2, 3, "30", "40"],
                    [3, 3, "40", "40"],

                    [0, 1, "0", "15"],
                    [0, 2, "0", "30"],
                    [0, 3, "0", "40"],

                    [4, 3, "A", "40"],
                    [3, 4, "40", "A"],
                    [4, 4, "40", "40"],
                    [5, 4, "A", "40"],
                    [4, 5, "40", "A"],
                    [5, 5, "40", "40"],
                    [6, 5, "A", "40"],
                    [5, 6, "40", "A"]
                ]
            );

            it_multiple(
                "reports points as regular numbers (1,2,3,etc.) when in tie-breaker mode",
                function(numPoints1, numPoints2) {

                    controller.setMatchLength(3);

                    var eventData = null;
                    controller.addScoreChangedEventHandler(function(x) {
                        eventData = x;
                    });

                    winSixGamesEach();

                    for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                        if (numPoints1 >= i) { controller.player1WinsPoint(); }
                        if (numPoints2 >= i) { controller.player2WinsPoint(); }
                    }

                    expect(eventData.player1Points).toBe(numPoints1.toString());
                    expect(eventData.player2Points).toBe(numPoints2.toString());
                    expect(eventData.player1Games).toBe("6");
                    expect(eventData.player2Games).toBe("6");
                    expect(eventData.player1Sets).toBe("");
                    expect(eventData.player2Sets).toBe("");
                },
                [
                    [2, 1],
                    [5, 4],
                    [6, 3]
                ]
            );

            it_multiple(
                "reports the correct score when games are won",
                function(numGames1, numGames2) {

                    controller.setMatchLength(3);

                    var eventData = null;
                    controller.addScoreChangedEventHandler(function(x) {
                        eventData = x;
                    });

                    for (var i = 1; i <= Math.max(numGames1, numGames2); i++) {
                        if (numGames1 >= i) { player1WinsLoveGame(); }
                        if (numGames2 >= i) { player2WinsLoveGame(); }
                    }

                    expect(eventData.player1Points).toBe("");
                    expect(eventData.player2Points).toBe("");
                    expect(eventData.player1Games).toBe(numGames1.toString());
                    expect(eventData.player2Games).toBe(numGames2.toString());
                    expect(eventData.player1Sets).toBe("");
                    expect(eventData.player2Sets).toBe("");
                },
                [
                    [1, 1],
                    [4, 4],
                    [5, 0],
                    [0, 5]
                ]
            );

            it_multiple(
                "reports the correct score when sets are won",
                function(numSets1, numSets2) {

                    controller.setMatchLength(3);

                    var eventData = null;
                    controller.addScoreChangedEventHandler(function(x) {
                        eventData = x;
                    });

                    for (var i = 1; i <= Math.max(numSets1, numSets2); i++) {
                        if (numSets1 >= i) { player1WinsLoveSet(); }
                        if (numSets2 >= i) { player2WinsLoveSet(); }
                    }

                    expect(eventData.player1Points).toBe("");
                    expect(eventData.player2Points).toBe("");
                    expect(eventData.player1Games).toBe("");
                    expect(eventData.player2Games).toBe("");
                    expect(eventData.player1Sets).toBe(numSets1.toString());
                    expect(eventData.player2Sets).toBe(numSets2.toString());
                },
                [
                    [1, 0],
                    [0, 1],
                    [2, 0],
                    [0, 2],
                    [2, 1],
                    [1, 2]
                ]
            );

            it("returns the score to \"\"/\"\" after a reset", function() {

                    var eventDataHistory = [];

                    controller.addScoreChangedEventHandler(function(x) {
                        eventDataHistory.push(x);
                    });

                    controller.player1WinsPoint();
                    controller.player1WinsPoint();
                    controller.player2WinsPoint();

                    var lastIndex = eventDataHistory.length - 1;
                    expect(eventDataHistory[lastIndex].player1Points).toBe("30");
                    expect(eventDataHistory[lastIndex].player2Points).toBe("15");

                    controller.reset();

                    lastIndex = eventDataHistory.length - 1;
                    expect(eventDataHistory[lastIndex].player1Points).toBe("");
                    expect(eventDataHistory[lastIndex].player2Points).toBe("");
            });

            it("allows the player names to be changed which also resets the game", function() {

                var eventData = null;
                controller.addScoreChangedEventHandler(function(x) {
                    eventData = x;
                });

                controller.player1WinsPoint();
                expect(eventData.player1Name).toBe("Player1");
                expect(eventData.player2Name).toBe("Player2");
                expect(eventData.player1Points).toBe("15");
                expect(eventData.player2Points).toBe("0");

                controller.setPlayerNames("XXX", "YYY");

                expect(eventData.player1Name).toBe("XXX");
                expect(eventData.player2Name).toBe("YYY");
                expect(eventData.player1Points).toBe("");
                expect(eventData.player2Points).toBe("");
            });

            it("allows the match length to be changed which also resets the game", function() {

                var eventData = null;
                controller.addScoreChangedEventHandler(function(x) {
                    eventData = x;
                });

                controller.player1WinsPoint();
                controller.player1WinsPoint();
                controller.player2WinsPoint();
                expect(eventData.player1Points).toBe("30");
                expect(eventData.player2Points).toBe("15");

                controller.setMatchLength(3);

                expect(eventData.player1Points).toBe("");
                expect(eventData.player2Points).toBe("");
            });

            it("allows the match length to be retrieved", function() {
                controller.setMatchLength(3);
                expect(controller.getMatchLength()).toBe(3);
                controller.setMatchLength(5);
                expect(controller.getMatchLength()).toBe(5);
            });
        });
    });
} ());
