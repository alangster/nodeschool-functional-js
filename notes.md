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
  - Convert the following code from a for loop to `Array#map`
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
  - `Array#map` takes a callback function which takes the current element, (and the current index and original array) 
    - Callback function returns an element for the new array produced by `Array#map`

### Basic Filter
##### Task
  - User `Array#filter` to write a function that takes an array of objects with `.message` properties and returns an array of messages that are fewer than 50 characters long

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
  - `Array#filter` takes a callback function and creates a new array of the elements for which the callback evaluated to true
  - Then, chain `Array#map` to create another array that conists of only the messages (not the objects)

### Basic Every Some
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
  - `Array#every` tests whether or not all of the elements in the array pass the test provided by the callback 
    - In this case, the callback utilizes `Array#some`
  - `Array#some` iterates over ever element in the array until it finds one for which the test returns true
    - When it does, it returns true

### Basic Reduce
##### Task
  - Given an array of strings, use `Array#reduce` to create an object that contains the number of times each string occured in the array

##### Solution
```javascript
function countWords(inputWords) {
	return inputWords.reduce(function(collectObj, str) {
		collectObj[str] = ++collectObj[str] || 1;
		return collectObj;
	}, {})
}
```

##### How It Works
  - `Array#reduce` takes a callback function--which itself takes the previous return value and the current element--and an optional inital value for the 'previous value'
    - Each execution of the callback should return the value to be used as the previous value in the next execution
  - When incrementing or setting the count, `++collectObj[str]` will be `NaN`, so `collectionObj[str]` will be set to 1

### Basic Recursion 
##### Task
  - Implement `Array#reduce` using recursion
  - Function should take an array over which to reduce, a function to use as the reduction step, and an inital value for the reduction

##### Solution
```javascript
function reduce(arr, fn, init) {
	(function reduceOne(ind, value) {
		if (ind > arr.length - 1) return value;
		return reduceOne(ind + 1, fn(value, arr[ind], ind, arr));
	})(0, init);
}
```
##### How It Works
  - Uses an IIFE that is itself recursive
  - IIFE takes an index and an initial value (starts with 0 and the initial value passed into the enclosing function)
    - If the index is beyond the scope of the array, that means every element in the array has been processed
      - Return the initial value
    - Else, call `reduceOne` again with the next index and the inital value being the result of the callback function

### Basic Call
##### Task
  - Write a function `duckCount` that returns the number of arguments passed to it which have a property 'quack' defined directly on them. Do not match values inherited from prototypes.

##### Solution
```javascript
function duckCount() {
	return Array.prototype.slice.call(arguments).filter(function(duck) {
		return Object.prototype.hasOwnProperty.call(duck, 'quack'); 
	}).length;
}
```

##### How It Works
  - Start by borrowing `Array#slice` to make a copy of the arguments (result is an array of the arguments)
  - Call `Array#filter` on the arguments array
    - Inside the callback function for the filter, borrow `Object#hasOwnProperty` to test whether or not the current element has the property'quack'
  - Resulting array consists of only those objects for which the test evaluated to `true`
    - Return the `length` property of that array

### Partial Application Without Bind
##### Task
  - Use partial application to create a function that fixes the first argument to `console.log`

##### Solution
```javascript
var slice = Array.prototype.slice;

function logger(namespace) {
	return function() {
		console.log.apply(console, [namespace].concat(slice.call(arguments)))
	}
}
```

##### How It Works
  - The logger function returns a closure, so the closure has access to the original `namespace` value
  - `console.log` is variadic, as is the closure
    - So, use `apply` to pass the arguments and namespace to `console.log`
      - Concatenate the namespace with the arguments to make a single array

### Partial Application With Bind
##### Task
  - Use `Function.bind` to implement a logging function that allows logging messages with a namespace

##### Solution
```javascript
function logger(namespace) {
	return console.log.bind(console, namespace);
}
```

##### How It Works
  - Returns the `console.log` function with the namespace alreay bound as an argument
  - Any other arguments passed when the function is called are just appended to the namespace

### Implement Map with Reduce
##### Task
  - Use `Array#reduce` to implement a simple version of `Array#map`

