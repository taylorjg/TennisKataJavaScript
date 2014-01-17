/* global document */

(function () {

    "use strict";

    $(document).ready(function() {

        var controller = window.tennisKata.factory.createController();

        controller.setScoreChangedCallback(function(callbackData) {
            $("#player1Name").html(callbackData.player1Name);
            $("#player1Score").html(callbackData.player1Score);
            $("#player2Name").html(callbackData.player2Name);
            $("#player2Score").html(callbackData.player2Score);
        });

        $("#player1ScoresPointBtn").click(function() {
            controller.pointScoredByPlayer1();
        });

        $("#player2ScoresPointBtn").click(function() {
            controller.pointScoredByPlayer2();
        });

        $("#resetBtn").click(function() {
            controller.reset();
        });
    });

} ());
