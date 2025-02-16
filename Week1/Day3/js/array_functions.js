// concat
const arr1 = ["a", "b", "c"];
const arr2 = [1, 3, 4];

const arrConcat = arr1.concat(arr2)
console.log(arrConcat)


//entries
const arrEntries = arr1.entries();
for(const elements of arrEntries)
{
    console.log(elements)
}


// every
const ages = [16,78,34,12];
function checkAge(age)
{
    return age > 18;
}
const res = ages.every(checkAge);
console.log(res);


// fill
const arr3 = [1,2,3,4,5]
const arrFill = arr3.fill(0,1,3)
console.log(arrFill)


// filter
const num = [2,3,4,5,6,2]
function evenNum(num)
{
    if(num % 2 == 0)
    {
        return num;
    }
}
const resultEven = num.filter(evenNum);
console.log(resultEven)


// find
const inventory = 
  [
    { name: "apples", quantity: 2 },
    { name: "bananas", quantity: 0 },
    { name: "cherries", quantity: 5 },
  ];
function FindThings(inventory)
{
    if (inventory.name === "cherries")
    {
        return inventory
    }
}
const results = inventory.find(FindThings);
console.log(results);


// find
const arrayNumbers = [4,5,6,7];
const result = arrayNumbers.findIndex(OddNum)
function OddNum(arrayNumbers)
{
    if(arrayNumbers % 2 != 0)
    {
        return arrayNumbers
    }
}
console.log(result)


// findLast
const arrayNumber = [6,4,8,9,3];
const found = arrayNumber.findLast((element) => element > 5);
console.log(found);


// findLastIndex
const number = [6,7,8,4,3];
const lastEven = number.findLastIndex((element) => element % 2 == 0);
console.log(lastEven);



// forEach
const fruits = ["apple", "orange", "cherry"];
fruits.forEach((element) => console.log(element));


// include
const fruit = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.includes("Banana", 3));



// indexOf
const fruitName = ["Banana", "Orange", "Apple", "Mango", "Apple"];
let index = fruitName.indexOf("Apple", 3);
console.log(index);



// map
const numbers = [65, 44, 12, 4];
const newArr = numbers.map(myFunction)
function myFunction(num) {
  return num * 10;
}
console.log(newArr);



// pop
const array2 = [3,6,7,8];
console.log(array2.pop());
console.log(array2)



// push
const array3 = [3,6,7,8];
console.log(array3.push(9));
console.log(array3)