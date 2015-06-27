module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['js/jquery.debouncedwidth.min.js'],
        jshint: {
            files: ['Gruntfile.js', 'js/*.js', '!js/*.min.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        uglify: {
            options: {
                banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
                "<%= grunt.template.today('yyyy-mm-dd') %>\n" +
                "<%= pkg.homepage ? '* ' + pkg.homepage + '\\n' : '' %>" +
                "* Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author %>;" +
                " License: <%= pkg.license %> */\n"
            },
            dist: {
                files: {
                    'js/jquery.debouncedwidth.min.js': 'js/jquery.debouncedwidth.js'
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['default']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['clean', 'jshint', 'uglify']);
    grunt.registerTask('serve', ['default', 'watch']);

};