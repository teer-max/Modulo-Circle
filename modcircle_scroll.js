const MAXH = 800;
const MAXW = 1000;
var mod = 82;
var mult = 40;
var cir = {
  x: MAXW*0.36,
  y: MAXH*0.5,
  rad: Math.min(MAXW,MAXH)*0.45,
};

function setup(){
	createCanvas(MAXW,MAXH);
}

function draw(){
	console.log('h',document.body.scrollHeight);
	console.log('t',document.body.scrollTop);
	drawLines();
	mult = 40 + (document.body.scrollTop/document.body.scrollHeight)*3;
}

function drawLines() {
	background(180);
	fill(0);
	ellipse(cir.x,cir.y,2*cir.rad,2*cir.rad);
	push();
	translate(cir.x,cir.y);
	// var nums = [];
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
		
		h = parseInt(map(i,1,mod,0,360));
		col = "hsl(" + h + ",100%,60%)";
		fill(col);
		ellipse(x1,y1,6,6);
		if (mod < 100) {
			strokeWeight(2);
		}
		stroke(col);
		line(x1,y1,x2,y2);
		// attempt to make a color wheel thing...
		
		//console.log(nums[i][0],nums[i][1]);
	}
}