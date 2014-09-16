/*
 * silkscreen
 * http://github.com/typesettin/silkscreen
 *
 * Copyright (c) 2014 Yaw Joseph Etse. All rights reserved.
 */
'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		jsbeautifier: {
			files: ['<%= jshint.all %>'],
			options: {
				config: '.jsbeautify'
			}
		},
		simplemocha: {
			options: {
				globals: ['should', 'navigator'],
				timeout: 3000,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'spec'
			},
			all: {
				src: 'test/**/*.js'
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'config/**/*.js',
				'index.js',
				'lib/**/*.js',
				'routes/**/*.js',
				'test/**/*.js',
				'client/**/*.js',
			]
		},
		jsdoc: {
			dist: {
				src: ['lib/*.js', 'test/*.js'],
				options: {
					destination: 'doc/html',
					configure: 'jsdoc.json'
				}
			}
		},
		browserify: {
			dist: {
				files: {
					'public/scripts/index.js': ['client/scripts/**/*.js'],
				},
				options: {
					// transform: ['coffeeify']
				}
			}
		},
		uglify: {
			my_target: {
				options: {
					sourceMap: true,
					sourceMapName: 'public/scripts/index-sourcemap.map'
				},
				files: {
					'public/scripts/index.min.js': ['public/scripts/index.js']
				}
			}
		},
		less: {
			development: {
				options: {
					paths: ['client/stylesheets'],
					yuicompress: true
				},
				files: {
					'public/styles/manuscript.css': ['client/stylesheets/**/*.less'],
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/styles/manuscript.min.css': ['public/styles/manuscript.css']
				}
			}
		},
		watch: {
			scripts: {
				// files: '**/*.js',
				files: [
					'Gruntfile.js',
					'config/**/*.js',
					'index.js',
					'lib/**/*.js',
					'client/**/*.js',
					'client/**/*.less',
					'test/**/*.js',
				],
				tasks: ['lint', 'browserify', /*'doc',*/ 'test', 'less'],
				options: {
					interrupt: true
				}
			}
			// files: "./assets/stylesheets/less/*",
			// tasks: ["less"]
		}
	});

	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['lint', 'browserify', 'doc', 'cssmin', 'uglify', 'test', 'less']);
	grunt.registerTask('lint', ['jshint', 'jsbeautifier']);
	grunt.registerTask('doc', 'jsdoc');
	grunt.registerTask('test', 'simplemocha');
};
