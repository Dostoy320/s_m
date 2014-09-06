module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: ['static/js/**/*.js'],
				dest: 'static/dist/s_m.js'
			}
		},
		watch: {
			javscript: {
				files: ['static/js/**/*.js'],
				tasks: ['concat:dist'],
				options: { livereload: true}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'watch']);
};