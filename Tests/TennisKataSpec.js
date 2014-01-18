/// <reference path="RomanNumerals.js" />
/// <reference path="jasmine-1.3.1/jasmine.js" />
/// <reference path="it_multiple.js" />

(function () {

    "use strict";

    describe("Tests for TennisKata", function () {

        var player1;
        var player2;
        var game;
        var scoreboard;

        var commonTestCases = [
            [1, 0, "15", ""],
            [2, 0, "30", ""],
            [3, 0, "40", ""],
            [4, 0, "W", "L"],

            [1, 1, "15", "15"],
            [2, 1, "30", "15"],
            [3, 1, "40", "15"],
            [4, 1, "W", "L"],

            [1, 2, "15", "30"],
            [2, 2, "30", "30"],
            [3, 2, "40", "30"],
            [4, 2, "W", "L"],

            [1, 3, "15", "40"],
            [2, 3, "30", "40"],
            [3, 3, "40", "40"],

            [0, 1, "", "15"],
            [0, 2, "", "30"],
            [0, 3, "", "40"],
            [0, 4, "L", "W"],

            [1, 1, "15", "15"],
            [1, 2, "15", "30"],
            [1, 3, "15", "40"],
            [1, 4, "L", "W"],

            [2, 1, "30", "15"],
            [2, 2, "30", "30"],
            [2, 3, "30", "40"],
            [2, 4, "L", "W"],

            [3, 1, "40", "15"],
            [3, 2, "40", "30"],
            [3, 3, "40", "40"],

            [4, 3, "A", "40"],
            [3, 4, "40", "A"],
            [4, 4, "40", "40"],
            [5, 4, "A", "40"],
            [4, 5, "40", "A"],
            [5, 5, "40", "40"],
            [6, 5, "A", "40"],
            [5, 6, "40", "A"]
        ];

        beforeEach(function() {
            player1 = window.tennisKata.factory.createPlayer("Becker");
            player2 = window.tennisKata.factory.createPlayer("McEnroe");
            game = window.tennisKata.factory.createGame(player1, player2);
            scoreboard = window.tennisKata.factory.createScoreboard(game);
        });

        describe("Game tests", function () {

            it("has the correct player1 name", function() {
                expect(game.getPlayer1().getName()).toBe("Becker");
            });

            it("has the correct player2 name", function() {
                expect(game.getPlayer2().getName()).toBe("McEnroe");
            });

            it_multiple(
                "has the correct score when points have been scored",
                function(numPoints1, numPoints2) {
                    for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                        if (numPoints1 >= i) { game.pointScoredByPlayer1(); }
                        if (numPoints2 >= i) { game.pointScoredByPlayer2(); }
                    }
                    expect(game.getPlayer1Score()).toBe(numPoints1);
                    expect(game.getPlayer2Score()).toBe(numPoints2);
                },
                [
                    [0, 0],
                    [1, 0],
                    [2, 0],
                    [3, 0],
                    [4, 0],
                    [0, 1],
                    [0, 2],
                    [0, 3],
                    [0, 4],
                    [1, 1],
                    [2, 2],
                    [3, 3],
                    [4, 4],
                    [5, 5]
                ]);

            it("returns the score to 0/0 after a reset", function() {
                    game.pointScoredByPlayer1();
                    game.pointScoredByPlayer1();
                    game.pointScoredByPlayer2();
                    expect(game.getPlayer1Score()).toBe(2);
                    expect(game.getPlayer2Score()).toBe(1);
                    game.reset();
                    expect(game.getPlayer1Score()).toBe(0);
                    expect(game.getPlayer2Score()).toBe(0);
            });

            it("ignores points scored after the game has been won", function() {

                    game.pointScoredByPlayer1();
                    game.pointScoredByPlayer1();
                    game.pointScoredByPlayer1();
                    game.pointScoredByPlayer1();

                    expect(game.getPlayer1Score()).toBe(4);
                    expect(game.getPlayer2Score()).toBe(0);

                    game.pointScoredByPlayer1();

                    expect(game.getPlayer1Score()).toBe(4);
                    expect(game.getPlayer2Score()).toBe(0);

                    game.pointScoredByPlayer2();
                    
                    expect(game.getPlayer1Score()).toBe(4);
                    expect(game.getPlayer2Score()).toBe(0);
            });

            it("games are independent of each other", function() {

                var player1 = window.tennisKata.factory.createPlayer("Player1");
                var player2 = window.tennisKata.factory.createPlayer("Player2");
                var game1 = window.tennisKata.factory.createGame(player1, player2);

                var player3 = window.tennisKata.factory.createPlayer("Player3");
                var player4 = window.tennisKata.factory.createPlayer("Player4");
                var game2 = window.tennisKata.factory.createGame(player3, player4);

                game1.pointScoredByPlayer1();
                game2.pointScoredByPlayer2();

                expect(game1.getPlayer1Score()).toBe(1);
                expect(game1.getPlayer2Score()).toBe(0);

                expect(game2.getPlayer1Score()).toBe(0);
                expect(game2.getPlayer2Score()).toBe(1);
            });
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

        describe("Scoreboard tests", function() {

            it_multiple(
                "has the correct score text when points have been scored",
                function(numPoints1, numPoints2, expectedScoreText1, expectedScoreText2) {
                    for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                        if (numPoints1 >= i) { game.pointScoredByPlayer1(); }
                        if (numPoints2 >= i) { game.pointScoredByPlayer2(); }
                    }
                    var scores = scoreboard.getScores();
                    expect(scores[0]).toBe(expectedScoreText1);
                    expect(scores[1]).toBe(expectedScoreText2);
                },
                [[0, 0, "", ""]].concat(commonTestCases)
            );
        });

        describe("Controller tests", function() {

            var controller;

            beforeEach(function() {
                controller = window.tennisKata.factory.createController();
            });

            it("fires scored changed callback when a point is scored", function() {
                var callbackInvoked = false;
                controller.setScoreChangedCallback(function() {
                    callbackInvoked = true;
                });
                controller.pointScoredByPlayer1();
                expect(callbackInvoked).toBe(true);
            });

            it_multiple(
                "reports the correct score when points are scored",
                function(numPoints1, numPoints2, expectedScoreText1, expectedScoreText2) {
                    var callbackData = null;
                    controller.setScoreChangedCallback(function(x) {
                        callbackData = x;
                    });
                    for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                        if (numPoints1 >= i) { controller.pointScoredByPlayer1(); }
                        if (numPoints2 >= i) { controller.pointScoredByPlayer2(); }
                    }
                    expect(callbackData.player1Name).toBe("Player1");
                    expect(callbackData.player1Score).toBe(expectedScoreText1);
                    expect(callbackData.player2Name).toBe("Player2");
                    expect(callbackData.player2Score).toBe(expectedScoreText2);
                },
                commonTestCases
            );

            it("returns the score to \"\"/\"\" after a reset", function() {

                    var callbackDataArray = [];

                    controller.setScoreChangedCallback(function(x) {
                        callbackDataArray.push(x);
                    });

                    controller.pointScoredByPlayer1();
                    controller.pointScoredByPlayer1();
                    controller.pointScoredByPlayer2();

                    var lastIndex = callbackDataArray.length - 1;
                    expect(callbackDataArray[lastIndex].player1Score).toBe("30");
                    expect(callbackDataArray[lastIndex].player2Score).toBe("15");

                    controller.reset();

                    lastIndex = callbackDataArray.length - 1;
                    expect(callbackDataArray[lastIndex].player1Score).toBe("");
                    expect(callbackDataArray[lastIndex].player2Score).toBe("");
            });

            it("allows the player names to be changed which resets the game", function() {

                var callbackData = null;
                controller.setScoreChangedCallback(function(x) {
                    callbackData = x;
                });

                controller.pointScoredByPlayer1();
                expect(callbackData.player1Name).toBe("Player1");
                expect(callbackData.player2Name).toBe("Player2");
                expect(callbackData.player1Score).toBe("15");
                expect(callbackData.player2Score).toBe("");

                controller.setPlayerNames("XXX", "YYY");

                controller.pointScoredByPlayer2();
                expect(callbackData.player1Name).toBe("XXX");
                expect(callbackData.player2Name).toBe("YYY");
                expect(callbackData.player1Score).toBe("");
                expect(callbackData.player2Score).toBe("15");
            });
        });
    });
} ());
