module.exports = function(grunt) {

    grunt.initConfig({

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            css: {
                files: ['app/**/*.css'],
                tasks: ['cssmin']
            },
            images: {
                files: ['app/images/*', 'app/images/**/*'],
                tasks: ['imagemin']
            },
            js: {
                files: ['app/**/*.js'],
                tasks: ['uglify']
            },
            html: {
                files: [ 'app/html/*.html', 'app/html/**/*.html' ],
                options: {livereload: true }
            }
        },
        copy: {
            
            css: {
                expand: true,
                cwd : 'app/style',
                src : ['*.min.css'],
                dest : 'build/css',
                filter: 'isFile'
            },
            images: {
                expand: true,
                cwd: 'app/images',
                src: ['**'],
                dest: 'build/images'
            },
            fonts: {
                expand: true,
                cwd: 'app/fonts',
                src: ['**'],
                dest: 'build/fonts'
            }
        },
        cssmin : {
            options: {
              keepSpecialComments: 0
            },
            minify : {
                expand : true,
                cwd : 'app/style',
                src : ['*.css', '!*.min.css'],
                dest : 'build/css',
                ext : '.min.css'
            },
            combine : {
                files: {
                    'build/css/digital.min.css': ['build/css/bootstrap.min.css','build/css/style.min.css','build/css/responsive.min.css']
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/js/digital.min.js': ['app/js/support/jquery-1.11.2.min.js', 'app/js/support/bootstrap.min.js','app/js/support/jquery.easypiechart.min.js','app/js/main.js']
                }
            }
        },
        browserSync: {
            bsFiles: {
                src: [
                    'build/css/*.css',
                    'build/js/*.js',
                    'build/*.html'
                ]
            },
            options: {
                watchTask: true,
                server: "build/"
            }
        },
        notify: {
            server: {
                options: {
                    message: 'Server is ready!'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-npm-install');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');
    
    // Load the plugins to run your tasks
    //require("load-grunt-tasks")(grunt, { scope: "devDependencies" });
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    

    grunt.registerTask('default', 'html templates', ['copy', 'cssmin','uglify','browserSync',  'notify:server', 'watch']);
   // grunt.registerTask('purecss', 'convert into one', ['purifycss']);

};
