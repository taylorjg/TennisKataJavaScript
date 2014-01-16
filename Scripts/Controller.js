// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.Controller = function() {

        var _player1 = window.tennisKata.factory.createPlayer("Player1");
        var _player2 = window.tennisKata.factory.createPlayer("Player2");
        var _game = window.tennisKata.factory.createGame(_player1, _player2);
        var _scoreboard = window.tennisKata.factory.createScoreboard(_game);

        // Should we have an array of these ?
        var _scoreChangedCallback = null;

        var _reportScore = function() {
            if (_scoreChangedCallback !== null) {
                _scoreChangedCallback({
                    player1Name: _game.getPlayer1().getName(),
                    player1Score: _scoreboard.getPlayer1Score(),
                    player2Name: _game.getPlayer2().getName(),
                    player2Score: _scoreboard.getPlayer2Score()
                });
            }
        };


        this.setScoreChangedCallback = function(cb) {
            _scoreChangedCallback = cb;
        };

        this.pointScoredByPlayer1 = function() {
            _game.pointScoredByPlayer1();
            _reportScore();
        };

        this.pointScoredByPlayer2 = function() {
            _game.pointScoredByPlayer2();
            _reportScore();
        };
    };
} ());
