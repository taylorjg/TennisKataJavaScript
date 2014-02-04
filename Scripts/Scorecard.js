(function() {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.scorecard = function(player1, player2) {

        var _player1 = player1;
        var _player2 = player2;
        var _initialServer = _player1;
        var _server = _initialServer;
        var _resetEventHandlers = [];
        var _gameWonEventHandlers = [];
        var _tieBreakerWonEventHandlers = [];
        var _setWonEventHandlers = [];
        var _matchWonEventHandlers = [];
        var _serverChangedEventHandlers = [];
        var _matchLength = 3;
        var _player1Points = 0;
        var _player2Points = 0;
        var _player1Games = 0;
        var _player2Games = 0;
        var _player1Sets = 0;
        var _player2Sets = 0;
        var _isTieBreakerFlag = false;
        var _tieBreakerServeCount = 0;
        var _tieBreakerFirstServer = null;

        var _getPlayer1 = function() { return _player1; };
        var _getPlayer2 = function() { return _player2; };
        var _getServer = function() { return _server; };
        var _getPlayer1Points = function() { return _player1Points; };
        var _getPlayer1Games = function() { return _player1Games; };
        var _getPlayer1Sets = function() { return _player1Sets; };
        var _getPlayer2Points = function() { return _player2Points; };
        var _getPlayer2Games = function() { return _player2Games; };
        var _getPlayer2Sets = function() { return _player2Sets; };
        var _isTieBreaker = function() { return _isTieBreakerFlag; };

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

        var _getMatchLength = function() {
            return _matchLength;
        };

        var _setMatchLength = function(matchLength) {
            _matchLength = matchLength;
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
            _tieBreakerServeCount = 0;
            _tieBreakerFirstServer = null;
            _server = _initialServer;
            _raiseResetEvent();
        };

        var _checkIfGameIsWon = function() {

            var gameWinner = null;
            var gameWonOnTieBreak = false;

            if (_isTieBreakerFlag) {
                if (_player1Points >= 7 && _player1Points - _player2Points >= 2) {
                    _player1Games++;
                    gameWinner = _player1;
                    gameWonOnTieBreak = true;
                }
                if (_player2Points >= 7 && _player2Points - _player1Points >= 2) {
                    _player2Games++;
                    gameWinner = _player2;
                    gameWonOnTieBreak = true;
                }
                if (gameWinner === null) {
                    _changeServer();
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
                var p1p = _player1Points;
                var p2p = _player2Points;
                _player1Points = 0;
                _player2Points = 0;
                _raiseGameWonEvent();
                if (!gameWonOnTieBreak) {
                    _changeServer();
                }
                _checkIfSetIsWon(p1p, p2p);
            }
        };

        var _checkIfSetIsWon = function(p1p, p2p) {

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
                    var thisSetNumber = _player1Sets + _player2Sets + 1;
                    if (thisSetNumber < _matchLength) {
                        _isTieBreakerFlag = true;
                        _tieBreakerServeCount = 1;
                        _tieBreakerFirstServer = _server;
                    }
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
                if (_isTieBreakerFlag) {
                    _raiseTieBreakerWonEvent(p1p, p2p);
                    var needToChangeServer = false;
                    if (_server === _tieBreakerFirstServer) {
                        needToChangeServer = true;
                    }
                    _isTieBreakerFlag = false;
                    _tieBreakerServeCount = 0;
                    _tieBreakerFirstServer = null;
                    if (needToChangeServer) {
                        _changeServer();
                    }
                }
                _raiseSetWonEvent();
                _checkIfMatchIsWon();
            }
        };

        var _checkIfMatchIsWon = function() {

            var numberOfSetsNeededToWin = (_matchLength + 1) / 2;

            if (_player1Sets === numberOfSetsNeededToWin) {
                _raiseMatchWonEvent(_player1);
            }

            if (_player2Sets === numberOfSetsNeededToWin) {
                _raiseMatchWonEvent(_player2);
            }
        };

        var _changeServer = function() {

            var flipTurn = false;

            if (_isTieBreakerFlag) {
                    _tieBreakerServeCount++;
                    if (_tieBreakerServeCount === 2) {
                        _tieBreakerServeCount = 0;
                        flipTurn = true;
                    }
            }
            else {
                flipTurn = true;
            }

            if (flipTurn) {
                _server = (_server === _player1) ? _player2 : _player1;
                _raiseServerChangedEvent(_server);
            }
        };

        var _raiseResetEvent = function() {
            for (var i = 0; i < _resetEventHandlers.length; i++) {
                _resetEventHandlers[i]();
            }
        };

        var _raiseGameWonEvent = function() {
            for (var i = 0; i < _gameWonEventHandlers.length; i++) {
                _gameWonEventHandlers[i](_player1Games, _player2Games);
            }
        };

        var _raiseTieBreakerWonEvent = function(p1p, p2p) {
            for (var i = 0; i < _tieBreakerWonEventHandlers.length; i++) {
                _tieBreakerWonEventHandlers[i](p1p, p2p);
            }
        };

        var _raiseSetWonEvent = function() {
            for (var i = 0; i < _setWonEventHandlers.length; i++) {
                _setWonEventHandlers[i](_player1Sets, _player2Sets);
            }
        };

        var _raiseMatchWonEvent = function(winner) {
            for (var i = 0; i < _matchWonEventHandlers.length; i++) {
                _matchWonEventHandlers[i](winner);
            }
        };

        var _raiseServerChangedEvent = function(server) {
            for (var i = 0; i < _serverChangedEventHandlers.length; i++) {
                _serverChangedEventHandlers[i](server);
            }
        };

        var _addResetEventHandler = function(handler) {
            _resetEventHandlers.push(handler);
        };

        var _addGameWonEventHandler = function(handler) {
            _gameWonEventHandlers.push(handler);
        };

        var _addTieBreakerWonEventHandler = function(handler) {
            _tieBreakerWonEventHandlers.push(handler);
        };

        var _addSetWonEventHandler = function(handler) {
            _setWonEventHandlers.push(handler);
        };

        var _addMatchWonEventHandler = function(handler) {
            _matchWonEventHandlers.push(handler);
        };

        var _addServerChangedEventHandler = function(handler) {
            _serverChangedEventHandlers.push(handler);
        };

        return {
            getPlayer1: _getPlayer1,
            getPlayer2: _getPlayer2,
            getServer: _getServer,
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
            getMatchLength: _getMatchLength,
            setMatchLength: _setMatchLength,
            reset: _reset,
            addResetEventHandler: _addResetEventHandler,
            addGameWonEventHandler: _addGameWonEventHandler,
            addTieBreakerWonEventHandler: _addTieBreakerWonEventHandler,
            addSetWonEventHandler: _addSetWonEventHandler,
            addMatchWonEventHandler: _addMatchWonEventHandler,
            addServerChangedEventHandler: _addServerChangedEventHandler
        };
    };
}());
