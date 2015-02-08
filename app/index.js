'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var util = require('util');
var path = require('path');

var GCCGenerator = module.exports = function GCCGenerator(args, options, config) {
  
  yeoman.generators.Base.apply(this, arguments);

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
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
};

GCCGenerator.prototype.dependancyRosters = function deps() {
  this.copy('package.json', 'package.json');
  this.copy('bower.json', 'bower.json');
  this.copy('Gemfile', 'Gemfile');
};

GCCGenerator.prototype.exampleSrc = function src() {
  this.copy('src/Example.coffee', 'src/classes/Example.coffee');
  this.copy('src/default.json', 'src/data/default.json');
};

GCCGenerator.prototype.install = function () {
  if (this.options['skip-install']) {
    return;
  }
  this.log(yosay(
    'Prepare to build ' + chalk.red('gulp-coffee-compass') + '!'
  ));

  var done = this.async();

  this.installDependencies({
    skipMessage: this.options['skip-message'],
    skipInstall: this.options['skip-install'],
    callback: done
  });
};

