/* exported it_multiple */

(function(){

    "use strict";

    window.it_multiple = function (description, fn, testCases) {
        var numTests = testCases.length;
        var formattedTestCount = " (" + numTests + " " + ((numTests === 1) ? "test" : "tests") + ")";
        describe(description + formattedTestCount, function () {
            // jshint -W083
            // W083: Don't make functions within a loop.
            for (var i = 0; i < numTests; i++) {
                (function (testCase) {
                    var formattedTestCase = "(" + JSON.stringify(testCase) + ")";
                    it(description + formattedTestCase, function () {
                        if (_.isArray(testCase)) {
                            fn.apply(this, testCase);
                        } else {
                            fn.call(this, testCase);
                        }
                    });
                } (testCases[i]));
            }
        });
    };
}());
