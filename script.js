window.onload = function() {


//document.getElementsByClassName("choose-player")[i].onclick = function() {
//    choose_player();
//}

document.getElementById("start-button").onclick = function() {
         start_game();
};


// CANVAS variables
var c=document.getElementById('canvas');
var ctx=c.getContext('2d');

//function choose_player(i){    
//    return document.getElementsByClassName("choose-player")[i];
//    };

function start_game(){    
    document.getElementsByClassName("choose-player")[0].style.display="none";
    //document.getElementsByClassName("choose-player")[1].style.display="none";
    document.getElementById("start-button").style.display="none";
    ctx.font = "50px Arial";
    ctx.fillStyle='orange';
    ctx.fillRect(0,0,800,400);
};


};