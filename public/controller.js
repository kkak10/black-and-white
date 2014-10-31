		blackAndWhite.controller("makeRoom",function($scope,socket){
            $scope.spinner = false;
            $scope.makeRoomBtn = true;
            $scope.roomMsg = "";
			$scope.makeRoom = function(){
				socket.emit("makeRoom","");
				//console.log(window.socket)
                $scope.spinner = true;
                $scope.makeRoomBtn = false;
			};

            socket.on("makeRoom",function(roomInfo){
                console.log(roomInfo.roomNum);
                $scope.roomMsg =  "상대를 기다리고 있습니다.";
                $scope.$digest();
            })

            socket.on("join_room",function(room_uesr_list){
                $scope.spinner = false;
                $scope.makeRoomBtn = false;

                console.log(room_uesr_list)
                if($scope.roomMsg === "상대를 기다리고 있습니다."){
                    $scope.roomMsg = "상대방이 입장하셨습니다. 게임을 시작합니다.";
                }else{
                    $scope.roomMsg = "입장하셨습니다. 게임을 시작합니다.";
                }
                $scope.$digest();

                setTimeout(function(){
                    $scope.roomMsg = "";
                    $("#room_modal").css("width","100%").css("height","100%").css("margin-top",0);
                    $scope.$digest();
                    socket.emit("gameStart",[]);
                },2000);
            })
		})

        blackAndWhite.controller("roomList",function($scope,socket){
            $scope.roomList = [];

            socket.on("room_update",function(data){
                for(room_name in data){
                    if(room_name.indexOf("room_") > -1 && $scope.roomList.indexOf(room_name) === -1){
                        $scope.roomList.push(room_name)
                    }
                }
                $scope.$digest();
            })

            socket.on("roomListUpdate",function(roomList){
                console.log("roomList")
                console.log(roomList);
                var eachIndex = 0;
                console.log(angular)
                $.each(roomList,function(key,value){
                    if(eachIndex === 0){
                        eachIndex++;
                    }else{
                        //$("#rooms_list").append("<room></room>")
                        angular.element(document.getElementById('rooms_list')).append("<room></room>");
                    }
                })
            })

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