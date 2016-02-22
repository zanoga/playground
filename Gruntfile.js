module.exports = function(grunt) {

  grunt.initConfig({
    requirejs: {
        options: {
            baseUrl: '.',
            config: ['js/require.config.js'],
            name: 'js/main',
    		require: 'bower_components/requirejs/require',
    		almond: 'bower_components/almond/almond',
            out: 'build/main.js'
        },
        prod: {
    		options: {
    			build: true
    		}
        }
    },

    uglify: {
        prod: {
            files: {
                'build/main.min.js': ['build/main.js']
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-require');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['requirejs:prod']);

};
