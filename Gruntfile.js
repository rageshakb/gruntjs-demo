module.exports = function (grunt) {

	require('time-grunt')(grunt);

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		/*bower_concat : {
			all : {
				options : {
					separator : ';\n'
				},
				dest : 'dist/scripts/libs.js',
				mainFiles : {
					'requirejs' : 'require.js',
					'angular' : 'angular.js',
					'angular-route' : 'angular-route.js',
					'jquery' : 'src/jquery.js',
					'bootstrap' : 'dist/js/bootstrap.js'
				},
				dependencies: {
				  'bootstrap': ['requirejs', 'jquery'],
				   'angular' : 'requirejs'

				}
			}
		},*/
		uglify : {
			javascript : {
				options : {
					compress : true
				},
				files : {
					//'dist/scripts/libs.min.js' : 'dist/scripts/libs.js',
					'dist/scripts/app.min.js' : 'src/scripts/app.js'
				}
			}
		},
		/*concat : {
			javascript : {
				src : ['src/app.js'],
				dest : 'dist/scripts/app.js'
			},
			styles : {
				src : ['src/*.css'],
				dest : 'dist/css/styles.css'
			}
		},*/
		jshint : {
			app : {
				options : {
					reporter : require('jshint-stylish')
				},
				beforeconcat : ['src/scripts/**/*.js'],
				afterconcat : ['dist/scripts/app.js']
			}
		},
		/*cssmin : {			
			minify : {
				src : ['dist/css/*.css'],
				dest : 'dist/css/styles.min.css'
			}
		},*/
		ngtemplates : {
			//mainApp - moduleName
			mainApp  : {
				options : {
					htmlmin: {
					  collapseBooleanAttributes:      true,
					  collapseWhitespace:             true,
					  removeAttributeQuotes:          true,
					  removeComments:                 true, // Only if you don't use comment directives! 
					  removeEmptyAttributes:          true,
					  removeRedundantAttributes:      true,
					  removeScriptTypeAttributes:     true,
					  removeStyleLinkTypeAttributes:  true
					}					
				},
				cwd : 'src',
				src : ['templates/*.html'],
				dest : 'dist/scripts/templates.js'
			}
			
		},
		watch : {
			options : {
				livereload : true
			},
			/*css : {
				files : ['src/css/*.css'],
				tasks : ['copy:css']
			},*/
			js : {
				files : ['src/scripts/**/*.js'],
				tasks : ['newer:jshint', 'newer:uglify']
			},
			templates : {
				options: {
          			livereload: true
        		},
				files : ['src/templates/**/*.html'],
				tasks : ['newer:ngtemplates']
			}
		},
		connect: {
		  task: { // give your task a name
		    options: {
		      port: 9000, // configure your port here
		      base: '.',//./dest // configure your site distribution path here		      
			  message: '<%= pkg.name %> build finished successfully.'
		    }
		  }
		},
		gitadd : {
			task : {
				options : {
					all : true,
					force : true,
					cwd : '/home/ragesh/Workspaces/grunt_ws/sample-demo'
				}
			}
		},
		gitcommit : {
			task : {
				options : {
					message : 'Last commit at ' + grunt.template.today('yyyy-mm-dd'),
					allowEmpty: true,
					cwd : '/home/ragesh/Workspaces/grunt_ws/sample-demo'
				}
			}
		},
		gitpush : {
			task : {
				options : {
					remote: 'origin',
					branch : 'master',
					cwd : '/home/ragesh/Workspaces/grunt_ws/sample-demo'
				}
			}
		},
		gittag : {
			addtag : {
				options : {
					tag: '0.0.1',
                	message: 'Testing'
				}
			}
		}
		
	});

	grunt.registerTask('build', ['jshint', 
		//'bower_concat', 'concat',
			 'uglify',
			//'cssmin', 
			'ngtemplates',
			'connect', 'watch']);

	grunt.registerTask('git-release', ['gitadd', 'gitcommit', 'gitpush']);
}