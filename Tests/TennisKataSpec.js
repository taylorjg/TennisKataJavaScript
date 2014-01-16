﻿/// <reference path="RomanNumerals.js" />
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
                    var i;
                    for (i = 0; i < numPoints1; i++) { game.pointScoredByPlayer1(); }
                    for (i = 0; i < numPoints2; i++) { game.pointScoredByPlayer2(); }
                    expect(game.getPlayer1Score()).toBe(numPoints1);
                    expect(game.getPlayer2Score()).toBe(numPoints2);
                },
                [
                    [0, 0],
                    [1, 0],
                    [2, 0],
                    [3, 0],
                    [4, 0],
                    [5, 0],
                    [0, 1],
                    [0, 2],
                    [0, 3],
                    [0, 4],
                    [0, 5],
                    [1, 1],
                    [2, 2],
                    [3, 3],
                    [4, 4],
                    [5, 5]
                ]);

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

        describe("Scoreboard tests", function() {
            it_multiple(
                "has the correct score text when points have been scored",
                function(numPoints1, numPoints2, expectedScoreText1, expectedScoreText2) {
                    var i;
                    for (i = 0; i < numPoints1; i++) { game.pointScoredByPlayer1(); }
                    for (i = 0; i < numPoints2; i++) { game.pointScoredByPlayer2(); }
                    expect(scoreboard.getPlayer1Score()).toBe(expectedScoreText1);
                    expect(scoreboard.getPlayer2Score()).toBe(expectedScoreText2);
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
                "reports the correct score when a points are scored",
                function(numPoints1, numPoints2, expectedScoreText1, expectedScoreText2) {
                    var callbackData = null;
                    controller.setScoreChangedCallback(function(x) {
                        callbackData = x;
                    });
                    var i;
                    for (i = 0; i < numPoints1; i++) { controller.pointScoredByPlayer1(); }
                    for (i = 0; i < numPoints2; i++) { controller.pointScoredByPlayer2(); }
                    expect(callbackData.player1Name).toBe("Player1");
                    expect(callbackData.player1Score).toBe(expectedScoreText1);
                    expect(callbackData.player2Name).toBe("Player2");
                    expect(callbackData.player2Score).toBe(expectedScoreText2);
                },
                [].concat(commonTestCases)
            );
        });
    });
} ());