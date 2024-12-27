isDeleted="true" isMoved="true" isMovedTo="components/accessibility_improvements.tsx"[v0-no-op-code-block-prefix]// This is a sample file demonstrating the merging process.  The original file name is unknown.

// Function to calculate the factorial of a number.
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

// Function to calculate the sum of an array of numbers.
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}


// Example usage
console.log("Factorial of 5:", factorial(5)); // Output: 120
console.log("Sum of [1, 2, 3, 4, 5]:", sumArray([1, 2, 3, 4, 5])); // Output: 15

// Added a new function to demonstrate further updates.
function greet(name) {
    console.log("Hello, " + name + "!");
}

greet("World"); // Output: Hello, World!

