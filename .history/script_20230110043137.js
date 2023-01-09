'use strict';


// Select elements
const questionTextArea = document.getElementById('question');
const choicesTextArea = document.getElementById('choices');
const choiceContainer = document.querySelector('.listed_choices');
const wheelColors = ['red', 'orange', 'yellow', 'green', 'blue', 'blueviolet'];
const wheel = document.querySelector('.wheel');

let choices;


const createChoiceTags = () => {
    const choice = document.createElement('span');
    choice.classList.add('choice');
    choice.innerText = choicesTextArea.value;
    choiceContainer.prepend(choice);
    choicesTextArea.value = '';
    console.log(choice);
    


}

const getNumberOfChoices = () => {
    choices = choiceContainer.children.length;
	return choices;
};



choicesTextArea.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
        createChoiceTags();
        getNumberOfChoices();
	}
});








/html/body/div[1]/div[1]/div/div[1]/div[2]/canvas