//////////////GLOBAL VARIABLES////////////////////////////
var canvas = document.getElementById('canvas');
var ctx;
if (canvas.getContext) {
	ctx = canvas.getContext('2d');
};

// var img = document.createElement('IMG');
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

	/////////////////////DICTIONARY OF COORDINATES/////////////
var alphabet = [
				{letter:"A", x:canvas.width-50,    y:50},
				{letter:"B", x:canvas.width/2+225, y:250},
				{letter:"C", x:canvas.width/2+275, y:350},
				{letter:"D", x:canvas.width/2-150, y:150},
				{letter:"E", x:50, y:50},
				{letter:"F", x:canvas.width/2-125, y:250},
				{letter:"G", x:canvas.width/2, y:350},
				{letter:"H", x:canvas.width/2+100, y:canvas.height-150},
				{letter:"I", x:canvas.width/2, y:50},
				{letter:"J", x:canvas.width/2-250, y:150},
				{letter:"K", x:canvas.width/2+25, y:250},
				{letter:"L", x:canvas.width/2+150, y:150},
				{letter:"M", x:canvas.width/2+350, y:150},
				{letter:"N", x:canvas.width/2-25, y:250},
				{letter:"O", x:canvas.width/2-275, y:350},
				{letter:"P", x:canvas.width/2+75, y:350},
				{letter:"Q", x:canvas.width/2-75, y:350},
				{letter:"R", x:canvas.width/2-225, y:250},
				{letter:"S", x:canvas.width/2+125,y:250},
				{letter:"T", x:canvas.width/2, y:canvas.height-50},
				{letter:"U", x:canvas.width/2-100, y: canvas.height-150},
				{letter:"V", x:canvas.width/2+250, y:150},
				{letter:"W", x:canvas.width/2-50, y:150},
				{letter:"X", x:canvas.width/2,y:canvas.height-150},
				{letter:"Y", x:canvas.width/2-350, y:150},
				{letter:"Z", x:canvas.width/2+50, y:150}
				];

var lettersForShape;
var nameField = document.getElementById("name");
var submitButton = document.getElementById("submitName");
var coordinate = [], orderedCoordinates = [], picturesSave = [];
////////////////////////

// //////////GET NAME//////////////////
submitButton.addEventListener("click", function(e) {
	e.preventDefault();
	getName();
});

function getName(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	grid();
	coordinate = [];
	orderedCoordinates = [];
	var name = nameField.value.toUpperCase();
	name = name.replace(/\s+/g, '');

	lettersForShape = splitName(name);
	
	loopLetterforShape(lettersForShape);
};

function splitName(name) {
	var nameSplit = name.split("");
	return nameSplit.slice(0, 6);
};

function loopLetterforShape( arrName ){

	 arrName.forEach( function(letter){
	 	testLetter(letter);
	 });
	 // draw();//letter as typed-red line
	 orderedCoordinates = hull(coordinate, 90);

	 drawOrdered();//letters ordered for outerlines
}

function testLetter( letter ){

	 alphabet.forEach( function(obj){

	 	if( letter.toUpperCase() === obj.letter.toUpperCase() ){
	 		createCoordinate( obj)
	 	}
	 });
};

function createCoordinate( obj){

	var tmpCoord = [obj.x, obj.y];
	coordinate.push(tmpCoord);

};


function grid() {

	///////////////GRID////////////////////////
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		ctx.strokeStyle = "red";
		ctx.font = "24px sans-serif";

		for ( var i=0, thisLength = alphabet.length; i< thisLength; i++){
			ctx.fillText("."+alphabet[i].letter, alphabet[i].x, alphabet[i].y);	
		}
	}
	
};

function draw(){

	
	ctx.beginPath();
	ctx.moveTo(coordinate[0][0], coordinate[0][1]);// coordinate[0].x, coordinate[0].y

	for( var i = 1, coordLength = coordinate.length; i < coordLength; i++ ){
		ctx.lineTo(coordinate[i][0], coordinate[i][1]);
	}
	ctx.lineTo(coordinate[0][0], coordinate[0][1]);

	ctx.closePath();
	ctx.stroke();
}

function drawOrdered(){
	ctx.save();

	ctx.strokeStyle = "blue";
	ctx.beginPath();
	ctx.moveTo(orderedCoordinates[0][0], orderedCoordinates[0][1]);


	for( var i = 0, coordLength = orderedCoordinates.length; i < coordLength; i++ ){
		ctx.lineTo(orderedCoordinates[i][0], orderedCoordinates[i][1]);
	}
	ctx.lineTo(orderedCoordinates[0][0], orderedCoordinates[0][1]);

	ctx.closePath();
	ctx.stroke();

}

grid();

////////////////////////IMAGE LOADER////////////
function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            ctx.clip(); ///CREATE CLIPPING MASK
            ctx.drawImage(img,0,0);///INSERT IMAGE
        	ctx.restore(); 
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);  
    picturesSave.push( convertCanvasToImage( canvas ) )
}

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}

 
