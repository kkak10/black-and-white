		blackAndWhite.directive('gameui',function(){
		            return {
		                restrict : "E",
		                link:function(scope,el,attr){

		                },
		                templateUrl:"/directive/user.html"
		            }
		        });

        blackAndWhite.directive("makeroombtn",function(){
            return {
                restrict:'E',
                link:function(scope,el,attr){

                },
                templateUrl: "/directive/makeroombtn.html"
            }
        });

		blackAndWhite.directive("room",function(){
			return {
				restrict:'E',
		        link:function(scope,el,attr,ctrl){

                    scope.join_room =  function(){
                        console.log("입장하는 방의 이름은" + attr.room);
                        socket.emit("join_room",attr.room);
                    }
		        },
				templateUrl: "/directive/room.html"
			}
		});

		blackAndWhite.directive("roomModal",function(){
			return {
				restrict:'E',
		        link:function(scope,el,attr){

		        },
				templateUrl: "/directive/full_modal.html"
			}
		});