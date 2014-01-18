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
                "Tests/*.js"
            ]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.registerTask("default", ["jshint"]);
};
