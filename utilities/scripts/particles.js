const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//console.log(canvas.width);
//console.log(canvas.height);
let particleArray;

let mouse = {
	x: null,
	y: null,
	radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove', 
	event => {
		mouse.x = event.x;
		mouse.y = event.y;
		//console.log("X position "+ mouse.x);
		//console.log("Y position "+ mouse.x);
});

//Create Particles

class Particle {
	constructor (x, y, directionX, directionY, size, color) {
		this.x = x;
		this.y = y;
		this.directionX = directionX;
		this.directionY = directionY;
		this.size = size;
		this.color = color;
	}
	//drawing methods
	draw() {
		ctx.beginPath();
		ctx.font= "17.5px Syne";
		ctx.textAlign = "center";
		ctx.fillText('hello',this.x, this.y);
		ctx.fillStyle = '#2f2d2e';
		ctx.fill();
	}

	update(){
		if (this.x > canvas.width || this.x < 0) {
			this.directionX = -this.directionX;
		}
		if (this.y > canvas.height || this.y < 0) {
			this.directionY = -this.directionY;
		}

		//Check mouse collision
		let dx = mouse.x - this.x;
		let dy = mouse.y - this.y;
		let distance = Math.sqrt(dx*dx + dy*dy);
		if (distance < mouse.radius + this.size){
			if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
				this.x += 10;
			}	
			if (mouse.x >this.x && this.x > this.size * 10){
				this.x -= 10;
			}
			if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
				this.y += 10;
			}	
			if (mouse.y >this.y && this.y > this.size * 10){
				this.y -= 10;
			}
		}
		//move particle
		this.x += this.directionX;
		this.y += this.directionY;
		this.draw();
	}
}

let init = () => {
	particleArray = [];
	let numberOfParticles = (canvas.height * canvas.width) / 10000;
	for (let i = 0; i < numberOfParticles; i++) {
		let size = (Math.random() * 5) + 1;
		let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
		let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
		let directionX = (Math.random() * 5) -2.5;
		let directionY = (Math.random() * 5) -2.5;
		let color = '#2f2d2e';
		particleArray.push(new Particle(x, y, directionX, directionY, size, color));
	}
};

let connect = () => {
	let opacityValue = 0.5;
	for (let i = 0; i < particleArray.length; i++) {
		for (let j =0; j < particleArray.length; j++){
			let distance = ((particleArray[i].x - particleArray[j].x) 
						* (particleArray[i].x - particleArray[j].x)) 
						+ ((particleArray[i].y - particleArray[j].y)
						* (particleArray[i].y - particleArray[j].y));
			if (distance < (canvas.width/7) * (canvas.height/7)) {
				opacityValue = 1 - (distance/20000);
				ctx.strokeStyle = 'rgba(43, 39, 70, 0.5)';
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(particleArray[i].x, particleArray[i].y);
				ctx.lineTo(particleArray[j].x, particleArray[j].y);
				ctx.stroke();
			}
		}
	}
};

let animate = () => {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for (let i = 0; i < particleArray.length; i++) {
		particleArray[i].update();
	}
	connect();
};
window.addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	mouse.radius = ((canvas.height/80) * (canvas.width/80));
});

window.addEventListener('mouseout', () =>  {
	mouse.x = undefined;
	mouse.y = undefined;
});
init();
animate();