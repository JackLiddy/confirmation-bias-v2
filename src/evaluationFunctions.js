// functions to confirm if sequences of 3 numbers follow a given rule

function isIncreasingByOne(a, b, c) {
    return b === a + 1 && c === b + 1;
}
function isDecreasingByOne(a, b, c) {
    return b === a - 1 && c === b - 1;
}
function isIncreasingByTwo(a, b, c) {
    console.log("checking if increasing by 2");
    console.log(
        "numbers(post type conversation): " +
            a +
            ", " +
            b +
            ", " +
            c
    );

    let isTrue = b === a + 2 && c === b + 2;
    console.log("is true: " + isTrue);
    return isTrue;
    // return b === a + 2 && c === b + 2;
}
function isDecreasingByTwo(a, b, c) {
    return b === a - 2 && c === b - 2;
}
function isFibonacci(a, b, c) {
    return a + b === c;
}
function isIncreasing(a, b, c) {
    return b > a && c > b;
}
function isDecreasing(a, b, c) {
    return b < a && c < b;
}
function areAllNumbersPositive(num1, num2, num3) {
    return num1 > 0 && num2 > 0 && num3 > 0;
}
function areAllNumbersNegative(num1, num2, num3) {
    return num1 < 0 && num2 < 0 && num3 < 0;
}
function any3Numbers(num1, num2, num3) {
    return true;
}
function isPrime(num) {
    for (var i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
}
function areAllNumbersPrime(num1, num2, num3) {
    return isPrime(num1) && isPrime(num2) && isPrime(num3);
}
function sqareOfPrevious(num1, num2, num3) {
    return num1 * num1 === num2 && num2 * num2 === num3;
}

// dictionary matching rule names to functions
var ruleDict = {
    "Increase by 1": isIncreasingByOne,
    "Decrease by 1": isDecreasingByOne,
    "Increase by 2": isIncreasingByTwo,
    "Decrease by 2": isDecreasingByTwo,
    Fibonacci: isFibonacci,
    "Increasing order": isIncreasing,
    "Decreasing order": isDecreasing,
    "All positive": areAllNumbersPositive,
    "All negative": areAllNumbersNegative,
    "Any 3 numbers (feels too hard lol)": any3Numbers,
    "All prime (also feels hard + dont use primes over 5 digits)":
        areAllNumbersPrime,
    "Square of previous number": sqareOfPrevious,
};

// Exported function that takes in a rule name and returns the corresponding function
export function getRule(ruleName) {
    return ruleDict[ruleName];
}

