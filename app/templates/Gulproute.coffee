# -------------
# ROUTER CLASS
# -------------
gulp = require 'gulp'

# Router allows for most processors to be injected
# Doesn't work properly with sass or ruby-sass, :S
class exports.Route

	# @param [String] src A collection of input files
	# @param [String] dest The location of the output files
	# @param [String] initSay User message
	constructor: (src,dest,initSay) ->
		@src = src
		@dest = dest
		@files = gulp.src src
		# terminal colours
		@colors = {
			red: '\x1b[0;31m',
			green: '\x1b[0;32m',
			yellow: '\x1b[0;33m',
			reset: '\x1b[0m',
		}
		@say initSay
		
	# @param [String] words
	say: (words) ->
		console.log @colors.green+words+@colors.reset
	
	# process files in the pipe
	# @param [Array] steps The processes to apply
	chain: (steps, andGo = true) ->
		for step in steps
			@files.pipe step
		if andGo then @go()
	
	# output files - pipe them to their destination
	go: () ->
		@files.pipe gulp.dest @dest
