/* global document */

(function () {

    "use strict";

    $(document).ready(function() {

        var _controller = window.tennisKata.factory.createController();

        var _rightJustifyScoreText = function(scoreText, minWidth) {
            var padding = "";
            for (var i = scoreText.length; i < minWidth; i++) {
                padding += "&nbsp;";
            }
            return padding + scoreText;
        };

        _controller.addResetEventHandler(function() {
            $("#player1ScoresPointBtn").prop("disabled", false);
            $("#player2ScoresPointBtn").prop("disabled", false);
        });

        _controller.addScoreChangedEventHandler(function(eventData) {

            $("#player1Name").html(eventData.player1Name);
            $("#player1Points").html(_rightJustifyScoreText(eventData.player1Points, 2));
            $("#player1Games").html(_rightJustifyScoreText(eventData.player1Games, 2));
            $("#player1Sets").html(eventData.player1Sets);

            $("#player2Name").html(eventData.player2Name);
            $("#player2Points").html(_rightJustifyScoreText(eventData.player2Points, 2));
            $("#player2Games").html(_rightJustifyScoreText(eventData.player2Games, 2));
            $("#player2Sets").html(eventData.player2Sets);
        });

        _controller.addMatchWonEventHandler(function(/* winner */) {
            $("#player1ScoresPointBtn").prop("disabled", true);
            $("#player2ScoresPointBtn").prop("disabled", true);
        });

        var _updateServer = function(server) {
            $("#player1Serving").toggle(server === _controller.getPlayer1());
            $("#player2Serving").toggle(server === _controller.getPlayer2());
        };

        _controller.addServerChangedEventHandler(_updateServer);

        $("#setPlayerNamesBtn").click(function() {
            var player1Name = $("#player1NameTxt").val();
            var player2Name = $("#player2NameTxt").val();
            _controller.setPlayerNames(player1Name, player2Name);
        });

        $("#setMatchLengthBtn").click(function() {
            var matchLengthString = $("input[name='matchLengthRadioButtonGroup']:checked").val();
            var matchLength = parseInt(matchLengthString, 10);
            _controller.setMatchLength(matchLength);
        });

        $("#player1ScoresPointBtn").click(function() {
            _controller.player1WinsPoint();
        });

        $("#player2ScoresPointBtn").click(function() {
            _controller.player2WinsPoint();
        });

        $("#resetBtn").click(function() {
            _controller.reset();
            _updateServer(_controller.getServer());
        });

        _controller.reset();

        var _updateMatchLengthRadioButtons = function() {
            var matchLength = _controller.getMatchLength();
            $("input[name='matchLengthRadioButtonGroup'][value='" + matchLength + "']").prop("checked", true);
        };

        _updateMatchLengthRadioButtons();
        _updateServer(_controller.getServer());
    });

} ());
