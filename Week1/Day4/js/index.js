const person = {
    name: "Alice",
    age: 25,
    city: "New York"
};

console.log(Object.keys(person)); 

console.log(Object.values(person)); 

const additionalInfo = { country: "USA", job: "Developer" };
const updatedPerson = Object.assign({}, person, additionalInfo);

console.log(updatedPerson);
