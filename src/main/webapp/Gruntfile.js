module.exports = function (grunt) {

    // Carrega as tasks do Grunt declaradas como dependência no package.json
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist'],
            tmp: ['.tmp']
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        copy: {
            dist: {
                src: [
                    '**',
                    '!scripts/**/*.js',
                    '!assets/styles/**',
                    '!node_modules/**',
                    '!vendor/**',
                    'vendor/**/*.html',
                    '!.bowerrc',
                    '!bower.json',
                    '!Gruntfile.js',
                    '!package.json'
                ],
                dest: 'dist/'
            },
            fonts: {
                files: [{
                    expand: true,
                    flatten: true,
                    filter: 'isFile',
                    src: [
                        "vendor/**/fonts/*"
                    ],
                    dest: 'dist/assets/fonts/'
                }]
            }
        },
        usemin: {
            html: ['dist/index.html']
        },
        ngAnnotate: {
            options: {
                singleQuotes: true,
                separator: ';'
            },
            tmp:{
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        }
    });

    /* Tasks */
    grunt.registerTask('before-prod', ['clean:dist', 'copy:dist', 'copy:fonts']);
    grunt.registerTask('generate-prod', ['useminPrepare', 'concat', 'ngAnnotate:tmp', 'cssmin', 'uglify', 'usemin']);
    grunt.registerTask('post-prod', ['clean:tmp']);
    grunt.registerTask('prod', ['before-prod', 'generate-prod', 'post-prod']);

};