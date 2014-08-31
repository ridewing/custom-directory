module.exports = function(grunt)
{
	var settings = {
        pkg: grunt.file.readJSON('package.json'),

		// Compile and minify less
		less : {
			production : {
				files : {
			    	"../Includes/style.min.css": "../src/styles/style.less"
			    },
				options : {
					cleancss : true
				}
			},
			dev : {
				files: {
			      "../Includes/style/style.min.css": "../src/styles/style.less"
			    }
			}
		},
		watch: {
			files: ['../src/**/*'],
			tasks: ['lessDevelopment']
		},
		notify: {
			watch: {
				options: {
					title: 'Task Complete',  // optional
					message: 'Less compiled', //required
				}
			}
		},
		typescript: {
			base: {
				src: ['../src/scripts/**/*.ts'],
				dest: '../Includes/scripts/app.js',
				options: {
					target: 'es5', //or es3
					base_path : '../src/scripts/',
					sourcemap: false,
					declaration: false
				}
			}
		}
    };

    grunt.initConfig(settings);

    //grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-typescript');


    grunt.registerTask('default', [ 'concat:production', 'uglify:production', 'less:production']);
    grunt.registerTask('lessDevelopment', ['less:dev', 'notify:watch', 'typescript:base']);
};