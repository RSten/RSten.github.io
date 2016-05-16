$(document).ready(function(){
	$("#box").hide();
    $("#show").click(function(){
        $("#box").fadeIn();
        $("#frame").fadeOut();

    });
    $("#hide").click(function(){
        $("#box").fadeOut();
        $("#frame").fadeIn();
    });
});

$("#left").click(function(){
    console.log("noob");
});

function goLeft(){
	var value = -1;
	iFramURL(value);
}

function goRight(){
	var value = 1;
	iFramURL(value);
}

function iFramURL(value){
	var x = value;
	var y = globalValue;
	//console.log(x);
	//console.log(y);
	window.globalValue = x + y;
	if (globalValue > iFrames){
		window.globalValue = 0;
	}
	if (globalValue < 0){
		window.globalValue = iFrames;
	}
	window.iFramURLReal = data[globalValue];
	document.getElementById("iFRAME").src = data[globalValue];
}



