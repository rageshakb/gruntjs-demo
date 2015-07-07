module.exports = function (grunt) {

	require('time-grunt')(grunt);

	require('load-grunt-tasks')(grunt);

	var paths = {
		src : 'src',
		dest : 'dist'
	};

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		paths : paths,
		
		/*uglify : {
			javascript : {
				options : {
					compress : true
				},
				files : {
					//'dist/scripts/libs.min.js' : 'dist/scripts/libs.js',
					'dist/scripts/app.min.js' : 'src/scripts/app.js'
				}
			}
		},*/
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
				/*options: {
          			livereload: true
        		},*/
				files : ['src/templates/**/*.html'],
				tasks : ['ngtemplates']
			}
		},
		connect: {
		  task: { // give your task a name
		    options: {
		      port: 9000, // configure your port here
		      base: 'dist',//./dest // configure your site distribution path here		      
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
		gitpull : {
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
					tag: '1.0.0',
                	message: 'Testing',
                	cwd : '/home/ragesh/Workspaces/grunt_ws/sample-demo'
				}
			}
		},

		useminPrepare : {
			/*html : 'src/index.html',
			options : {
				root: 'src',
				dest : 'dist'
			}*/	
			html: 'src/index.html',
        	options: {
          		dest: 'dist'
        	}		
		},
		usemin : {
			//html : 'dist/index.html',
			/*options: {
                dirs: ['src']
            },*/
            //html: ['src/**/*.html']
             html: ['dist/{,*/}*.html'],
        	 css: ['dist/css/{,*/}*.css'],
        	 options: {
          		dirs: ['dist']
        	}
		},
		copy : {
			templates : {
				files : [{
				expand : true,
				cwd : 'src',
				src : ['templates/**/*.html', 'index.html'],
				dest : 'dist'
			}]
		}
			
		},
		clean : {
			src : ['dist']
		}
		
	});
	

	grunt.registerTask('git-release',
	 [
	 	'gitadd',
	 	'gitcommit',
	 	'gitpull',
	 	'gitpush'
	 ]);

	grunt.registerTask('use', 
	[
	 	'clean',
	 	'copy',
	  	'useminPrepare',
	  	'concat',	  
	  	'uglify',
	  	'cssmin',	  
	  	'usemin'
	]);

	grunt.registerTask('build', 
	[ 
	  'clean',
	  'jshint',
	  'copy',
	  'useminPrepare',
	  'concat',	  
	  'uglify',
	  'cssmin',	    
	  'ngtemplates',
	  'usemin',	
	  'connect',
	  'watch'
	]);
}