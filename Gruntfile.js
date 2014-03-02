/* global module */

module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({

        jshint: {
            options: grunt.file.readJSON(".jshintrc"),
            files: [
                "Gruntfile.js",
                "karma.conf.js",
                "Scripts/*.js",
                "Scripts/Model/*.js",
                "Scripts/Monitors/*.js",
                "Scripts/Presentation/*.js",
                "Tests/*.js",
                "Tests/Model/*.js",
                "Tests/Monitors/*.js",
                "Tests/Presentation/*.js"
            ]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.registerTask("default", ["jshint"]);
};
