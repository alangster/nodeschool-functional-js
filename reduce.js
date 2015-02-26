// Given an Array of strings, use Array#reduce to create an object that contains the number of times each string occured in the array. Return the object directly (no need to console.log).

// ## Example

//     var inputWords = ['Apple', 'Banana', 'Apple', 'Durian', 'Durian', 'Durian']
    
//     console.log(countWords(inputWords))
    
//     // =>
//     // {
//     //   Apple: 2,
//     //   Banana: 1,
//     //   Durian: 3
//     // }

// ## Arguments

//   * inputWords: An array of random Strings.

// ## Conditions

//   * Do not use any for/while loops or Array#forEach.
//   * Do not create any unecessary functions e.g. helpers.

// ## Resources

//   * https://en.wikipedia.org/wiki/Reduce_(higher-order_function)
//   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

// ## Boilerplate


// initial solution
// function countWords(inputWords) {
//   return inputWords.reduce(function(obj, word) {
//     if (obj[word] >= 0) { 
//       obj[word]++;
//     } else {
//       obj[word] = 1;
//     }
//     return obj;
//   }, {})
// }


function countWords(inputWords) {
  return inputWords.reduce(function(countObj, word) {
    countObj[word] = ++countObj[word] || 1;
    return countObj;
  }, {});
}
module.exports = countWords