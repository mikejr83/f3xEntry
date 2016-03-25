/**
 * Install bower components.
 *
 * ---------------------------------------------------------------
 *
 * Installs bower components and copies the required files into the assets folder structure.
 *
 */



module.exports = function (grunt) {
  var path = require('path'),
    targetDir = '.tmp/public';

  grunt.config.set('bower', {
    install: {
      options: {
        targetDir: targetDir,
        layout: function (type, component, source) {
          var renamedType = type,
            destPath = '';
          if (type == 'js') {
            destPath = path.join('js/dependencies', component);
          } else if (type == 'css') {
            destPath = path.join('styles', component);
          } else if (type == 'fonts') {
            if (component == 'bootstrap') {
              destPath = 'styles/fonts';
            } else {
              destPath = path.join('fonts', component);
            }
          }

          return destPath;
        },
        install: true,
        cleanTargetDir: false,
        cleanBowerDir: false
          //verbose: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
};
