/* Author Piyush Arya */
// Livereload browser page using Connect Middleware
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
// Connect to server . Called from connect
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};
module.exports = function(grunt) {
    // include all the node modules starting with 'grunt'
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var global_config = {
        app: 'app',
        deploy: 'deploy'
    };
    //Project configuration
    grunt.initConfig({
        //pkg: grunt.file.readJSON('package.json'),
        // confit initialization
        config: global_config,
        // Connect the localhost server
        connect: {
            all: {
                options: {
                    port: 9000,
                    hostname: "0.0.0.0",
                    middleware: function(connect, options) {
                        return [
                            // Livereload browser page using Connect Middleware
                            lrSnippet,
                            // load app folder
                            mountFolder(connect, global_config.app)
                        ];
                    },
                    base: global_config.app
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= connect.all.options.port%>'
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            html: {
                files: ['<%= config.app %>/*.html', '<%= config.app %>/partials/**/*.html', '<%= config.app %>/pages/**/*.html'],
                tasks: ['includes', 'watch']
            },
            css: {
                files: ['<%= config.app %>/sass/**/*.scss'],
                tasks: ['compass:server']
            },

            js: {
                files: ['<%= config.app %>/scripts/**/*.js'],
            },

            images: {
                files: ['<%= config.app %>/images/**/*.{jpg,png}'],
                tasks: ['includes', 'watch']
            }

        },
        includes: {
            files: {
                src: ['<%= config.app %>/pages/*.html'],
                dest: '<%= config.app %>/',
                flatten: true,
                cwd: '.',
                options: {
                    debug: false,
                    silent: false,
                    includePath: '<%= config.app %>/partials'
                }
            }
        },

        compass: {
            options: {
                sassDir: '<%= config.app %>/sass/',
                cssDir: '<%= config.app %>/css'
            },
            server: {
                options: {
                    config: 'config.rb',
                    debugInfo: false
                }
            }
        },
        uglify: {
            build: {
                files: {
                    '<%= config.app %>/js/page.min.js': ['<%= config.app %>/scripts/page/landing.js',
                                                        '<%= config.app %>/scripts/page/app.js',
                                                        '<%= config.app %>/scripts/page/constants.js'],
                    '<%= config.app %>/js/utils.min.js': ['<%= config.app %>/scripts/utils/*.js'],
                    '<%= config.app %>/js/components.min.js': ['<%= config.app %>/scripts/components/*.js'],
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['<%= config.app %>/scripts/libs/d3.js',
                '<%= config.app %>/scripts/libs/jquery-2.1.4.js',
                '<%= config.app %>/scripts/libs/jquery-ui.js',
                '<%= config.app %>/scripts/libs/jquery.ui.touch-punch.min.js',
                '<%= config.app %>/scripts/libs/bootstrap.min.js'],
                dest: '<%= config.app %>/js/libs.js',
            },
        },
        // Copy module to copy the files during processes
        copy: {
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.deploy %>',
                    src: [
                        '*.ico',
                        'font/**', ['css/*.min.css', 'css/libs/*.min.css', 'css/libs/*.css'],
                        'js/*.js',
                        'json/*.json'
                    ]
                }]
            },
        },

        // Cleaning the old files and building new files
        clean: {
            build: '<%= config.deploy %>',
            develop: ['<%= config.app %>/js/*.js', '<%= config.app %>/min/*.js', '<%= config.app %>/css/*.min.css']
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: '<%= config.app %>/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= config.app %>/css',
                ext: '.min.css'
            }
        },

        // Minifies Images during build process
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= config.deploy %>/images'
                }]

            }
        },
        // Format HTML with proper indentation
        prettify: {
            options: {
                indent: 4,
            },
            all: {
                expand: true,
                cwd: '<%= config.app %>',
                ext: '.html',
                src: ['*.html'],
                dest: '<%= config.deploy %>'
            },
        },

    });


    grunt.registerTask('develop', [
        'clean:develop',
        'connect',
        'compass',
        'includes',
        'open',
        'watch'
    ]);

    grunt.registerTask('deploy', [
        'clean:build',
        'cssmin',
        'uglify',
        'concat',
        'prettify',
        'imagemin',
        'copy:build'
    ]);

};
