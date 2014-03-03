/**
 * Created by taylojo on 03/03/14.
 */

(function(){

    "use strict";

    describe("Player tests", function() {

        it("players are independent of each other", function() {
            var playerX = window.tennisKata.model.player("Azarenka");
            var playerY = window.tennisKata.model.player("Wozniacki");
            expect(playerX.getName()).toBe("Azarenka");
            expect(playerY.getName()).toBe("Wozniacki");
        });
    });
}());
