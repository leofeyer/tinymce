/*eslint-env node */

module.exports = function (grunt) {
  grunt.initConfig({
    less: {
      desktop: {
        options: {
          cleancss: true,
          strictImports: true,
          compress: true,
          yuicompress: true,
          sourceMap: true,
          sourceMapRootpath: '../../',
          optimization: 2
        },
        files: {
          'dist/contao/skin.min.css': 'src/main/less/desktop/Skin.less' // destination file and source file
        }
      },

      content: {
        options: {
          cleancss: true,
          strictImports: true,
          compress: true
        },
        files: {
          'dist/contao/content.min.css': 'src/main/less/desktop/Content.less' // destination file and source file
        }
      },

      "content-inline": {
        options: {
          cleancss: true,
          strictImports: true,
          compress: true
        },
        files: {
          'dist/contao/content.inline.min.css': 'src/main/less/desktop/Content.Inline.less' // destination file and source file
        }
      }
    },

    copy: {
      "plugin": {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: "src/main/fonts",
            src: [
              "**",
              "!*.json",
              "!*.md"
            ],
            dest: "dist/contao/fonts"
          },
          {
            expand: true,
            flatten: true,
            cwd: "src/main/img",
            src: "**",
            dest: "dist/contao/img"
          }
        ]
      }
    },

    watch: {
      skin: {
        files: ["src/main/less/**/*"],
        tasks: ["less", "copy"],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.task.loadTasks("../../../node_modules/@ephox/bolt/tasks");
  grunt.task.loadTasks("../../../node_modules/grunt-contrib-copy/tasks");
  grunt.task.loadTasks("../../../node_modules/grunt-contrib-uglify/tasks");
  grunt.task.loadTasks("../../../node_modules/grunt-contrib-less/tasks");
  grunt.task.loadTasks("../../../node_modules/grunt-contrib-watch/tasks");

  grunt.registerTask("default", ["less", "copy"]);
};