(function() {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.scorecard = function(player1, player2) {

        var _player1 = player1;
        var _player2 = player2;
        var _gameWonEventHandlers = [];
        var _setWonEventHandlers = [];
        var _player1Points = 0;
        var _player2Points = 0;
        var _player1Games = 0;
        var _player2Games = 0;
        var _player1Sets = 0;
        var _player2Sets = 0;
        var _isTieBreakerFlag = false;

        var _getPlayer1 = function() { return _player1; };
        var _getPlayer2 = function() { return _player2; };
        var _getPlayer1Points = function() { return _player1Points; }
        var _getPlayer1Games = function() { return _player1Games; }
        var _getPlayer1Sets = function() { return _player1Sets; }
        var _getPlayer2Points = function() { return _player2Points; }
        var _getPlayer2Games = function() { return _player2Games; }
        var _getPlayer2Sets = function() { return _player2Sets; }
        var _isTieBreaker = function() { return _isTieBreakerFlag; }

        var _player1WinsPoint = function() {
            _player1Points++;
            _checkIfGameIsWon();
        };

        var _player2WinsPoint = function() {
            _player2Points++;
            _checkIfGameIsWon();
        };

        var _changePlayers = function(newPlayer1, newPlayer2) {
            _player1 = newPlayer1;
            _player2 = newPlayer2;
            _reset();
        };

        var _reset = function() {
            _player1Points = 0;
            _player1Games = 0;
            _player1Sets = 0;
            _player2Points = 0;
            _player2Games = 0;
            _player2Sets = 0;
            _isTieBreakerFlag = false;
        };

        var _checkIfGameIsWon = function() {

            var gameWinner = null;

            if (_isTieBreakerFlag) {
                if (_player1Points >= 7 && _player1Points - _player2Points >= 2) {
                    _player1Games++;
                    gameWinner = _player1;
                }
                if (_player2Points >= 7 && _player2Points - _player1Points >= 2) {
                    _player2Games++;
                    gameWinner = _player2;
                }
            }
            else {
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

            if (_isTieBreakerFlag) {
                if (_player1Games === 7 && _player2Games === 6) {
                    _player1Sets++;
                    setWinner = _player1;
                }
                if (_player2Games === 7 && _player1Games === 6) {
                    _player2Sets++;
                    setWinner = _player2;
                }
            }
            else {
                if (_player1Games === 6 && _player2Games === 6) {
                    _isTieBreakerFlag = true;
                }
                else {
                    if (_player1Games >= 6 && _player1Games - _player2Games >= 2) {
                        _player1Sets++;
                        setWinner = _player1;
                    }
                    if (_player2Games >= 6 && _player2Games - _player1Games >= 2) {
                        _player2Sets++;
                        setWinner = _player2;
                    }
                }
            }

            if (setWinner !== null) {
                _player1Games = 0;
                _player2Games = 0;
                _isTieBreakerFlag = false;
                _raiseSetWonEvent();
            }
        };

        var _raiseGameWonEvent = function() {
            for (var i = 0; i < _gameWonEventHandlers.length; i++) {
                _gameWonEventHandlers[i]();
            }
        };

        var _raiseSetWonEvent = function() {
            for (var i = 0; i < _setWonEventHandlers.length; i++) {
                _setWonEventHandlers[i]();
            }
        };

        var _addGameWonEventHandler = function(handler) {
            _gameWonEventHandlers.push(handler);
        };

        var _addSetWonEventHandler = function(handler) {
            _setWonEventHandlers.push(handler);
        };

        return {
            getPlayer1: _getPlayer1,
            getPlayer2: _getPlayer2,
            getPlayer1Points: _getPlayer1Points,
            getPlayer1Games: _getPlayer1Games,
            getPlayer1Sets: _getPlayer1Sets,
            getPlayer2Points: _getPlayer2Points,
            getPlayer2Games: _getPlayer2Games,
            getPlayer2Sets: _getPlayer2Sets,
            isTieBreaker: _isTieBreaker,
            player1WinsPoint: _player1WinsPoint,
            player2WinsPoint: _player2WinsPoint,
            changePlayers: _changePlayers,
            reset: _reset,
            addGameWonEventHandler: _addGameWonEventHandler,
            addSetWonEventHandler: _addSetWonEventHandler
        };
    };
}());
