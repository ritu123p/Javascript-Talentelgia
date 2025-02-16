// charAt
const sentence = "I am Ritu";
console.log(sentence.charAt(2));


// at
console.log(sentence.at(2))


//concat
const hello = "Hello, ";
console.log(hello.concat("Kevin", ". Have a nice day."));


// endsWith
function startsWithHello(str) {
    return str.startsWith("Hello");
}
console.log(startsWithHello("Hello, World!"));


// starsWith and endsWith
function isValidUsername(username) {
    return username.startsWith("@") && /\d$/.test(username);
}
console.log(isValidUsername("@user123"));


// padStart
function padWithZeros(num) {
    return num.toString().padStart(5, "0");
}
console.log(padWithZeros(42));


// padEnd
function padWithExclamation(str) {
    return str.padEnd(10, "!");
}
console.log(padWithExclamation("Hello"));



// slice
function removeFirstAndLast(str) {
    return str.slice(1, -1);
}
console.log(removeFirstAndLast("Hello"));


// concate
function mergeStrings() {
    return "JavaScript".concat(" is", " awesome");
}
console.log(mergeStrings());



// slice
const str = "The quick brown fox jumps over the lazy dog.";
console.log(str.slice(31));
console.log(str.slice(4, 19));
console.log(str.slice(-4));
console.log(str.slice(-9, -5));



// replaceAll
const paragraph = "I think Ruth's dog is cuter than your dog!";
console.log(paragraph.replaceAll("dog", "monkey"));
