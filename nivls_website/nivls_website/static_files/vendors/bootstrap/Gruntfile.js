module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
                '* <%= pkg.name %>.js v<%= pkg.version %> by @fat and @mdo\n' +
                '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                '* <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
                '*/\n',
        jqueryCheck: 'if (!jQuery) { throw new Error(\"Bootstrap requires jQuery\") }\n\n',
        // Task configuration.
        clean: {
            dist: ['dist']
        },
        concat: {
            options: {
                banner: '<%= banner %><%= jqueryCheck %>',
                stripBanners: false
            },
            bootstrap: {
                src: ['js/transition.js', 'js/alert.js', 'js/button.js', 'js/carousel.js', 'js/collapse.js', 'js/dropdown.js', 'js/modal.js', 'js/tooltip.js', 'js/popover.js', 'js/scrollspy.js', 'js/tab.js', 'js/affix.js'],
                dest: 'dist/static/bootstrap/js/<%= pkg.name %>.js'
            }
        },
        jshint: {
            options: {
                jshintrc: 'js/.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['js/*.js']
            },
        },
        recess: {
            options: {
                compile: true
            },
            bootstrap: {
                files: {
                    'dist/static/bootstrap/css/bootstrap.css': ['less/bootstrap.less']
                }
            },
            min: {
                options: {
                    compress: true
                },
                files: {
                    'dist/static/bootstrap/css/bootstrap.min.css': ['less/bootstrap.less']
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            bootstrap: {
                files: {
                    'dist/static/bootstrap/js/<%= pkg.name %>.min.js': ['<%= concat.bootstrap.dest %>']
                }
            }
        },
    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');


    // JS distribution task.
    grunt.registerTask('dist-js', ['concat', 'uglify']);

    // CSS distribution task.
    grunt.registerTask('dist-css', ['recess']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js']);

    // Default task.
    grunt.registerTask('default', ['dist']);
};
