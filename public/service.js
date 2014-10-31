blackAndWhite.factory("socket",function(){
    var socket =  io.connect("http://localhost:3000");	//소켓 객체를 가져옴
    return socket;
})