module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {

            },
            dist: {
                src: ['public/main.js','public/service/service.js','public/directive/directive.js','public/controller/controller.js'],
                dest: 'public/dist/main.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/dist/main.min.js': ['public/dist/main.js']
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("main",["concat","uglify"])
}