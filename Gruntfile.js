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
    dirs: {

    },
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/app.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
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
        src: 'Gruntfile.js'
      },
      lib: {
        options: {
          jshintrc: 'lib/.jshintrc'
        },
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib']//, 'nodeunit'
      },
      test: {
        files: '<%= jshint.test.src %>',
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
              'ember/ember.js'
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
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['concat', 'uglify']);//'jshint', 'nodeunit',
  grunt.registerTask('dev', ['concat', 'watch', 'copy']);
};
