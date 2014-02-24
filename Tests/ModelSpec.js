/**
 * Created by jonathantaylor on 23/02/2014.
 */

(function(){

    "use strict";

    var _player1;
    var _player2;

    beforeEach(function() {
        _player1 = window.tennisKata.factory.createPlayer("Azarenka");
        _player2 = window.tennisKata.factory.createPlayer("Wozniacki");
    });

    describe("Model game tests", function() {

        it_multiple(
            "works",
            function(numPoints1, numPoints2, isTieBreak, hasWinner) {

                var game = window.tennisKata.model.game(_player1, _player2, _player1, isTieBreak);

                for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                    if (numPoints1 >= i) { game.scorePoint(window.tennisKata.model.point(_player1)); }
                    if (numPoints2 >= i) { game.scorePoint(window.tennisKata.model.point(_player2)); }
                }

                expect(game.getPlayer1Points()).toBe(numPoints1);
                expect(game.getPlayer2Points()).toBe(numPoints2);
                if (hasWinner) {
                    expect(game.getGameWinner()).not.toBeNull();
                }
                else {
                    expect(game.getGameWinner()).toBeNull();
                }
            },
            [
                [0, 0, false, false],
                [2, 3, false, false],
                [5, 5, false, false],
                [4, 0, false, true],
                [6, 4, false, true],
                [6, 4, true, false],
                [7, 3, true, true]
            ]
        );
    });

    describe("Model set tests", function() {

        it_multiple(
            "works",
            function(numGames1, numGames2, hasWinner) {

                var set = window.tennisKata.model.set(_player1, _player2, _player1, false);

                for (var i = 1; i <= Math.max(numGames1, numGames2); i++) {
                    if (numGames1 >= i) {
                        set.scorePoint(window.tennisKata.model.point(_player1));
                        set.scorePoint(window.tennisKata.model.point(_player1));
                        set.scorePoint(window.tennisKata.model.point(_player1));
                        set.scorePoint(window.tennisKata.model.point(_player1));
                    }
                    if (numGames2 >= i) {
                        set.scorePoint(window.tennisKata.model.point(_player2));
                        set.scorePoint(window.tennisKata.model.point(_player2));
                        set.scorePoint(window.tennisKata.model.point(_player2));
                        set.scorePoint(window.tennisKata.model.point(_player2));
                    }
                }

                expect(set.getPlayer1Games()).toBe(numGames1);
                expect(set.getPlayer2Games()).toBe(numGames2);
                if (hasWinner) {
                    expect(set.getSetWinner()).not.toBeNull();
                }
                else {
                    expect(set.getSetWinner()).toBeNull();
                }
                set.iterateGames(function(g) {
                    expect(g.getGameWinner()).not.toBeNull();
                });
            },
            [
                [0, 0, false],
                [2, 3, false],
                [6, 0, true],
                [2, 5, false],
                [2, 6, true],
                [6, 6, false]
            ]
        );

        it("handles a tie break correctly", function() {

            var set = window.tennisKata.model.set(_player1, _player2, _player1, false);

            for (var i = 1; i <= 6; i++) {

                set.scorePoint(window.tennisKata.model.point(_player1));
                set.scorePoint(window.tennisKata.model.point(_player1));
                set.scorePoint(window.tennisKata.model.point(_player1));
                set.scorePoint(window.tennisKata.model.point(_player1));

                set.scorePoint(window.tennisKata.model.point(_player2));
                set.scorePoint(window.tennisKata.model.point(_player2));
                set.scorePoint(window.tennisKata.model.point(_player2));
                set.scorePoint(window.tennisKata.model.point(_player2));
            }

            expect(set.getPlayer1Games()).toBe(6);
            expect(set.getPlayer2Games()).toBe(6);

            set.scorePoint(window.tennisKata.model.point(_player1));
            set.scorePoint(window.tennisKata.model.point(_player1));
            set.scorePoint(window.tennisKata.model.point(_player1));
            set.scorePoint(window.tennisKata.model.point(_player1));

            set.scorePoint(window.tennisKata.model.point(_player2));
            set.scorePoint(window.tennisKata.model.point(_player2));
            set.scorePoint(window.tennisKata.model.point(_player2));
            set.scorePoint(window.tennisKata.model.point(_player2));
            set.scorePoint(window.tennisKata.model.point(_player2));
            set.scorePoint(window.tennisKata.model.point(_player2));
            set.scorePoint(window.tennisKata.model.point(_player2));

            expect(set.getPlayer1Games()).toBe(6);
            expect(set.getPlayer2Games()).toBe(7);
            expect(set.getSetWinner()).toBe(_player2);

            var lastGame;
            set.iterateGames(function(g){lastGame = g;});
            expect(lastGame.getPlayer1Points()).toBe(4);
            expect(lastGame.getPlayer2Points()).toBe(7);
            expect(lastGame.getGameWinner()).toBe(_player2);
        });
    });

    describe("Model match tests", function() {

        it("works", function() {

            var match = window.tennisKata.model.match(_player1, _player2, _player1, 3);
            var player1Point = window.tennisKata.model.point(_player1);

            for (var i = 1; i <= 12; i++) {
                match.scorePoint(player1Point);
                match.scorePoint(player1Point);
                match.scorePoint(player1Point);
                match.scorePoint(player1Point);
            }

            match.iterateSets(function(set) {
                expect(set.getSetWinner()).toBe(_player1);
            });

            expect(match.getMatchWinner()).toBe(_player1);
        });
    });
}());
