### Higher Order Functions
- Task
..- Implement a function that takes a function and a number `num`, and then executes the function `num` times
- Solution
```javascript
function repeat(operation, num) {
	if (num <= 0) return
	operation();
	return repeat(operation, --num);
}
```
- How It Works
..- Uses recursion and decrements the number of times to run the operation after each run of the operation
..- Base case is 0 more times to run the operation
- Thoughts
..- I initially was running the operation after the recursion (so each operation was run after the 'kick')
....- However, while it worked, it was inaccurate, because `num` was being decremented prematurely

### Basic Map
- Task
..- Convert the following code from a for loop to Array#map
```javascript
function doubleAll(numbers) {
  var result = []
  for (var i = 0; i < numbers.length; i++) {
    result.push(numbers[i] * 2)
  }
  return result
}
```
- Solution
```javascript
function doubleAll(numbers) {
	return numbers.map(function(num) {
		return num * 2;
	});
}
```
- How It Works
..- Array#map takes a callback function which takes the current element, (and the current index and original array) 
....- Callback function returns an element for the new array produced by Array#map