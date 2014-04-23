/*
 * Default Gruntfile for AppGyver Steroids
 * http://www.appgyver.com
 *
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-steroids");
  grunt.loadNpmTasks("grunt-contrib-compass");

  grunt.registerTask("steroids-compass", "Compile sass files from the stylesheets and put them in the dist/stylesheets directory", function() {
    grunt.extendConfig({
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
        dis: {}
      }
    });
    return grunt.task.run("compass");
  });

  grunt.registerTask("default", ["steroids-make", "steroids-compass"]);
};
