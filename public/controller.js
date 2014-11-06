		blackAndWhite.controller("makeRoom",function($scope,socket){
            $scope.spinner = false;
            $scope.makeRoomBtn = true;
            $scope.roomMsg = "";
            $scope.rivalBetting = null;
            $scope.winScore = 0;

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

            socket.on("join_room",function(room_name){
                $scope.spinner = false;
                $scope.makeRoomBtn = false;

                if($scope.roomMsg === "상대를 기다리고 있습니다."){
                    $scope.roomMsg = "상대방이 입장하셨습니다. 게임을 시작합니다.";
                }else{
                    $scope.roomMsg = "입장하셨습니다. 게임을 시작합니다.";
                }
                $scope.$digest();

                setTimeout(function(){
                    $scope.roomMsg = "";
                    $("#room_modal").css("width","100%").css("height","100%").css("margin-top",0);
                    $scope.gameui = true;
                    $scope.init();
                    $scope.$digest();
                    socket.emit("gameStart",room_name);
                },2000);
            })

            socket.on("isTurn",function(first){
                console.log("내턴!");
                $scope.myTurn = true;
                if(first === 1){
                    $scope.msg = "첫번째 순서 입니다. 배팅해주세요."
                }
                $scope.$digest();
            })

            socket.on("noTurn",function(first){
                console.log("내턴 아니다!");
                $scope.myTurn = false;
                if(first === 1){

                    $scope.msg = "상대방의 배팅을 기다리고 있습니다."
                }
                $scope.$digest();
            })

            socket.on("getBetting",function(data){
                console.log(data);
                $scope.rivalBetting = data;
                $scope.blackAndWhite_box(data);
            })

            socket.on("meWin",function(){
                $scope.msg = "승리하셨습니다. 상대방의 순서입니다.";
                $scope.winScore++;
                $scope.$digest();
            });

            socket.on("meLose",function(){
                $scope.msg = "패배하셨습니다. 먼저 배팅해주세요.";
                $scope.$digest();
            });

            $scope.betting = function(){
                if($scope.myTurn){
                    if($scope.bettingScore > $scope.score){
                        alert("가지고 있는 점수보다 배팅점수가 큽니다.");
                        return false;
                    }else{
                        $scope.score = $scope.score - $scope.bettingScore
                    }

                    if($scope.rivalBetting !== null){
                        console.log("내점수 : " + $scope.bettingScore)
                        console.log("상대점수 : " + $scope.rivalBetting)
                        if($scope.bettingScore * 1 > $scope.rivalBetting * 1){
                            if($scope.myScore === 5){
                                alert("승리하셨습니다.");
                                return ;
                            }
                            socket.emit("meWin");
                        }else{
                            socket.emit("meLose")
                        }
                        $scope.rivalBetting = null;
                        $scope.bettingScore = null;
                    }else{
                        $scope.msg = "배팅하였습니다. 상대방이 맞배팅 할때까지 기다려주세요.";
                        socket.emit("betting",{
                            bettingScore : $scope.bettingScore
                        })
                    }
                }else{
                    alert("저의 턴이 아니에요 ㅠ 기다려주세용!");
                    return false;
                }
            }

            $scope.init = function(){
               $scope.score = 99;
            }

            $scope.blackAndWhite_box = function(score){
                    //minous_score = $scope.bettingScore.replace(/[^0-9]/g, "");
                var color = "";
                if(score <= 9){
                        $scope.box_black = true;
                        color = "검은색";
                    }else{
                        $scope.box_black = false;
                        color = "흰색";
                    }

                $scope.msg = "상대방이 배팅했습니다. 상대방의 색은 " +color + "입니다.";
                $scope.$digest();
            }


            /*
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
                        alert("A승");
                        $scope.A.win += 1;

                        if($scope.A.win === 5){
                            alert("A 승리!!");
                        }
                    }else if($scope.A.batting_score < $scope.B.batting_score){
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
            */
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

        blackAndWhite.controller("gameCore",function($scope){
        })