(function() {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.scorecard = function(player1, player2) {

        var _player1 = player1;
        var _player2 = player2;
        var _gameWonEventHandler = [];
        var _setWonEventHandler = [];
        var _player1Points = 0;
        var _player2Points = 0;
        var _player1Games = 0;
        var _player2Games = 0;
        var _player1Sets = 0;
        var _player2Sets = 0;

        var _player1WinsPoint = function() {
            _player1Points++;
            _checkIfGameIsWon();
        };

        var _player2WinsPoint = function() {
            _player2Points++;
            _checkIfGameIsWon();
        };

        var _checkIfGameIsWon = function() {

            var gameWinner = null;

            if (_player1Points >= 4 || _player2Points >= 4) {
                if (_player1Points - _player2Points >= 2) {
                    _player1Games++;
                    gameWinner = _player1;
                }
                if (_player2Points - _player1Points >= 2) {
                    _player2Games++;
                    gameWinner = _player2;
                }
            }

            if (gameWinner !== null) {
                _player1Points = 0;
                _player2Points = 0;
                _raiseGameWonEvent();
                _checkIfSetIsWon();
            }
        };

        var _checkIfSetIsWon = function() {

            var setWinner = null;

            if (_player1Games >= 6 && _player1Games - _player2Games >= 2) {
                _player1Sets++;
                setWinner = _player1;
            }
            if (_player2Games >= 6 && _player2Games - _player1Games >= 2) {
                _player2Sets++;
                setWinner = _player2;
            }

            if (setWinner !== null) {
                _player1Games = 0;
                _player2Games = 0;
                _raiseSetWonEvent();
            }
        };

        var _raiseGameWonEvent = function() {
            for (var i = 0; i < _gameWonEventHandler.length; i++) {
                _gameWonEventHandler[i]({
                    player1: _player1,
                    player2: _player2,
                    player1Points: _player1Points,
                    player2Points: _player2Points,
                    player1Games: _player1Games,
                    player2Games: _player2Games,
                    player1Sets: _player1Sets,
                    player2Sets: _player2Sets
                });
            }
        };

        var _raiseSetWonEvent = function() {
            for (var i = 0; i < _setWonEventHandler.length; i++) {
                _setWonEventHandler[i]({
                    player1: _player1,
                    player2: _player2,
                    player1Points: _player1Points,
                    player2Points: _player2Points,
                    player1Games: _player1Games,
                    player2Games: _player2Games,
                    player1Sets: _player1Sets,
                    player2Sets: _player2Sets
                });
            }
        };

        var _addGameWonEventHandler = function(handler) {
            _gameWonEventHandler.push(handler);
        };

        var _addSetWonEventHandler = function(handler) {
            _setWonEventHandler.push(handler);
        };

        return {
            player1WinsPoint: _player1WinsPoint,
            player2WinsPoint: _player2WinsPoint,
            addGameWonEventHandler: _addGameWonEventHandler,
            addSetWonEventHandler: _addSetWonEventHandler
        };
    };
}());
