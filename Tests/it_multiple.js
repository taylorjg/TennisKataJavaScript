var it_multiple = function (description, fn, testCases) {
    var numTests = testCases.length;
    var formattedTestCount = " (" + numTests + " " + ((numTests === 1) ? "test" : "tests") + ")";
    describe(description + formattedTestCount, function () {
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
