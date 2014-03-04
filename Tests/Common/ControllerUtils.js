/**
 * Created by taylojo on 03/03/14.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.tests = window.tennisKata.tests || {};
    window.tennisKata.tests.common = window.tennisKata.tests.common || {};

    window.tennisKata.tests.common.controllerUtils = function() {

        var _controller;

        var _player1WinsPoint = function() {
            _controller.player1WinsPoint();
        };

        var _player2WinsPoint = function() {
            _controller.player2WinsPoint();
        };

        var _player1WinsLoveGame = function() {
            for (var i = 1; i <= 4; i++) {
                _player1WinsPoint();
            }
        };

        var _player2WinsLoveGame = function() {
            for (var i = 1; i <= 4; i++) {
                _player2WinsPoint();
            }
        };

        var _playersWinLoveGames = function(numGames1, numGames2) {
            for (var i = 1; i <= Math.max(numGames1, numGames2); i++) {
                if (numGames1 >= i) { _player1WinsLoveGame(); }
                if (numGames2 >= i) { _player2WinsLoveGame(); }
            }
        };

        var _playersWinSixGamesEach = function() {
            _playersWinLoveGames(6, 6);
        };

        var _player1WinsLoveSet = function() {
            for (var i = 1; i <= 6; i++) {
                _player1WinsLoveGame();
            }
        };

        var _player2WinsLoveSet = function() {
            for (var i = 1; i <= 6; i++) {
                _player2WinsLoveGame();
            }
        };

        var _scorePoints = function(player1ScoreParts, player2ScoreParts) {

            var i;

            var num1stSetGames1 = player1ScoreParts[0][0];
            var num1stSetGames2 = player2ScoreParts[0][0];
            _playersWinLoveGames(num1stSetGames1, num1stSetGames2);
            if (num1stSetGames1 === 6 && num1stSetGames2 === 6) {
                var num1stSetTieBreakerPoints1 = player1ScoreParts[0][1];
                var num1stSetTieBreakerPoints2 = player2ScoreParts[0][1];
                for (i = 1; i <= Math.max(num1stSetTieBreakerPoints1, num1stSetTieBreakerPoints2); i++) {
                    if (num1stSetTieBreakerPoints1 >= i) { _player1WinsPoint(); }
                    if (num1stSetTieBreakerPoints2 >= i) { _player2WinsPoint(); }
                }
            }

            var num2ndSetGames1 = player1ScoreParts[1][0];
            var num2ndSetGames2 = player2ScoreParts[1][0];
            _playersWinLoveGames(num2ndSetGames1, num2ndSetGames2);
            if (num2ndSetGames1 === 6 && num2ndSetGames2 === 6) {
                var num2ndSetTieBreakerPoints1 = player1ScoreParts[1][1];
                var num2ndSetTieBreakerPoints2 = player2ScoreParts[1][1];
                for (i = 1; i <= Math.max(num2ndSetTieBreakerPoints1, num2ndSetTieBreakerPoints2); i++) {
                    if (num2ndSetTieBreakerPoints1 >= i) { _player1WinsPoint(); }
                    if (num2ndSetTieBreakerPoints2 >= i) { _player2WinsPoint(); }
                }
            }

            var num3rdSetGames1 = player1ScoreParts[2];
            var num3rdSetGames2 = player2ScoreParts[2];
            _playersWinLoveGames(num3rdSetGames1, num3rdSetGames2);

            var numPoints1 = player1ScoreParts[3];
            var numPoints2 = player2ScoreParts[3];
            for (i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                if (numPoints1 >= i) { _player1WinsPoint(); }
                if (numPoints2 >= i) { _player2WinsPoint(); }
            }
        };

        var _getController = function() {
            return _controller;
        };

        _controller = window.tennisKata.controller();
        _controller.init();

        return {
            player1WinsPoint: _player1WinsPoint,
            player2WinsPoint: _player2WinsPoint,
            player1WinsLoveGame: _player1WinsLoveGame,
            player2WinsLoveGame: _player2WinsLoveGame,
            playersWinLoveGames: _playersWinLoveGames,
            playersWinSixGamesEach: _playersWinSixGamesEach,
            player1WinsLoveSet: _player1WinsLoveSet,
            player2WinsLoveSet: _player2WinsLoveSet,
            scorePoints: _scorePoints,
            getController: _getController
        };
    };
}());