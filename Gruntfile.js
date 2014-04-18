'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    //settings: grunt.file.readJSON('settings.json'),

    locations: {
      gruntFile: 'Gruntfile.js',
      html: 'lib/**/*.html',
      css: 'lib/**/*.css',
      js: 'lib/**/*.js',
      hbs: 'lib/templates/**/*.hbs',
      test: 'test/**/*.js',
      dest: 'dist/<%= pkg.name %>'
    },
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/app.js'],
        dest: '<%= locations.dest %>.js'
      },
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= locations.dest %>.js',
        dest: '<%= locations.dest %>.min.js'
      },
    },

    nodeunit: {
      files: ['test/**/*_test.js']
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: '<%= locations.gruntFile %>'
      },
      lib: {
        options: {
          jshintrc: 'lib/.jshintrc'
        },
        src: '<%= locations.js %>'
      },
      test: {
        src: '<%= locations.test %>'
      },
    },

    handlebars: {
      compile: {
        options: {
          namespace: "JST"
        }
      },
      
      files: {
        '<%= locations.dest %>-templates.js': '<%= locations.hbs %>'
      }
    },

    watch: {
      gruntfile: {
        files: '<%= locations.gruntFile %>',
        tasks: ['concat', 'copy', 'jshint:gruntfile']
      },
      lib: {
        files: ['<%= locations.js %>', '<%= locations.html %>', '<%= locations.hbs %>'],
        tasks: ['handlebars', 'concat', 'copy']//, 'nodeunit','jshint:lib', 
      },
      test: {
        files: '<%= locations.test %>',
        tasks: ['jshint:test']//, 'nodeunit'
      },
    },
    // Copy files into dist
    copy: {
      main: {
        files: [
          // index file
          {
            expand: true,
            cwd: 'lib/',
            src: ['index.html'],
            dest: 'dist/'
          },
          // js dependencies
          {
            expand: true,
            cwd: 'bower_components',
            src: [
              'jquery/jquery.js',
              'handlebars/handlebars.js',
              'ember/ember.js',
              'ember-data/ember-data.js'
            ],
            dest: 'dist/vendor/'
          }
        ]
      }

    },

    connect: {
      server: {
        options: {
          port: 8001,
          base: 'dist/',
          keepalive: true
        }  
      }
      
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['concat', 'uglify']);//'jshint', 'nodeunit',
  //grunt.registerTask('dev', ['concatwatch']);
};
