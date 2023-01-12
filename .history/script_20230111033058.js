'use strict';


// Select elements
const questionTextArea = document.getElementById('question');
const choicesTextArea = document.getElementById('choices');
const choiceContainer = document.querySelector('.listed_choices');
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
	'Yellow',
	'Magenta',
	'LightSeaGreen',
];
const wheel = document.querySelector('.wheel');
const canvas = document.getElementById('wheelCanvas');
let slices = [];


const createChoiceTags = () => {
    const choice = document.createElement('span');
    choice.classList.add('choice');
    choice.innerText = choicesTextArea.value;
    choiceContainer.prepend(choice);
    // slices.push(choice.innerText);
	choicesTextArea.value = '';
}

const removeChoice = () => {
	choiceContainer.addEventListener('click', (event) => {
		const clickedChoice = event.target;
		const choices = Array.from(choiceContainer.children);
		const index = choices.indexOf(clickedChoice);
		slices.splice(index, 1);
		clickedChoice.remove();
		drawSlices();
		
		
	})
}
removeChoice();

choicesTextArea.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		slices.push(choicesTextArea.value);
        createChoiceTags();      
		drawSlices();
		// removeChoice();

		console.log(slices)
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
		ctx.fillStyle = colors[i];
		ctx.beginPath();
		ctx.moveTo(canvas.width / 2, canvas.height / 2);
		ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
		ctx.lineTo(canvas.width / 2, canvas.height / 2);
		ctx.fill();

		// get the center of the slice
		let x =
			canvas.width / 2 +
			((Math.cos(startAngle + sliceAngle / 2) * canvas.height) / 2) * 0.6;
		let y =
			canvas.height / 2 +
			((Math.sin(startAngle + sliceAngle / 2) * canvas.height) / 2) * 0.6;
		// display the sliceName
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = '14px Arial';
		ctx.fillText(slices[i], x, y);
		startAngle += sliceAngle;
	}

	
}


// function drawText(deg) {
// 	ctx.save();
// 	ctx.translate(center, center);
// 	ctx.rotate(deg2rad(deg));
// 	ctx.textAlign = 'right';
// 	ctx.fillStyle = '#fff';
// 	ctx.font = '14px';
// 	ctx.fillText(slices[i], 130, 10);
// 	ctx.restore();
// }


function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}


