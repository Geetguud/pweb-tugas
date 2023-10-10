"use strict"

function inputKey(value) {
    document.getElementById("input").value += value;
    return;
}

function clearInput(value) {
    if (value == 'C') {
        let input = document.getElementById("input").value;
        document.getElementById("input").value = input.slice(0, (input.length - 1));
    } else if (value == 'CE') {
        document.getElementById("input").value = "";
    }
    return;
}

function calculate() {
    let [numbers, operators] = parseinput();

    if (numbers.length > 1 && operators.length > 0) {

        while (numbers.length > 1 && operators.length > 0) {

            if (operators.includes('*') || operators.includes('/')) {
                let index = operators.join('').search(/[\*\/]/);
                
                if (operators[index] == '*') {
                    numbers[index] *= numbers[index + 1];
                } else if (operators[index] == '/') {
                    numbers[index] /= numbers[index + 1];
                } else {
                    console.log("Error calculating");
                    return;
                }

                numbers.splice((index + 1), 1);
                operators.splice(index, 1);

            } else {
                if (operators[0] == '+') {
                    numbers[0] += numbers[1];
                } else if (operators[0] == '-') {
                    numbers[0] -= numbers[1];
                } else {
                    console.log("Error calculating");
                    return;
                }

                numbers.splice(1, 1);
                operators.shift();
            }
        }

        document.getElementById("input").value = numbers[0];
    }
}

let keyboard = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '+', '-', '*', '/', '.', '=',
    'backspace', 'enter'
];

document.onkeydown = function(event) {
    let key = event.key.toLowerCase();
    if (keyboard.includes(key)) {
        
        if (key == 'enter') {
            if (document.activeElement.tagName == "BUTTON") return;
            else {
                calculate();
            }
        } else if (key == 'backspace') {
            if (document.activeElement.id == "input") return;
            else {
                clearInput('C');
            }
        } else if (key == '=') {
            calculate();
        } else {
            if (document.activeElement.id == "input") return;
            else {
                inputKey(key);
            }
        }
    }
}