##### Solution
```javascript
function arrayMap(arr, fn) {
	return arr.reduce(function(collect, el) {
		return collect.concat(fn(el));
	}, [])
}
```

##### How It Works
  - Calls `Array#reduce` on the original array, using a new, empty array as the initial value
  - Each execution of the callback passed to `Array#reduce` returns a new array that is the result of concatenating the previous array with the result of calling the function on the element

### Function Spies
##### Task
  - Override a specified method of an object while still maintaining its original behavior
  - Create a spy that keeps track of how many times the function is called

##### Solution
```javascript
function Spy(target, method) {
	var spy = { count: 0 };
	var origFunction = target[method];
	target[method] = function() {
		++spy.count;
		return origFunction.apply(this, arguments);
	}
	return spy;
}
```

##### How It Works
  - Create a spy object with a count propert
  - Store the original function that is the method on the target
  - Redefine the method on the target
    - In new definition, increment the spy's count
    - Call the original function with the arguments passed
      - `this` will refer to the target, since we are technically inside target while redefining the method

### Blocking Event Loop
##### Task
  - Modify the recursive `repeat` function provided in the boilerplate, such that it does not block the event loop (i.e. Timers and IO handlers can fire). This necessarily requires `repeat` to be asynchronous.
  - A timeout is queued to fire after 1 second, which will print the results of the test and exit the process. `repeat` should release control of the event loop such that the timeout fires before 1500 milliseconds elapse.

##### Boilerplate
```javascript
function repeat(operation, num) {
	if (num <= 0) return;
	operation();
	return repeat(operation, --num);
}
```
##### Solution
```javascript
function repeat(operation, num) {
	if (num <= 0) return;
	operation();
	setTimeout(function() {
		return repeat(operation, --num);
	}, 0);
}

// alternatively...

function repeat(operation, num) {
	if (num <= 0) return;
	operation();
	if (num % 10 === 0) {
		setTimeout(function() {
			repeat(operation, --num);
		}, 0);
	} else {
		repeat(operation, --num);
	}
}
```

##### How It Works
  - First Solution
    - Runs the operation, then sets a timeout with a minimum delay of 0 milliseconds
      - Setting the timeout means the callback, which calls `repeat` and decrements `num` will get pushed into the event queue
      - Because it is in the event queue, it will move onto the stack when the stack is empty, where `repeat` will fire off the operation and another `setTimout`
        - The `setTimeout` that has been queued to interrup the process will enter the event queue after its delay, thus 'cutting in line' and ending up ahead of the `repeat` operations added to the queue after it
        - When the interrupting function reaches the front of the queue and there is nothing on the stack, the event loop will move it onto the stack
          - It will be executed, and the entire process will halt
  - Second Solution
    - It is essentially the same as the first, but it runs more operations
      - It is able to run more operations because it only yields control (i.e., puts a `repeat` into the event queue) every 10 times the code runs

### Trampoline
##### Task
  - Modify the boilerplate below such that it uses a trampoline to continuously call itself synchronously.
  - You can assume that the operation passed to repeat does not take arguments (or they are already bound to the function) and the return value is not important.

##### Boilerplate
```javascript
function repeat(operation, num) {
  // Modify this so it doesn't cause a stack overflow!
  if (num <= 0) return
  operation()
  return repeat(operation, --num)
}

function trampoline(fn) {
  // You probably want to implement a trampoline!
}

module.exports = function(operation, num) {
  // You probably want to call your trampoline here!
  return repeat(operation, num)
}
```
##### Solution
```javascript
function repeat(operation, num) {
	return function() {
		if (num <= 0) return;
		operation();
		return repeat(operation, --num);
	}
}

function trampoline(fn) {
	while(fn && typeof(fn) === 'function') {
		fn = fn();
	}
}

module.exports = function(operation, num) {
	trampoline(function() {
		return repeat(operation, num)
	});
}
```
##### How It Works
  - Starts with `trampoline` being called with a function as an argument
	  - `trampoline` checks that its argument exists and is a function
	  - It is, so it resets `fn` to the result of calling the function it received
	  - In calling the function it received, the return value is the result of calling `repeat`
	  - The return value of `repeat` is a closure, so that closure becomes the new value of `fn`
	  - `fn` is a function, so it gets reset to the value of calling `fn`
	  - Calling `fn` runs the `operation` and returns the result of calling `repeat`, which is a closure...
	- The trampoline is a good way to do this because it only pushes a few functions onto the stack over `trampoline` itself

