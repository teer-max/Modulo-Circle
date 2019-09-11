const MAXW = 800;
const MAXH = 600;
var mod = 60;
var mult = 29;
var inc  = 0.002;
var cir = {
  x: MAXW*0.36,
  y: MAXH*0.5,
  rad: Math.min(MAXW,MAXH)*0.45,
};
var play;
var reverse;
var playButton;

function setup() { 
	createCanvas(MAXW,MAXH);
	modIn = createInput(mod+ '');
	modIn.position(MAXW*0.75,MAXH*0.2);
	modIn.changed(updateModIn);
	multIn = createInput(mult + '');
	multIn.position(MAXW*0.75,MAXH*0.3);
	multIn.changed(updateMultIn);
	modSlider = createSlider(1,500,mod);
	modSlider.position(MAXW*0.75,MAXH*0.25);
	modSlider.input(updateModSl);
	multSlider = createSlider(1,mod,mult,0.001);
	multSlider.input(updateMultSl);
	multSlider.position(MAXW*0.75,MAXH*0.35);
	playButton = createButton('Go!');
    playButton.mouseClicked(go);
	playButton.position(MAXW*0.75,MAXH*0.4);
	//stopButton = createButton('stop');
	//stopButton.mouseClicked(stop);
	//stopButton.position(MAXW*0.8,MAXH*0.4);
	//testpb();
	
  drawLines();
}
/*
function testpb() {
	console.log('playButton: ',playButton);
	console.log('playButton.value: ', playButton.value);
	console.log('playButton.value(): ',playButton.value());
	console.log('playButton.label: ', playButton.label);
	console.log('playButton.html(): ', playButton.html());
}
*/

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
	drawLines();
}
function updateMultIn(){
	mult = parseFloat(multIn.elt.value);
	multSlider.elt.value = mult;
	drawLines();
}


/*
function updateMod() {
	if (mod != modSlider.elt.value) {
		mod = parseInt(modSlider.elt.value);
		modIn.elt.value = mod.toString();
		multSlider.elt.max = mod;
		console.log('updated mod to modslider val');
		drawLines();
	}
	if (mod.toString() != modIn.value()) {
		mod = parseInt(modIn.value);
		modSlider.elt.value = mod;
		multSlider.elt.max = mod;
		console.log('updated mod to modin val');
		//drawLines();
	}
}
function updateMult() {
	if (mult != multSlider.value()) {
		mult = multSlider.value();
		multIn.elt.value = mult.toString();
		console.log('updated mult to multslider val');
		console.log(multIn.value());
}
	if (mult.toString() != multIn.elt.value){
		mult = parseFloat(multIn.elt.value);
		multSlider.elt.value = mult;
		console.log('updated mult to multin val');
	}
	drawLines();
}
*/

function drawLines() {
	background(180);
	fill(0);
	ellipse(cir.x,cir.y,2*cir.rad,2*cir.rad);
	push();
	translate(cir.x,cir.y);
	var nums = [];
	for (let i =0; i <= mod; i++){
		/*
		j = (-0.5*Math.PI)-(i*(6.183/mod));
		hundredsMod = (mult*Math.pow(10,2)) % (mod*Math.pow(10,2));
		console.log(mult + ' ' + Math.pow(10,2)) +'%' + (mod*Math.pow(10,2))
		k = i*hundredsMod / Math.pow(10,2);
		*/
		j = (i*mult) % mod;
		let conversion = (2*Math.PI/mod);
		let x1 = cir.rad*Math.cos(i*conversion - (Math.PI/2));
		let y1 = cir.rad*Math.sin(i*conversion - (Math.PI/2));
		let x2 = cir.rad*Math.cos(j*conversion - (Math.PI/2));
		let y2 = cir.rad*Math.sin(j*conversion - (Math.PI/2));
		
		stroke(0);
		fill(255);
		num_string = text(str(i),x1*1.1,y1*1.1);
		
		
		h = parseInt(map(i,1,mod,0,360));
		col = "hsl(" + h + ",100%,60%)";
		fill(col);
		ellipse(x1,y1,6,6);
		if (mod < 75) {
			strokeWeight(2);
		}
		stroke(col);
		line(x1,y1,x2,y2);
		// attempt to make a color wheel thing...
		
		//console.log(nums[i][0],nums[i][1]);
	}
	
	pop();
	//console.log('Drawn lines');
	//updateMod();
	//console.log('updatedMod ran in drawLines fn');
	//updateMult();
	//console.log('updateMult ran in drawLines');
}


function increment() {
	if (mult != mod){
	mult += inc;
	multSlider.elt.value = parseFloat(mult.toFixed(2));
	multIn.elt.value = parseFloat(mult.toFixed(2)).toString();
	drawLines();
	//console.log(mult);
	}
}
function decrement() {
	if (int(mult) != 0) {
	mult -= inc;
	multSlider.elt.value = parseFloat(mult.toFixed(2));
	multIn.elt.value = parseFloat(mult.toFixed(2)).toString();
	drawLines();
	}
}

function go() {
	playButton.elt.innerHTML = 'stop';
	playButton.mouseClicked(stop);
	console.log(playButton.value.toString());
	play = setInterval(function() {
		if (mod - mult < 0.001){
			clearInterval(play);
			reverse = setInterval(function() {
				decrement();
				if (mult.toFixed(0) == 0){
				clearInterval(reverse);
				}
			},1);
		}
		increment();
	},1);
}

function stop() {
	clearInterval(play);
	clearInterval(reverse);
	playButton.elt.innerHTML = 'go';
	playButton.mouseClicked(go);
	//testpb();
	
}


function draw() { 
  //background(220);
  //fill(255,255,0);
  //ellipse(cir.x,cir.y,2*cir.rad,2*cir.rad);
}
