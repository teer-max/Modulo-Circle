var MAXW = 1200;
var MAXH = 1600;
var mod = 120;
var mult = 60;
var inc  = 0.002;

var play;
var reverse;
var playButton;
var cnv;
var prt;

/*
Much of the commented out code is related to
the use of the sliders, buttons and input DOM
elements.

The main tool used, besides the logic behind the
animation, is the linking of the DOM element,
scrollHeight, with the animation. There are many
ways to use the elements to add interactivity.

I intend to work on the formatting so the
background is formatted more aestheically.
*/



function setup() {

	MAXW = windowWidth;
	MAXH = windowHeight;

	cnv = createCanvas(MAXW,1600);
	prt = cnv.parent('sketch-holder');
	/*
    modIn = createInput(mod+ "");
	modIn.changed(updateModIn);
	multIn = createInput(mult + "");
	multIn.changed(updateMultIn);
	modSlider = createSlider(1,500,mod);
	modSlider.input(updateModSl);
	multSlider = createSlider(1,mod,mult,0.001);
	multSlider.input(updateMultSl);
	playButton = createButton("Go!");
    playButton.mouseClicked(go);

	modIn.parent("sketch-holder");
	multIn.parent("sketch-holder");
	modSlider.parent("sketch-holder");
	multSlider.parent("sketch-holder");
	playButton.parent("sketch-holder");
	modIn.position(MAXW*0.78, MAXH*0.19);
	multIn.position(MAXW*0.78,MAXH*0.35);
	modSlider.position(MAXW*0.78,MAXH*0.25);
	multSlider.position(MAXW*0.78,MAXH*0.4);
	playButton.position(MAXW*0.8,MAXH*0.5);
	modIn.style('width: 50px');
	multIn.style('width:50px');
	modSlider.style("width: 150px");
	multSlider.style("width: 150px");

	//testpb();
	var buttons= document.getElementsByTagName("button");
	var inputs = document.getElementsByTagName("input");
	var cont = document.getElementById('sketch-holder');
	cont.style.position = 'absolute';

	for(let i=0; i < buttons.length;i++)
	{
		buttons[i].style.position = 'absolute';
	}
	for(let i=0; i < inputs.length;i++)
	{
		inputs[i].style.position = 'absolute';
	}
	*/
    drawLines();
}

/*
function updateModSl() {
	mod = modSlider.value();
	multSlider.elt.max = mod;
	modIn.elt.value = mod.toString();
	drawLines();
}
function updateMultSl() {
	mult = multSlider.value();
	multIn.elt.value = mult.toString();
	drawLines();
}
function updateModIn(){
	mod = parseFloat(modIn.elt.value);
	modSlider.elt.value = mod;
	multSlider.elt.max=mod;
	drawLines();
}
function updateMultIn(){
	mult = parseFloat(multIn.elt.value);
	multSlider.elt.value = mult;
	drawLines();
}
*/
function windowResized() {
	MAXW = min(windowWidth,1200);
	MAXH = max(windowHeight,800);
	/*
	modIn.position(MAXW*0.77, MAXH*0.19);
	multIn.position(MAXW*0.77,MAXH*0.35);
	modSlider.position(MAXW*0.77,MAXH*0.25);
	multSlider.position(MAXW*0.77,MAXH*0.4);
	playButton.position(MAXW*0.8,MAXH*0.5);
	*/
	drawLines();
}

function drawLines() {
	var cir = {
		x: MAXW*0.5,
		y: MAXH*0.5,
		rad: 1.1*MAXH,
	};

	// background(0,150,120);
	fill(0);
	ellipse(cir.x,cir.y,2*cir.rad,2*cir.rad);
	push();
	translate(cir.x,cir.y);
	var str_positions;
	for (let i =0; i <= mod; i++){
		j = (i*mult) % mod;
		let conversion = (2*Math.PI/mod);
		let x1 = cir.rad*Math.cos(i*conversion - (Math.PI/2));
		let y1 = cir.rad*Math.sin(i*conversion - (Math.PI/2));
		let x2 = cir.rad*Math.cos(j*conversion - (Math.PI/2));
		let y2 = cir.rad*Math.sin(j*conversion - (Math.PI/2));
		// Draw number strings at edges of circle
		// if (mod < 100){
		// 	stroke(0);
		// 	fill(255);
		// 	num_string = text(str(i),x1*1.05-5,y1*1.05+5);
		// }

		//define color map, draw ellipses and lines.
		h = parseInt(map(i,1,mod,0,360));
		col = "hsl(" + h + ",100%,50%)";
		fill(col);
		ellipse(x1,y1,6,6);
		// if (mod < 75) {
			strokeWeight(1.5);
		// }
		stroke(col);
		line(x1,y1,x2,y2);
	}
	pop();

	window.onscroll = function(){scroll()};
	/*
	push();
	fill(255);
	strokeWeight(2);
	stroke(0);
	textSize(18);
	modtext = text("Modulus (remainder)",MAXW*0.77, MAXH*0.15, MAXW*0.95, MAXH*0.5);
	multtext = text("Multiplier (defines map)", MAXW*0.77, MAXH*0.3,MAXW*0.95,MAXH*0.35);
	pop();
	*/
}
var lastScrollHeight = 0;
function scroll() {
	sh = prt.scrollHeight;
	if (sh < lastScrollHeight) {
		mult += 0.001;
	}
	else {
		mult -= 0.001;
	}
	lastScrollHeight = sh;
	drawLines();
}
function increment() {
	if (mult != mod){
	mult += inc;
	// multSlider.elt.value = parseFloat(mult.toFixed(2));
	// multIn.elt.value = parseFloat(mult.toFixed(2)).toString();
	drawLines();
	}
}
function decrement() {
	if (int(mult) != 0) {
	mult -= inc;
	// multSlider.elt.value = parseFloat(mult.toFixed(2));
	// multIn.elt.value = parseFloat(mult.toFixed(2)).toString();
	drawLines();
	}
}
//
// function go() {
// 	playButton.elt.innerHTML = 'stop';
// 	playButton.mouseClicked(stop);
// 	console.log(playButton.value.toString());
// 	play = setInterval(function() {
// 		if (mod - mult < 0.001){
// 			clearInterval(play);
// 			reverse = setInterval(function() {
// 				decrement();
// 				if (mult.toFixed(0) == 0){
// 				clearInterval(reverse);
// 				}
// 			},1);
// 		}
// 		increment();
// 	},1);
// }
//
// function stop() {
// 	clearInterval(play);
// 	clearInterval(reverse);
// 	playButton.elt.innerHTML = 'go';
// 	playButton.mouseClicked(go);
// 	//testpb();
//
// }
