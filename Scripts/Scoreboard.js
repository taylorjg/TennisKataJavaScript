(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.scoreboard = function(game) {

        var _game = game;
        var _loveScoreText = "";
        var _15ScoreText = "15";
        var _30ScoreText = "30";
        var _40ScoreText = "40";
        var _wonScoreText = "W";
        var _lostScoreText = "L";
        var _advantageScoreText = "A";
        var _scoreToText = [
            _loveScoreText,
            _15ScoreText,
            _30ScoreText,
            _40ScoreText
        ];

        var _getScores = function() {
            var w = _game.winner();
            var a = _game.advantage();
            var d = _game.deuce();
            var p1 = _game.getPlayer1();
            var p2 = _game.getPlayer2();
            var s1 = _game.getPlayer1Score();
            var s2 = _game.getPlayer2Score();
            if (w === p1) { return [_wonScoreText, _lostScoreText]; }
            if (w === p2) { return [_lostScoreText, _wonScoreText]; }
            if (a === p1) { return [_advantageScoreText, _40ScoreText]; }
            if (a === p2) { return [_40ScoreText, _advantageScoreText]; }
            if (d) { return [_40ScoreText, _40ScoreText];}
            return [_scoreToText[s1], _scoreToText[s2]];
        };

        return {
            getScores:_getScores
        };
    };
} ());
