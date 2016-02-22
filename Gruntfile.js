module.exports = function(grunt) {

  grunt.initConfig({
    requirejs: {
        options: {
                baseUrl: '.',
                // webroot: 'script',
                config: ['js/require.config.js'],
                name: 'js/main',
        		require: 'bower_components/requirejs/require',
        		almond: 'bower_components/almond/almond',
                out: 'js/build.js'
            },
            dev: {
        		options: {
        			build: true
        		}
            }
    }
  });

  grunt.loadNpmTasks('grunt-require');

  grunt.registerTask('default', ['requirejs:dev']);

};
