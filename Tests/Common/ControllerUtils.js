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
            getController: _getController
        };
    };
}());
