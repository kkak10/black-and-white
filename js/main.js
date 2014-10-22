/**
 * Created by juno on 2014-10-21.
 */

var blackAndWhite = angular.module("blackAndWhite",[]);

blackAndWhite.directive('gameui',function(){
    return {
        restrict : "E",
        link:function(scope,el,attr){

        },
        templateUrl:"directive/user.html"
    }
})

blackAndWhite.controller("container",function($scope){
    $scope.init = function(){
        $scope.A = {
            score : 99,
            box_black : false,
            batting : false,
            batting_score : 0,
            win : 0
        }

        $scope.B = {
            score : 99,
            box_black : false,
            batting : false,
            batting_score : 0,
            win : 0
        }
    }

    $scope.blackAndWhite_box = function(minous_score,el){
       if(el === "A"){
           minous_score = minous_score.replace(/[^0-9]/g, "");
           $scope.A_minus = minous_score;

           if(minous_score > 9){
               $scope.A.box_black = true;
           }else{
               $scope.A.box_black = false;
           }

           console.log($scope.A.box_black)
       }else{
           minous_score = minous_score.replace(/[^0-9]/g, "");
           $scope.B_minus = minous_score;

           if(minous_score > 9){
               $scope.B.box_black = true;
           }else{
               $scope.B.box_black = false;
           }

           console.log($scope.B.box_black)
       }
    }

    $scope.betting = function(user,minuse){
        if(minuse === null || minuse === undefined || minuse === ""){
            alert("배팅할 점수를 입력해주세요");
            return false;
        }

        if(!(user.score - minuse >= 0)){
            alert("점수가 부족합니다.");
            return false;
        }

        user.score -= minuse;
        user.batting_score = minuse;
        user.batting = true;

        if($scope.A.batting && $scope.B.batting){
            if($scope.A.batting_score > $scope.B.batting_score){
                console.log("A 배팅스코어 : " + $scope.A.batting_score)
                console.log("B 배팅스코어 : " + $scope.B.batting_score)
                alert("A승");
                $scope.A.win += 1;

                if($scope.A.win === 5){
                    alert("A 승리!!");
                }
            }else if($scope.A.batting_score < $scope.B.batting_score){
                console.log("A 배팅스코어 : " + $scope.A.batting_score)
                console.log("B 배팅스코어 : " + $scope.B.batting_score)
                alert("B승")
                $scope.B.win += 1;

                if($scope.A.win === 5){
                    alert("B 승리!!");
                }
            }else{
                alert("무승부")
            }

            $scope.A.batting = false;
            $scope.B.batting = false;
        }

    }
})