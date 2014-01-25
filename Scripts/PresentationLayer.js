/* global document */

(function () {

    "use strict";

    $(document).ready(function() {

        var _controller = window.tennisKata.factory.createController();

        _controller.addScoreChangedEventHandler(function(eventData) {
            $("#player1Name").html(eventData.player1Name);
            $("#player1Score").html(eventData.player1Points);
            $("#player2Name").html(eventData.player2Name);
            $("#player2Score").html(eventData.player2Points);
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
            _controller.player1WinsPoint();
        });

        $("#player2ScoresPointBtn").click(function() {
            _controller.player2WinsPoint();
        });

        $("#resetBtn").click(function() {
            _controller.reset();
        });

        _controller.reset();
    });

} ());
