(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.game = function(player1, player2) {

        var _player1 = player1;
        var _player2 = player2;
        var _player1Score = 0;
        var _player2Score = 0;
        var _gameOver = false;
        var _winCallback = null;
        var _advantageCallback = null;
        var _deuceCallback = null;
        var _otherScoreCallback = null;

        var _getPlayer1 = function() {
            return _player1;
        };

        var _getPlayer2 = function() {
            return _player2;
        };

        var _getPlayer1Score = function() {
            return _player1Score;
        };

        var _getPlayer2Score = function() {
            return _player2Score;
        };

        var _pointScoredByPlayer1 = function() {
            if (!_gameOver) {
                _player1Score++;
                _reportScore();
            }
        };

        var _pointScoredByPlayer2 = function() {
            if (!_gameOver) {
                _player2Score++;
                _reportScore();
            }
        };

        var _reset = function() {
            _player1Score = 0;
            _player2Score = 0;
            _gameOver = false;
            _reportScore();
        };

        var _setWinCallback = function(cb) {
            _winCallback = cb;
        };

        var _setAdvantageCallback = function(cb) {
            _advantageCallback = cb;
        };

        var _setDeuceCallback = function(cb) {
            _deuceCallback = cb;
        };

        var _setOtherScoreCallback = function(cb) {
            _otherScoreCallback = cb;
        };

        var _raiseWinEvent = function(player1, player2) {
            if (_winCallback !== null) {
                _winCallback(player1, player2);
            }
        };

        var _raiseAdvantageEvent = function(player1, player2) {
            if (_advantageCallback !== null) {
                _advantageCallback(player1, player2);
            }
        };

        var _raiseDeuceEvent = function() {
            if (_deuceCallback !== null) {
                _deuceCallback();
            }
        };

        var _raiseOtherScoreEvent = function() {
            if (_otherScoreCallback !== null) {
                _otherScoreCallback(_player1Score, _player2Score);
            }
        };

        var _reportScore = function() {

            if (_player1Score >= 4 && _player1Score - _player2Score >= 2) {
                _gameOver = true;
                _raiseWinEvent(_player1, _player2);
                return;
            }

            if (_player2Score >= 4 && _player2Score - _player1Score >= 2) {
                _gameOver = true;
                _raiseWinEvent(_player2, _player1);
                return;
            }

            if (_player1Score + _player2Score >= 6) {
                if (_player1Score - _player2Score === 1) {
                    _raiseAdvantageEvent(_player1, _player2);
                    return;
                }
                if (_player2Score - _player1Score === 1) {
                    _raiseAdvantageEvent(_player2, _player1);
                    return;
                }
                if (_player1Score === _player2Score) {
                    _raiseDeuceEvent();
                    return;
                }
            }

            _raiseOtherScoreEvent();
        };

        return {
            getPlayer1: _getPlayer1,
            getPlayer2: _getPlayer2,
            getPlayer1Score: _getPlayer1Score,
            getPlayer2Score: _getPlayer2Score,
            pointScoredByPlayer1: _pointScoredByPlayer1,
            pointScoredByPlayer2: _pointScoredByPlayer2,
            reset: _reset,
            setWinCallback: _setWinCallback,
            setAdvantageCallback: _setAdvantageCallback,
            setDeuceCallback: _setDeuceCallback,
            setOtherScoreCallback: _setOtherScoreCallback
        };
    };
} ());
