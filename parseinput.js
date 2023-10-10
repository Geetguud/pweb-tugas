"use strict"

let validOperators = ['+', '-', '*', '/'];
let validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function parseinput() {
    let input = document.getElementById("input").value.trim();
    let numbers = [];
    let operators = [];
    
    let isNegative = false;

    while(input.length > 0) {
        
        if (validOperators.includes(input[0])) {

            // Get Operator

            if (numbers.length <= operators.length) {
                if (input[0] == '-') {
                    isNegative = true;
                } else {
                    console.log("Operator overflow");
                    return [[], []];
                }
            } else {
                operators.push(input[0]);
            }

            input = input.slice(1);

        } else {

            // Get Number

            let number = 0;
            let decimal = 0;
            let decimalPlace = 1;
            let isDecimal = false;

            while(input.length > 0) {
                if (validNumbers.includes(input[0])) {
                    if (isDecimal) {
                        decimalPlace /= 10;
                        decimal = decimal + (parseFloat(input[0]) * decimalPlace);
                    } else {
                        number = (number * 10) + parseInt(input[0]);
                    }
                } else if (input[0] == '.') {
                    isDecimal = true;
                } else if (validOperators.includes(input[0])) {
                    break;
                } else {
                    console.log("Invalid character");
                    return [[], []];
                }

                input = input.slice(1);
            }

            number = number + decimal;
            if (isNegative) number = -(number);
            numbers.push(number);
            isNegative = false;
        }
    }

    return [numbers, operators];
}