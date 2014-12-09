module.exports = function (grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            hybrid: {
                options: {
                    baseUrl: "./",
                    name: 'src/almond',
                    include: [
                        'src/hybrid/main'
                    ],
                    out: 'dist/BlendHybridUI-<%= pkg.version %>.js',
                    optimize: 'none',
                    wrap: true
                }
            },
            web: {
                options: {
                    baseUrl: "./",
                    name: 'src/almond',
                    include: [
                        'src/web/main'
                    ],
                    out: 'dist/BlendWebUI.js',
                    optimize: 'none',
                    wrap: true
                }
            },
            boost: {
                options: {

                    baseUrl: "./",
                    name: 'src/almond',
                    include: ["src/boost/main"],
                    out: "dist/BlendUIBoost.js",
                    optimize: "none",
                    wrap: true
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/web/**/*.js', 'src/hybrid/**/*.js', 'src/boost/**/*.js'],
            options: {
                '-W083': true, //for循环中function函数
                '-W054': true, //new Function
                '-W061': true,
                '-W030': true,
                sub: true,
                globals: {
                    '$': true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        uglify: {
            hybrid: {
                files: [{
                    src: 'dist/BlendHybridUI-<%= pkg.version %>.js',
                    dest: 'dist/BlendHybridUI-<%= pkg.version %>.min.js'
                }, {
                    src: 'dist/BlendHybridUI-<%= pkg.version %>.js',
                    dest: 'dist/BlendHybridUI.min.js'
                }]
            },
            web: {
                src: ['dist/BlendWebUI.js'],
                dest: 'dist/BlendWebUI.min.js'
            },
            boost: {
                src: ['dist/BlendUIBoost.js'],
                dest: 'dist/BlendUIBoost.min.js'
            }
        },
        qunit: {
            all: {
                options: {
                    urls: [
                        'test/blendui.html'
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: ['Gruntfile.js', 'src/web/**/*.js', 'src/hybrid/**/*.js', 'src/boost/**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('hybrid', [
        'jshint',
        'requirejs:hybrid',
        'uglify:hybrid'
    ]);
    grunt.registerTask('web', [
        'jshint',
        'requirejs:web',
        'uglify:web'
    ]);
    grunt.registerTask('boost', [
        'jshint',
        'requirejs:boost',
        'uglify:boost'
    ]);
    grunt.registerTask('test', [
        'jshint',
        'qunit'
    ]);
};
