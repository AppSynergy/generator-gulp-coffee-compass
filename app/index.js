'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var util = require('util');
var path = require('path');

var GCCGenerator = module.exports = function GCCGenerator(args, options, config) {
  
  yeoman.generators.Base.apply(this, arguments);

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'src/index.html'));
};

util.inherits(GCCGenerator, yeoman.generators.Base);

GCCGenerator.prototype.askQuestions = function askQuestions() {
  var cb = this.async();
  var prompts = [
    {
      name: 'appName',
      message: 'What is the name of your app?',
      default: (this.appname)
    }, {
      name: 'appDesc',
      message: 'Write a description for this app.',
      default: (this.appname)
    }, {
      name: 'appLicense',
      type: 'list',
      message: 'Choose a license:',
      choices: ['MIT', 'GNU GPL', 'DWTFYL'],
      default: 'MIT'
    }, {
      name: 'robotImposter',
      type: 'confirm',
      message: 'Are you a robot imposter?',
      default: false
    }
  ];
  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.appDesc = props.appDesc;
    this.appLicense = props.appLicense;
    this.robotImposter = props.robotImposter;
    cb();
  }.bind(this));
};

GCCGenerator.prototype.createDirLayout = function createDirLayout() {
  this.mkdir('src/coffee');
  this.mkdir('src/sass');
  this.mkdir('src/templates');
  this.mkdir('src/data');
  this.mkdir('node_modules');
  this.mkdir('bower_components');
};

GCCGenerator.prototype.gulpfiles = function gulpfile() {
  this.copy('Gulpfile.js', 'Gulpfile.js');
  this.copy('Gulpfile.coffee', 'Gulpfile.coffee');
  this.copy('Gulproute.coffee', 'Gulproute.coffee');
  this.copy('readme.md', 'readme.md');
};

GCCGenerator.prototype.dependancyRosters = function deps() {
  this.copy('package.json', 'package.json');
  this.copy('bower.json', 'bower.json');
  this.copy('Gemfile', 'Gemfile');
  this.copy('config.rb', 'src/sass/config.rb');
};

GCCGenerator.prototype.exampleSrc = function src() {
  this.copy('src/Example.coffee', 'src/coffee/Example.coffee');
  this.copy('src/default.json', 'src/data/default.json');
  this.copy('src/sass-one.sass', 'src/sass/sass-one.sass');
  this.copy('src/sass-two.sass', 'src/sass/sass-two.sass');
};

GCCGenerator.prototype.writeIndex = function writeIndex() {
  var mainCssFiles = ['css/sass-one.css', 'css/sass-two.css'];
  var mainJsFiles = [
    'js/jquery/dist/jquery.min.js',
    'js/bootstrap/dist/js/bootstrap.min.js',
    'js/Example.js'
  ];
  
  this.indexFile = this.appendStyles(this.indexFile, 'css/main.css', mainCssFiles);
  
  this.indexFile = this.appendScripts(this.indexFile, 'js/main.js', mainJsFiles, null, 'app');
  
  this.write('src/index.html', this.indexFile);
};

GCCGenerator.prototype.install = function () {
  if (this.options['skip-install']) {
    return;
  }
  this.log(yosay(
    'Prepare to build ' + chalk.red('gulp-coffee-compass') + '!'
  ));
  
  this.spawnCommand('npm', ['install']);
  this.spawnCommand('bower', ['install']);
  this.spawnCommand('bundle', ['install']);
  this.spawnCommand('gulp');
};
  
GCCGenerator.prototype.end = function () { 
  this.log(yosay(
    'Application built. Run ' + chalk.green('gulp dev') + 'for a server.'
  ));

};

