"use strict";

// // Q1)
// const calcAge = function (birthYear) {
//   const curAge = 2025 - birthYear;

//   if (curAge >= 18 && curAge < 65) {
//     console.log(`You are ${curAge} year's old and you are  eligible to vote`);
//   } else if (curAge >= 65) {
//     console.log(`You ar ${curAge} year's old and you are  senior citizen`);
//   } else {
//     console.log(
//       `You are ${curAge} year's old and you are not eligible to vote `
//     );
//   }
// };

// calcAge(2010);

// // Q2)
// const array = [1, 2, 3, 4, 5];

// const sum = array.reduce((acc, cur) => {
//   return acc + cur;
// }, 0);

// console.log(`Sum : ${sum}`);
// console.log(`Average: ${sum / array.length}`);

// // Q3)

// // Reverse a string
// const string = "wow";
// let reverse = "";

// for (let i = string.length - 1; i >= 0; i--) {
//   reverse += string[i];
// }

// // Check for palindrome
// if (string == reverse) {
//   console.log("Palindorme");
// } else {
//   console.log("Not a palindrome");
// }

// // No of vowels in string
// let count = 0;

// for (let i = 0; i < string.length; i++) {
//   if (
//     string[i] == "a" ||
//     string[i] == "i" ||
//     string[i] == "e" ||
//     string[i] == "o" ||
//     string == "u"
//   ) {
//     count++;
//   }
// }

// console.log(`No of vowels  = ${count}`);

// //Q4)
// const calcLongestWord = function (sentance) {
//   let input = sentance.trim();
//   const words = [];
//   let count = 0;
//   for (let i = 0; i < input.length; i++) {
//     if (input[i] == " " || input[i] == "\n") {
//       if (count == 0) continue;

//       words.push(input.slice(i - count, i));
//       count = 0;
//     } else if (i == input.length - 1) {
//       words.push(input.slice(i - count, i + 1));
//     } else {
//       count++;
//     }
//   }

//   const ans = words.reduce((acc, cur) => {
//     return acc.length > cur.length ? acc : cur;
//   }, words[0]);

//   console.log(words);
//   return ans;
// };

// const ans = calcLongestWord(
//   "I am Keshav Chandak From india \n I am huge cristanio fan siuuuuuuuuuu!"
// );
// console.log(ans);

//Q5)
const toDOitems = [];

// Add funcion
const add = function () {
  const task = prompt("Enter the task");
  toDOitems.push(task);
};
// Remove function
const remove = function () {
  const removeTask = +prompt("Enter the task no you want to remove");
  toDOitems.splice(removeTask - 1, 1);
};
//Display function
const display = function () {
  let count = 1;
  if (!toDOitems.length > 0) {
    console.log("No task");
    return;
  }
  toDOitems.forEach((task) => {
    console.log(`${count}: ${task}`);
    count++;
  });
};

let state = true;

while (state != false) {
  const input = prompt("Enter the operation");

  if (input == "add") {
    add();
  }

  if (input == "remove") {
    remove();
  }

  if (input == "display") {
    display();
  }

  if (input == "quit") {
    state = false;
  }
}
