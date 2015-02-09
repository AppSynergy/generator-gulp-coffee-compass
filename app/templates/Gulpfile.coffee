# ------
# SOUNDCRAFT
# Adam Marshall
# Josef Witchell
# &copy; 2015
# ------

gulp    = require 'gulp'
coffee  = require 'gulp-coffee'
watch   = require 'gulp-watch'
serve   = require 'gulp-serve'
clean   = require 'gulp-clean'
uglify  = require 'gulp-uglify'
compass = require 'gulp-compass'
swig    = require 'gulp-swig'
data    = require 'gulp-data'

# Data for swig
defaultData = (file) ->
	return require('./src/data/default.json')

# boilerplatey Route class and chain methods
Route   = require('./Gulproute.coffee').Route

# source files
src = {
	html: 'src/*.html'
	coffee: 'src/coffee/{,**/}*.coffee',
	sass: 'src/sass/{,**}*.sass',
	bower: {
		js: 'bower_components/*/dist/{,js/}*.min.{map,js}',
		css: 'bower_components/*/dist/css/*.min.{map,css}',
	}
}

# options
opts = {
	svg: {
		full: true,
		plugins: [
			{cleanupIDs: false},
			{removeDoctype: true},
			{removeMetadata: true},
			{removeXMLProcInst: true},
			{removeViewBox: true}
		]
	},
	sass: {
		config_file: 'src/sass/config.rb',
		sass: 'src/sass',
		css: 'public/css'
	}
	swig: {
		load_json: true,
		defaults: {
			cache: false,
			locals: {
				site_name: "<%= appName %>"
			}
		}
	}
}

# TYPICAL TASKS
# -------------
# default task compiles for distribution
gulp.task 'default', ['deps', 'html', 'coffee', 'sass']

# dev task runs dev versions of build tasks, watches for changes, and runs a server
gulp.task 'dev', ['serve', 'html', 'sass', 'coffee-dev', 'watch']

# DEVELOPMENT TASKS
# -----------------
gulp.task 'serve', serve('public')

gulp.task 'watch', ->
	gulp.watch src.html, ['html']
	gulp.watch src.coffee, ['coffee-dev']
	gulp.watch src.sass, ['sass']

# WATCHED TASKS
# -------------
gulp.task 'html', ->
	a = new Route src.html, './public/', "Swigging html files.."
	a.chain [data(defaultData), swig(opts.swig)]

gulp.task 'coffee', ->
	a = new Route src.coffee, 'public/js/', "Compiling coffeescipt and uglifying js.."
	a.chain [coffee(),uglify()]

gulp.task 'coffee-dev', ->
	a = new Route src.coffee, 'public/js/', "Compiling dev coffeescipt.."
	a.chain [coffee({bare: true})]
	
gulp.task 'sass', ->
	a = new Route src.sass, 'public/css/', "Compiling sass to css.."
	a.chain [compass(opts.sass)], false

# DEPENDANCY TASKS
# ----------------
gulp.task 'deps', ['bower'] # add more dependancy tasks here

gulp.task 'bower', ->
	a = new Route src.bower.css, 'public/css/', "Compiling bower css assets.."
	a.chain []
	b = new Route src.bower.js, 'public/js/', "Compiling bower js assets.."
	b.chain []

# CLEAN TASK
# ----------
gulp.task 'clean', ->
    gulp.src('public/*', {read: false}).pipe(clean())
