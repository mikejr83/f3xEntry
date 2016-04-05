/**
 * Compile all the angular templates into the $templateCache.
 *
 * ---------------------------------------------------------------
 *
 *
 */

module.exports = function (grunt) {

  grunt.config.set('ngtemplates', {
    app: {
      src: 'assets/angularApp/**/*.html',
      dest: '.tmp/public/js/templateCache.js',
      options: {
        htmlmin:  { collapseWhitespace: true, collapseBooleanAttributes: true },
        url: function (url) {
          return url.replace('assets/', '');
        }
      }
    }
  });

  try{
  grunt.loadNpmTasks('grunt-angular-templates');
  } catch (e) {console.log(e);}
};
