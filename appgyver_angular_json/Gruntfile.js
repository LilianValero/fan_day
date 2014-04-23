'use strict';

module.exports = function(grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        compass: {
            options: {
                sassDir: 'www/stylesheets',
                cssDir: 'dist/stylesheets',
                imagesDir: 'www/images',
                fontsDir: 'www/fonts',
                httpImagesPath: '/images',
                relativeAssets: false,
                debugInfo: false
            },
            dist: {}
        }
    });

    grunt.registerTask('default', ['steroids-make','compass']);
};
