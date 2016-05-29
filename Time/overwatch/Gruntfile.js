/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    replace: {
      dev: {
        overwrite: true,
        src: ['./Client/views/FbBtnView.js'],
        replacements: [{
          from: '238534016527081',                   
          to: '239756926404790'
        }]
      },
      deploy: {
        overwrite: true,
        src: ['./Client/views/FbBtnView.js'],
        replacements: [{
          from: '239756926404790',                 
          to: '238534016527081'
        }]
      },
    }
  });

  grunt.loadNpmTasks('grunt-text-replace');

  //Switch to dev
  grunt.registerTask('dev', ['replace:dev']);

  //switch to deploy
  grunt.registerTask('deploy', ['replace:deploy']);

};
