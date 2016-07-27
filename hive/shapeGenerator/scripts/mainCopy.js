

/////////////////////DICTIONARY OF COORDINATES/////////////
	var canvas = document.getElementById('canvas');
	var alphabet = {A:{letter:"A",
							x:canvas.width-50,
							y: 50,},
					B:{letter:"B",
						x:canvas.width/2+225,
						y: 250,},
					};

	
	// console.log(alphabet[key]);
	var A = {letter:"A", x:canvas.width-50, y:50};
	var B = {letter:"B", x:canvas.width/2+225, y:250};
	var C = {x:canvas.width/2+275, y:350};
	var D = {x:canvas.width/2-150, y:150};
	var E = {x:50, y:50};
	var F = {x:canvas.width/2-125, y:250};
	var G = {x:canvas.width/2, y:350};
	var H = {x:canvas.width/2+100, y:canvas.height-150};
	var I = {x:canvas.width/2, y:50};
	var J= {x:canvas.width/2-250, y:150};
	var K= {x:canvas.width/2+25, y:250};
	var L= {x:canvas.width/2+150, y:150};
	var M= {x:canvas.width/2+350, y:150};
	var N= {x:canvas.width/2-25, y:250};
	var O= {x:canvas.width/2-275, y:350};
	var P= {x:canvas.width/2+75, y:350};
	var Q= {x:canvas.width/2-75, y:350};
	var R= {x:canvas.width/2-225, y:250};
	var S= {x:canvas.width/2+125,y:250};
	var T= {x:canvas.width/2,y:canvas.height-50};
	var U= {x:canvas.width/2-100,y: canvas.height-150};
	var V= {x:canvas.width/2+250,y:150};
	var W= {x:canvas.width/2-50,y:150};
	var X= {x:canvas.width/2,y:canvas.height-150};
	var Y= {x:canvas.width/2-350,y:150};
	var Z= {x:canvas.width/2+50,y:150};
	Object.keys(alphabet).forEach( function (key) { 
		// var tempLetter= alphabet[key];
		console.log(alphabet[key]); 
	} );
function draw() {	

///////////////GRID////////////////////////
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
     ctx.font = "24px sans-serif";
// 	// =========1st line=============
// 	     ctx.fillText(".E",E.x, E.y);
	     ctx.fillText(".A", alphabet.A.x, alphabet.A.y);
// 	     ctx.fillText(".I", I.x, I.y);
// 	// ==============
// 	// =========2nd line=============
// 	     ctx.fillText(".W", W.x, W.y);
// 	     ctx.fillText(".D", D.x, D.y);
// 	     ctx.fillText(".J", J.x, J.y);
// 	     ctx.fillText(".Y", Y.x, Y.y);
// 	     ctx.fillText(".Z", Z.x, Z.y);
// 	     ctx.fillText(".L", L.x, L.y);
// 	     ctx.fillText(".V", V.x, V.y);
// 	     ctx.fillText(".M", M.x, M.y);
// 	// ==================
// 	// =========3rd line=============
// 		ctx.fillText(".N", N.x, N.y);
// 		ctx.fillText(".F", F.x, F.y);
// 		ctx.fillText(".R", R.x, R.y);
// 		ctx.fillText(".K", K.x, K.y);
// 		ctx.fillText(".S", S.x, S.y);
		ctx.fillText(".B", alphabet.B.x, alphabet.B.y);

// 	// ====================
// 	// =========4th line=============
// 		ctx.fillText(".G", G.x, G.y);
// 		ctx.fillText(".Q", Q.x, Q.y);
// 		ctx.fillText(".O", O.x, O.y);
// 		ctx.fillText(".P", P.x, P.y);
// 		ctx.fillText(".C", C.x, C.y);
// 		// ctx.fillText(".N", canvas.width/2+275, 350);
// 	// ====================
// 	// =========5th line=============
// 		ctx.fillText(".U", U.x, U.y);
// 		ctx.fillText(".X", X.x, X.y);
// 		ctx.fillText(".H", H.x, H.y);
// 	// ====================
// 	// =========6th line=============
// 	     ctx.fillText(".T", T.x, T.y);
// 	// ====================
	  }
// //////////GET NAME//////////////////

	// var getName = document.getElementById("typeName");
	var lettersForShape;
	document.getElementById("submitName").addEventListener("click", function(e){
		e.preventDefault();
		// getName.submit();
		var name = document.getElementById("name").value.toUpperCase();
		name = name.replace(/\s+/g, '');
		
		lettersForShape = splitName( name );

		////////////////////Looping through letterForShape////////
		// for (var i=0,  tot=lettersForShape.length; i < tot; i++) {

 	// 		  if (lettersForShape[i] == tempLetter){
 	// 		  		console.log("it works!");
 	// 		  }; 
		// };
	
		// if (lettersForShape[] == A.letter){
		// 	ctx.strokeStyle = "red";
		// 	var shapeTest= new Path2D();
		// 	shapeTest.moveTo(A.x, A.y);
		// 	shapeTest.lineTo(B.x,B.y);
		// 	ctx.stroke(shapeTest);
			

		// } else {
		// 	console.log("FALSE");
		// };
		// for (var i = 0; alphabet[i].letter = lettersForShape[i]; i++) {
		// 	console.log("it works!");
		// };
	});

	
};

function splitName( name ){
		var nameSplit= name.split("");
		return nameSplit.slice(0,6);
}
console.log(lettersForShape);
// ////////////////////FUNCIONS CALL////////////////////

draw();

