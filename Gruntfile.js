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
      html: 'src/**/*.html',
      less: 'src/less/app/**/*.less',
      js: 'src/js/**/*.js',
      hbs: 'src/js/templates/**/*.hbs',
      bootstrap_css: 'src/less/bootstrap/bootstrap.less',
      bootstrap_js: '../../../bower_components/bootstrap/js/',
      test: 'test/**/*.js',
      dest: 'dist/<%= pkg.name %>',
      dest_tpl: 'dist/<%= pkg.name %>-templates.js'
    },
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      app: {
        src: ['<%= locations.js %>', '<%= locations.dest_tpl %>'],
        dest: '<%= locations.dest %>.js'
      },
      bootstrap: {
        src: [
          '<%= locations.bootstrap %>/affix.js',
          '<%= locations.bootstrap %>/alert.js',
          '<%= locations.bootstrap %>/button.js',
          '<%= locations.bootstrap %>/carousel.js',
          '<%= locations.bootstrap %>/collapse.js',
          '<%= locations.bootstrap %>/dropdown.js',
          '<%= locations.bootstrap %>/modal.js',
          '<%= locations.bootstrap %>/popover.js',
        ],
        dest: '<%= locations.dest %>-bootstrap.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        '<%= locations.dest %>.min.js': ['<%= locations.dest %>.js', '<%= locations.dest_tpl %>'],
        '<%= locations.dest %>.min.css': ['<%= locations.dest %>.css']
      }
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
          jshintrc: 'src/js/.jshintrc'
        },
        src: '<%= locations.js %>'
      },
      test: {
        src: '<%= locations.test %>'
      },
    },

    less: {
      development: {
        files: {
          '<%= locations.dest %>.css': ['<%= locations.less %>'],
          '<%= locations.dest %>-bootstrap.css': ['<%= locations.bootstrap_css %>']
        }
      },
      production: {
        options: {
          cleancss: true
        },
        files: {
          '<%= locations.dest %>.css': ['<%= locations.less %>'],
          '<%= locations.dest %>-bootstrap.css': ['<%= locations.bootstrap_css %>']
        }
      }
    },

    emberTemplates: {
     compile: {
        options: {
          templateBasePath: "src/js/templates"
        },
        files: {
          '<%= locations.dest %>-templates.js': ['<%= locations.hbs %>']
        }
      }
    },

    watch: {
      gruntfile: {
        files: '<%= locations.gruntFile %>',
        tasks: ['emberTemplates', 'less:development', 'concat', 'copy', 'jshint:gruntfile']
      },
      src: {
        files: ['<%= locations.js %>', '<%= locations.less %>','<%= locations.bootstrap_css %>', '<%= locations.html %>', '<%= locations.hbs %>'],
        tasks: ['emberTemplates', 'less:development', 'concat', 'copy']//, 'nodeunit','jshint:lib', 
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
            cwd: 'src/',
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
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-ember-templates');

  // Default task.
  grunt.registerTask('default', ['concat', 'uglify']);//'jshint', 'nodeunit',
  //grunt.registerTask('dev', ['concatwatch']);
};
