/**
 * Created by juno on 2014-10-21.
 */
var blackAndWhite = angular.module("blackAndWhite",[]);

blackAndWhite.controller("container",function($scope){
    $scope.init = function(){
        $scope.A = 99;
        $scope.B = 99;
    }
    $scope.blackAndWhite_box = function(minous_score){
        if(minous_score > 9){
            console.log('black')
        }else{
            console.log('white')
        }
    }
})