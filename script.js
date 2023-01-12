'use strict';


// Select elements
const questionTextArea = document.getElementById('question');
const choicesTextArea = document.getElementById('choices');
const choiceContainer = document.querySelector('.listed_choices');
const shuffleBtn = document.querySelector('.shuffle');
const sortBtn = document.querySelector('.sort');
const clearBtn = document.querySelector('.reset');
const spinBtn = document.querySelector('.spin');
const angleIndicator = document.querySelector('.angle-indicator');
let sliceName = choicesTextArea.value;
const colors = [
	'DeepSkyBlue',
	'red',
	'orange',
	'DeepPink',
	'green',
	'blue',
	'blueviolet',
	'OrangeRed',
	'Gold',
	'Magenta',
	'LightSeaGreen',
	'Maroon',
];
const wheel = document.querySelector('.wheel');
const canvas = document.getElementById('wheelCanvas');
const spins = document.querySelector('.spins');
let slices = [];


choicesTextArea.addEventListener('keydown', (e) => {
	if (choicesTextArea.value !== '') {
		if (e.key === 'Enter') {
			addSlice();
			// spinning.classList.add('spins');
			
		}
	}

});


let ctx = canvas.getContext('2d');
let radius = canvas.height / 2;
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let center = canvas.width / 2;

function drawSlices() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let sliceAngle = (Math.PI * 2) / slices.length;
	let startAngle = 0;
	for (let i = 0; i < slices.length; i++) {
		ctx.fillStyle = colors[i % colors.length];
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
		ctx.lineTo(centerX, centerY);
		ctx.fill();

		// save the canvas state before rotation
		ctx.save();

		// calculate the angle of the slice
		let sliceAngle2 = (startAngle + (startAngle + sliceAngle)) / 2;

		// translate and rotate the canvas to the center of the slice
		ctx.translate(centerX, centerY);
		ctx.rotate(sliceAngle2);

		// Draw the text
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = '16px Arial';
		ctx.fillText(slices[i].sliceName, radius * 0.6, 0);

		// restore the canvas to its original rotation
		ctx.restore();

		startAngle += sliceAngle;

		
	}

	
}


// Function to add a slice
function addSlice() {
	let sliceName = choicesTextArea.value;
	slices.push({ sliceName });
	drawSlices();
	renderSliceList();
	choicesTextArea.value = '';
}

// Function to remove a slice
function removeSlice(index) {
	slices.splice(index, 1);
	drawSlices();
	renderSliceList();
}

// Function to render the slice list
function renderSliceList() {
	let sliceList = document.getElementById('slicelist');
	sliceList.innerHTML = '';
	slices.forEach((slice, index) => {
		let div = document.createElement("div");
		div.className = "choice";
		div.textContent = slice.sliceName;
		div.onclick = () => removeSlice(index);
		sliceList.appendChild(div);
	});
}


// Shuffle Slice
shuffleBtn.addEventListener('click', shuffleSlices);
function shuffleSlices() {
	// fisherYatesShuffle shuffle algorithm
	function fisherYatesShuffle(arr) {
		for (let i = arr.length - 1; i >= 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}
	fisherYatesShuffle(slices);
	drawSlices();
	renderSliceList();
}

// Sort the Slice alphabetically
sortBtn.addEventListener('click', sortSlices);
function sortSlices() {
	slices.sort(function (a, b) {
		let nameA = a.sliceName.toUpperCase();
		let nameB = b.sliceName.toUpperCase();
		console.log(nameA, nameB)
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
	});
	drawSlices();
	renderSliceList();
}


// Clear the Slice
clearBtn.addEventListener('click', clearSlices);
function clearSlices() {
	slices.splice(0, slices.length);
	drawSlices();
	renderSliceList();
}


// Rotate the Canvas
let rotateBtn = document.querySelector('.rotate-btn');
let rotation = 0;
let animationId;

rotateBtn.addEventListener('click', rotateCanvas);
function rotateCanvas() {
	// canvas.classList.remove('spins');
	let randomAngle = Math.floor(Math.random() * 360); // generates a random angle between 0 and 360
	rotation += randomAngle;
	canvas.style.transform = 'rotate(' + rotation + 'deg)';
	animationId = requestAnimationFrame(rotateCanvas);
	let randomTime = Math.floor(Math.random() * 7000); // generates a random time between 0 and 7000
	setTimeout(function () {
		cancelAnimationFrame(animationId);
		// determineSlice(rotation);
		drawSlices();
	}, randomTime);
}

// angleIndicator.addEventListener('click', findActiveSlice)

