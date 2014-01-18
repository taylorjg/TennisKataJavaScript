/* global document */

(function () {

    "use strict";

    $(document).ready(function() {

        var _controller = window.tennisKata.factory.createController();

        _controller.setScoreChangedCallback(function(callbackData) {
            $("#player1Name").html(callbackData.player1Name);
            $("#player1Score").html(callbackData.player1Score);
            $("#player2Name").html(callbackData.player2Name);
            $("#player2Score").html(callbackData.player2Score);
        });

        $("#setPlayerNamesBtn").click(function() {
            var player1Name = $("#player1NameTxt").val().trim();
            var player2Name = $("#player2NameTxt").val().trim();
            if (player1Name.length > 0 && player2Name.length > 0) {
                _controller.setPlayerNames(player1Name, player2Name);
                _controller.reset();
            }
        });

        $("#player1ScoresPointBtn").click(function() {
            _controller.pointScoredByPlayer1();
        });

        $("#player2ScoresPointBtn").click(function() {
            _controller.pointScoredByPlayer2();
        });

        $("#resetBtn").click(function() {
            _controller.reset();
        });

        _controller.reset();
    });

} ());
