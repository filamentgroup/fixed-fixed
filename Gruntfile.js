/*global module:false*/
/*global require:true*/
module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({

		// Constants
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
		'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
		'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
		'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
		' Licensed <%= pkg.license %> */\n',
		name: 'fixedfixed',

		// Task Configuration
		jshint: {
			src: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'src/<%= name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			pretty: {
				src: 'src/<%= name %>.js',
				dest: 'dist/<%= name %>.build.js',
				options: {
					mangle: false,
					compress: false,
					beautify: true,
					preserveComments: 'all'
				}
			},
			min: {
				src: 'src/<%= name %>.js',
				dest: 'dist/<%= name %>.min.js'
			}
		},
		qunit: {
			all: ['test/**/*.html']
		}
	});

	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	// Default task.
	grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );
	grunt.registerTask( 'lint', [ 'jshint' ] );
	grunt.registerTask( 'default', [ 'jshint', 'qunit', 'uglify' ] );
};
