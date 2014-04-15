/* exported it_multiple */

(function(){

    "use strict";

    window.it_multiple = function (description, fn, testCases) {

        var numTests = testCases.length;
        var formattedTestCount = " (" + numTests + " " + ((numTests === 1) ? "test" : "tests") + ")";

        var myIsArray = Array.isArray || function(obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        };

        var invokeNormalItForTestCase = function (testCase) {
            var formattedTestCase = "(" + JSON.stringify(testCase) + ")";
            it(description + formattedTestCase, function () {
                if (myIsArray(testCase)) {
                    fn.apply(this, testCase);
                } else {
                    fn.call(this, testCase);
                }
            });
        };

        describe(description + formattedTestCount, function () {

            for (var i = 0; i < numTests; i++) {
                invokeNormalItForTestCase(testCases[i]);
            }
        });
    };
}());
