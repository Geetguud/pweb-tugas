"use strict";

//
// ----- Build Keyboard -----
//

const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
];
const keyboardLines = document.getElementsByClassName("keyboard-line");

const enterKey = document.createElement("button");
enterKey.id = "enterkey";
enterKey.className = "keyboard-key";
enterKey.textContent = "Enter";
enterKey.onclick = keyFunction("enter");
keyboardLines[2].appendChild(enterKey);

for (let i = 0; i < keyboard.length; i++) {
    for (let j = 0; j < keyboard[i].length; j++) {
        const key = document.createElement("button");
        key.className = "keyboard-key";
        key.textContent = keyboard[i][j].toUpperCase();
        key.onclick = keyFunction(keyboard[i][j]);
        keyboardLines[i].appendChild(key);
    }
}

const backspaceKey = document.createElement("button");
backspaceKey.id = "backspacekey";
backspaceKey.className = "keyboard-key";
backspaceKey.textContent = "Delete";
backspaceKey.onclick = keyFunction("delete");
keyboardLines[2].appendChild(backspaceKey);

//
// ----- Wordle Engine -----
//

let wordle = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log("wordle : ", wordle)
let guessedWord = [];
let currentLetter = 0;
let currentLine = 0;

const wordLines = document.getElementsByClassName("wordle-line");
const wordLetters = [];
for (let i = 0; i < 6; i++) {
    wordLetters[i] = wordLines[i].children;
}

function keyFunction(keytype) {
    if (keytype == "enter") {
        return submitWord;
    } else if (keytype == "delete") {
        return function() {
            if (currentLetter > 0) {
                currentLetter--;
                wordLetters[currentLine][currentLetter].textContent = "";
                guessedWord.pop();
            }
        }
    } else {
        return function() {
            if (currentLetter < 5) {
                wordLetters[currentLine][currentLetter].textContent = keytype.toUpperCase();
                guessedWord.push(keytype);
                currentLetter++;
            }
        }
    }
}

function submitWord() {
    if (currentLetter != 5) {
        return;
    }

    for (let i = 0; i < 5; i++) {
        if (guessedWord[i] == wordle[i]) {
            wordLetters[currentLine][i].className = "wordle-letter correct";
        } else if (wordle.includes(guessedWord[i])) {
            wordLetters[currentLine][i].className = "wordle-letter partial";
        } else {
            wordLetters[currentLine][i].className = "wordle-letter wrong";
        }
    }
    
    if (guessedWord.join("") == wordle || currentLine == 5) {
        let elements = document.getElementsByTagName("button");
        for (let i = 0; i < elements.length; i++) {
            elements[i].onclick = null;
        }
    }

    guessedWord = []
    currentLetter = 0;
    currentLine++;
}