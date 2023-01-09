'use strict';


// Select elements
const questionTextArea = document.getElementById('question');
const choicesTextArea = document.getElementById('choices');
const choiceContainer = document.querySelector('.listed_choices');








choicesTextArea.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const choice = document.createElement('span');
        choice.classList.add('choice');
        choice.innerText = choicesTextArea.value;
        choiceContainer.prepend(choice);
        choicesTextArea.value = ''
    }
});