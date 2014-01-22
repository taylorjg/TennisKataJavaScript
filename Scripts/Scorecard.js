(function() {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.scorecard = function(player1, player2) {

        var _gameWonEventHandler = [];

        var _player1Points = 0;
        var _player2Points = 0;

        var _player1WinsPoint = function() {
            _player1Points++;
            _checkIfGameIsWon();
        };

        var _player2WinsPoint = function() {
            _player2Points++;
            _checkIfGameIsWon();
        };

        var _checkIfGameIsWon = function() {
            if (_player1Points >= 4 || _player2Points >= 4) {
                if (Math.abs(_player1Points - _player2Points) >= 2) {
                    _raiseGameWonEvent();
                }
            }
        };

        var _raiseGameWonEvent = function() {
            for (var i = 0; i < _gameWonEventHandler.length; i++) {
                _gameWonEventHandler[i]();
            }
        };

        var _addGameWonEventHandler = function(handler) {
            _gameWonEventHandler.push(handler);
        };

        return {
            player1WinsPoint: _player1WinsPoint,
            player2WinsPoint: _player2WinsPoint,
            addGameWonEventHandler: _addGameWonEventHandler
        };
    };
}());
