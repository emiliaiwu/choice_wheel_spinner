'use strict';
const canvas = document.getElementById('pieChart');
const ctx = canvas.getContext('2d');
let slices = [];

function drawPieChart() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let totalValue = slices.length;
	let sliceAngle = (Math.PI * 2) / totalValue;
	let startAngle = 0;

	for (let i = 0; i < slices.length; i++) {
		ctx.fillStyle = getRandomColor();
		ctx.beginPath();
		ctx.moveTo(canvas.width / 2, canvas.height / 2);
		ctx.arc(
			canvas.width / 2,
			canvas.height / 2,
			canvas.height / 2,
			startAngle,
			startAngle + sliceAngle
		);
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
		ctx.fillText(slices[i].sliceName, x, y);
		startAngle += sliceAngle;
	}
}

// function to add a new slice
function addSlice() {
	let sliceName = document.getElementById('sliceName').value;
	slices.push({ sliceName });
	drawPieChart();
	document.getElementById(
		'sliceList'
	).innerHTML += `<div><button onclick="removeSlice(${
		slices.length - 1
	})">Remove</button> ${sliceName}</div>`;
}

// function to remove a slice
function removeSlice(index) {
	slices.splice(index, 1);
	drawPieChart();
	document.getElementById('sliceList').innerHTML = '';
	for (let i = 0; i < slices.length; i++) {
		document.getElementById(
			'sliceList'
		).innerHTML += `<div onclick="removeSlice(${i})">Remove</button> ${slices[i].sliceName}</div>`;
	}
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
