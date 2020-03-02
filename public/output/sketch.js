// Open and connect input socket
let socket = io('/output');
socket.on('connect', () => {
	console.log('Connected');
});

function setup() {
	createCanvas(windowWidth, windowHeight);
	// background(255);
}
