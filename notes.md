### Higher Order Functions
##### Task
  - Implement a function that takes a function and a number `num`, and then executes the function `num` times
##### Solution
```javascript
function repeat(operation, num) {
	if (num <= 0) return
	operation();
	return repeat(operation, --num);
}
```
##### How It Works
  - Uses recursion and decrements the number of times to run the operation after each run of the operation
  - Base case is 0 more times to run the operation
##### Thoughts
  - I initially was running the operation after the recursion (so each operation was run after the 'kick')
    - However, while it worked, it was inaccurate, because `num` was being decremented prematurely

### Basic Map
##### Task
  - Convert the following code from a for loop to Array#map
```javascript
function doubleAll(numbers) {
  var result = []
  for (var i = 0; i < numbers.length; i++) {
    result.push(numbers[i] * 2)
  }
  return result
}
```
##### Solution
```javascript
function doubleAll(numbers) {
	return numbers.map(function(num) {
		return num * 2;
	});
}
```
##### How It Works
  - Array#map takes a callback function which takes the current element, (and the current index and original array) 
    - Callback function returns an element for the new array produced by Array#map

### Basic Filter
##### Task
  - User Array#filter to write a function that takes an array of objects with `.message` properties and returns an array of messages that are fewer than 50 characters long
##### Solution
```javascript
function getShortMessages(messages) {
	return messages.filter(function(msgObj) {
		return msgObj.message < 50;
	}).map(function(msgObj) {
		return msgObj.message;
	});
}
```
##### How It Works
  - Array#filter takes a callback function and creates a new array of the elements for which the callback evaluated to true
  - Then, chain Array#map to create another array that conists of only the messages (not the objects)

#### Every Some
##### Task
  - Return a function that takes a list of valid users and returns a function that returns true if all of the supplied users exist in the original list of users
##### Solution
```javascript
function checkUsersValid(validUsers) {
	return function(submittedUsers) {
		return submittedUsers.every(function(submittedUser) {
			return validUsers.some(function(validUser) {
				return validUser.id === submittedUser.id;
			});
		});
	}
}
```
##### How It Works
  - The returned function is a closure, so it has access to the original validUsers array
  - Array#every tests whether or not all of the elements in the array pass the test provided by the callback 
    - In this case, the callback utilizes Array#some
  - Array#some iterates over ever element in the array until it finds one for which the test returns true
    - When it does, it returns true