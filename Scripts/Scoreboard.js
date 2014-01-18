(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    var LOVE_TEXT = "";
    var FIFTEEN_TEXT = "15";
    var THIRTY_TEXT = "30";
    var FORTY_TEXT = "40";
    var WON_TEXT = "W";
    var LOST_TEXT = "L";
    var ADVANTAGE_TEXT = "A";

    var _scoreTextDictionary = [
        LOVE_TEXT,
        FIFTEEN_TEXT,
        THIRTY_TEXT,
        FORTY_TEXT
    ];

    window.tennisKata.scoreboard = function(game) {

        var _game = game;

        var _getScores = function() {
            var w = _game.winner();
            var a = _game.advantage();
            var d = _game.deuce();
            var p1 = _game.getPlayer1();
            var p2 = _game.getPlayer2();
            var s1 = _game.getPlayer1Score();
            var s2 = _game.getPlayer2Score();
            if (w === p1) { return [WON_TEXT, LOST_TEXT]; }
            if (w === p2) { return [LOST_TEXT, WON_TEXT]; }
            if (a === p1) { return [ADVANTAGE_TEXT, FORTY_TEXT]; }
            if (a === p2) { return [FORTY_TEXT, ADVANTAGE_TEXT]; }
            if (d) { return [FORTY_TEXT, FORTY_TEXT];}
            return [_scoreTextDictionary[s1], _scoreTextDictionary[s2]];
        };

        return {
            getScores:_getScores
        };
    };
} ());
