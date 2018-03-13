module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        htmlmin: {
            html: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    src: ['../html/**/*.html'],
                    dest: '../publish/html'
                }]
            },
        },

        copy: {
            img: {
                files: [{
                    expand: true,
                    src: [
                        '../img/icon16.png',
                        '../img/icon38.png',
                        '../img/icon48.png',
                        '../img/icon128.png'
                    ],
                    dest: '../publish/img'
                }],
            },
            templates: {
                files: [{
                    expand: true,
                    cwd: '../',
                    src: 'templates/*.tpl',
                    dest: '../publish/'
                }]
            },
            misc: {
                files: [{
                    expand: true,
                    cwd: '../',
                    src: ['manifest.json', 'license.txt'],
                    dest: '../publish'
                }]
            }
        },

        uglify: {
            options: {
                mangle: false,
                preserveComments: true,
                beautify: true,
                verbose: true,
                sourceMap: true,
                // mangle: true,
                // preserveComments: false,
                // beautify: false,
                // verbose: false,
                // sourceMap: false,
            },
            content: {
                files: {

                    '../publish/js/options.js' : [

                        // Modules
                        '../js/modules/blacklist.js',
                        '../js/modules/optionSanitizer.js',
                        '../js/modules/defaultOptions.js',

                        // Controllers
                        '../js/controllers/optionsController.js',
                    ],


                    '../publish/js/popup.js' : [

                        // Modules
                        '../js/modules/blacklist.js',


                        // Controllers
                        '../js/controllers/popupController.js',
                    ],


                    '../publish/js/background.js' : [

                        // Modules
                        '../js/modules/blacklist.js',


                        // Controllers
                        '../js/controllers/backgroundController.js',
                    ],

                    // Runs isolated on every page (not in iframes)
                    '../publish/js/content.js' : [

                        // Modules
                        '../js/modules/initHandler.js',
                        '../js/modules/helpers.js',
                        '../js/modules/optionSanitizer.js',
                        '../js/modules/defaultOptions.js',
                        '../js/modules/options.js',
                        '../js/modules/db/db.js',
                        '../js/modules/db/db.maintenance.js',
                        '../js/modules/db/db.convertLegacy.js',
                        '../js/modules/db/indexedDBDriver.js',
                        '../js/modules/editableManager/editableManager.pathGenerator.js',
                        '../js/modules/editableManager/editableManager.pathResolver.js',
                        '../js/modules/editableManager/editableManager.placeholders.js',
                        '../js/modules/editableManager/editableManager.rules.js',
                        '../js/modules/editableManager/editableManager.js',
                        '../js/modules/ui.js',
                        '../js/modules/editablePicker.js',
                        '../js/modules/recoveryDialog.js',
                        '../js/modules/quickAccess.js',
                        '../js/modules/saveIndicator.js',
                        '../js/modules/cache.js',
                        '../js/modules/DOMEvents.js',
                        '../js/modules/keyboardShortcuts.js',
                        '../js/modules/toast.js',
                        '../js/modules/blacklist.js',

                        // Controllers
                        '../js/controllers/content/contentController.js',
                            '../js/controllers/content/recoveryDialogController.js',
                            '../js/controllers/content/quickAccessController.js',
                            '../js/controllers/content/quickAccessIconController.js',
                            '../js/controllers/content/inputSaverController.js',
                            '../js/controllers/content/keyboardShortcutController.js',
                            '../js/controllers/content/saveIndicatorController.js',
                    ],

                    // Runs as content script
                    '../publish/js/content.frameInjector.js' : [
                        '../js/modules/editableManager/editableManager.pathGenerator.js',
                        '../js/modules/cache.js',

                        '../js/controllers/content.frameInjector/frameInjectorController.js',
                            '../js/controllers/content.frameInjector/topOnlyController.js',
                            '../js/controllers/content.frameInjector/childOnlyController.js',
                    ],

                    '../publish/js/content.blacklisted.js' : [
                        '../js/modules/blacklist.js',
                        '../js/controllers/content.blacklisted/blacklistedController.js',
                    ]
                }
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '../scss',
                    src: '*.scss',
                    dest: '../publish/css/',
                    ext: '.css'
                }]
            }
        },

        watch: {
            scss: {
                files: ['../scss/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },


            js: {
                files: ['../js/**/*.js'],
                tasks: ['uglify:content'],
                options: {
                    spawn: false
                }
            },

            html: {
                files: ['../html/**/*.html'],
                tasks: ['htmlmin'],
                options: {
                    spawn: false
                }
            },

            copyIMG: {
                files: ['../img/**/*.*'],
                tasks: ['copy:img'],
                options: {
                    spawn: false
                }
            },

            copyMisc: {
                files: ['../manifest.json', '../license.txt'],
                tasks: ['copy:misc'],
                options: {
                    spawn: false
                }
            },

            copyTemplates: {
                files: ['../templates/**/*.tpl'],
                tasks: ['copy:templates'],
                options: {
                    spawn: false
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('compile', ['sass', 'uglify:content', 'htmlmin', 'copy:img', 'copy:misc', 'copy:templates'])

}