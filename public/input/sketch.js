// import * as Tone from "tone";
// const Tone = require("tone")

// get permission for user touch functions
if (typeof DeviceOrientationEvent.requestPermission === 'function') {
  document.body.addEventListener('click', function () {
    DeviceOrientationEvent.requestPermission();
    DeviceMotionEvent.requestPermission();
		// Tone.setContext(audioContext);
  })
}

// Open and connect input socket
// let socket = io('/input');
// socket.on('connect', () => {
// 	console.log('Connected');
// });

// establishing some globals
let breathArray = [];
let breath = 0;

let breathMax = 0;
let breathMin = 0;
let mappedBreath = 0;

let gameState = 0;
let changeState = 0;
let timer = 0;
let stateBg = ["#ffb0ed","#f7b081","#8affb5"]

let synth;

const getSum = (accumulator, currentValue) => accumulator + currentValue;

// StartAudioContext(Tone.context, '#button').then(function(){
// 	synth = new Tone.PolySynth({
//     "oscillator" : {
// 	  "type" : "sine"
//     },
//     "envelope" : {
//  	  "attack" : 0.1
//     }
//   }).toMaster();
//
// 	synth.triggerAttack(["C3","A2","G3"]);
// })

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function touchEnded(){
	// managing state
  // if (gameState == 0){
  //   setBreathMax()
  //   // gameState+=1
	// 	timer = 120;
	// 	changeState = 1;
	//
  // } else if (gameState== 1){
  //   setBreathMin()
  //   gameState+=1
  // }
	timer = 120;
	changeState = 1;
}

function setBreathMax(){
  breathMax = breath;
}

function setBreathMin(){
  breathMin = breath;
}

function draw() {
  background(stateBg[gameState]);

	if (timer > 0){
		timer -= 1
	} else if (timer == 0 && changeState = 1 && gameState == 0){
		changeState = 0;
		setBreathMax();
	} else if (timer == 0 && changeState = 1 && gameState == 1){
		changeState = 0;
		setBreathMin()
	}


	// averaging breath data every frame
  if (breathArray.length > 30){
    breathArray.shift()
  }
  breathArray.push(rotationX)
  let summedBreath = breathArray.reduce(getSum)
  breath = summedBreath/breathArray.length

	// once state is all set, start showing data
  if (gameState == 2){
    mappedBreath = map(breath, breathMin,breathMax, 0, 100)
  }
  // synth.set("detune", mappedBreath);

	// socket.emit("breath",mappedBreath);

  textSize(40)
  text(breath.toFixed(2), 20, 60)

  strokeWeight(20)
  ellipse(windowWidth/2,((windowHeight/2)+50)-mappedBreath,250)
}
