

let leftUserId;
let rightUserId;

let localUserList;

let usersSet = false

let synth;

let breathVolume = -30 ;

// Open and connect output socket
let socket = io('/output');
socket.on('connect', () => {
	console.log('Connected');
});
socket.on('breath', (message) => {
	// console.log(message);
  if (usersSet == true) {
    localUserList[message.id] = message.data
  }
  // console.log(localUserList)
});
socket.on('userList', (message) => {
	// console.log(Object.keys(message));
  if (Object.keys(message).length == 2){
    leftUserId = Object.keys(message)[0]
    rightUserId =  Object.keys(message)[1]
    console.log("Two users!")
    localUserList = message
    console.log(localUserList)
    usersSet = true;
    synth.triggerAttack(["C2","A2","G3","E2"])
  } else {
    console.log("# of users: " + Object.keys(message).length)
    usersSet = false;
    synth.triggerRelease()
  }
});



function setup() {
	createCanvas(windowWidth, windowHeight);

  synth = new Tone.PolySynth({
    "oscillator" : {
	  "type" : "sine"
    },
    "envelope" : {
 	  "attack" : 0.5
    }
  }).toMaster();

  synth.volume.value = breathVolume;

}

function mousePressed(){
  Tone.context.resume()
  console.log("Audio Context Resumed")
}

function draw(){
  strokeWeight(0)

  fill("#D6B5FF")
  rect(0,0,windowWidth/2, windowHeight)
  fill("#E9FFB5")
  rect(windowWidth/2, 0, windowWidth/2, windowHeight)

  fill(255)

  if (usersSet ==true){
    // rect(0,windowHeight-25,windowWidth/2,25)
    rect(0, windowHeight * (localUserList[leftUserId]/100), windowWidth/2, 20)
    rect(windowWidth/2, windowHeight * (localUserList[rightUserId]/100), windowWidth/2, 20)

    if (frameCount%4==0 && abs(localUserList[leftUserId]-localUserList[rightUserId]) < 5 && breathVolume < 0){
      breathVolume +=1
    } else if (frameCount%4==0 && abs(localUserList[leftUserId]-localUserList[rightUserId]) > 5 && breathVolume > -30){
      breathVolume -=1
    }
  }



  //i don't remember how this logic should work

  // if breathvol is less than max and the abval is low, breathvol plus one
  // if breathvol is greater than min and abval is high, breathvol minus one



  synth.volume.value = breathVolume;

}
