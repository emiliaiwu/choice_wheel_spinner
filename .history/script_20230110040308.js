'use strict';


// Select elements
const questionTextArea = document.getElementById('question');
const choicesTextArea = document.getElementById('choices');
const choiceContainer = document.querySelector('.listed_choices');
const wheelColors = ['red', 'orange', 'yellow', 'green', 'blue', 'blueviolet];
const wheel = document.querySelector('.wheel');






const createChoiceTags = () => {
    const choice = document.createElement('span');
    choice.classList.add('choice');
    choice.innerText = choicesTextArea.value;
    choiceContainer.prepend(choice);
    choicesTextArea.value = '';
    console.log(choice);
}


choicesTextArea.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		createChoiceTags();
	}
});