### Async Loops
##### Task
  - Fix this code! The callback should be called with all the users loaded. The order of the users should match the order of supplied user ids. Because this function is asynchronous, we do not care about its return value.

##### Boilerplate
```javascript
function loadUsers(userIds, load, done) {
  var users = []
  for (var i = 0; i < userIds.length; i++) {
    users.push(load(userIds[i]))
  }
  return users
}
```
##### Solution
```javascript
function loadUsers(userIds, load, done) {
	var users = [];
	var loaded = 0;
	userIds.forEach(function(id, ind) {
		load(id, function(user) {
			users[ind] = user;
			if (++loaded === userIds.length) return done(users);
		});
	});
}
```
##### How It Works
  - Creates the array to hold loaded users, and initializes a counter to keep track of the number of loaded users
  - Iterates over the array of user IDs, passing the id and index into the callback
    - Within the callback, `load` the user asynchronously and, upon completion, run the callback
      - Callback uses the original index to put the user in the correct place, then increments the number loaded and checks to see if all users have been loaded
        - If all users have been loaded, it fires the `done` callback
        - The callback for any of the users could be the one that executes `done`--it could be the first user if that one took a long time to load

### Recursion
##### Task
  - Implement a recursive function that returns all of the unique dependencies, and sub-dependencies of a module, sorted alphabetically. Dependencies should be printed as dependency@version e.g. 'inflection@1.2.6'.
  - Multiple versions of the same module are allowed, but duplicates modules of the same version should be removed.

#####Solution
```javascript
function getDependencies(tree) {
	if (!tree.dependencies) return [];
	var dependencies = [];
	function find(subTree) {
	  Object.keys(subTree).forEach(function(dep) {
			var nameAndVersion = dep + '@' + subTree[dep].version;
			if (dependencies.indexOf(nameAndVersion) === -1) dependencies.push(nameAndVersion);
			if (subTree.dependencies) find(subTree.dependencies);
	  });
	}
	find(tree.dependencies);
	return dependencies.sort();
}
```
##### How It Works
  - Return an empty array if the original tree has no dependencies
  - Initialize an array to store the dependencies
  - Call `find` with the original tree's dependencies
    - Inside `find` get the keys found in the dependencies object
    - For each key, assemble its name and version string
      - If the name and version string is not already in the dependencies array, push it in
    - If the tree passed into `find` has a dependencies object, call `find` again and pass that object in
  - Ultimately, sort and return the dependencies array

### Currying
##### Task
  - In this challenge, we're going to implement a 'curry' function for an arbitrary number of arguments.
  - `curryN` will take two parameters:
    - fn: The function we want to curry.
    - n: Optional number of arguments to curry. If not supplied, `curryN` should use the fn's arity as the value for n.

##### Example
```javascript
function add3(one, two, three) {
  return one + two + three
}

var curryC = curryN(add3)
var curryB = curryC(1)
var curryA = curryB(2)
console.log(curryA(3)) // => 6
console.log(curryA(10)) // => 13

console.log(curryN(add3)(1)(2)(3)) // => 6
```
##### Solution
```javascript
function curryN(fn, n) {
	if (typeof(n) !== 'number') n = fn.length;
	return function curry(arg) {
		if (n <= 1) return fn(arg);
		--n;
		fn = fn.bind(fn, arg);
		return curry;
	}
}
```
##### How It Works
  - Uses the function's `length` property to determine its arity
  - Returns a closure
    - The `curry` closure will call the function if all arguments have been received
    - Otherwise, it will decrement the arguments count and reassign the function
      - The function is reassigned to be itself, but with the newest argument bound
      - Then it returns the `curry` closure
