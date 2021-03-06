// Return a function that takes a list of valid users, and returns a function that returns true if all of the supplied users exist in the original list of users.

// You only need to check that the ids match.

// ## Example

//     var goodUsers = [
//       { id: 1 },
//       { id: 2 },
//       { id: 3 }
//     ]
    
//     // `checkUsersValid` is the function you'll define
//     var testAllValid = checkUsersValid(goodUsers)
    
//     testAllValid([
//       { id: 2 },
//       { id: 1 }
//     ])
//     // => true
    
//     testAllValid([
//       { id: 2 },
//       { id: 4 },
//       { id: 1 }
//     ])
//     // => false

// ## Arguments

//   * goodUsers: a list of valid users

// Use array#some and Array#every to check every user passed to your returned function exists in the array passed to the exported function.

// ## Conditions

//   * Do not use any for/while loops or Array#forEach.
//   * Do not create any unecessary functions e.g. helpers.

// ## Resources

//   * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/every
//   * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some

// ## Boilerplate

// initial solution
// function checkUsersValid(goodUsers) {
//   var ids = goodUsers.map(function(el) {return el.id})
//   return function(submittedUsers) {
//     return submittedUsers.every(function(user) {
//       return ids.indexOf(user.id) !== -1;
//     });
//   };
// }

function checkUsersValid(goodUsers) {
  return function(submittedUsers) {
    return submittedUsers.every(function(subUser) {
      return goodUsers.some(function(goodUser) {
        return goodUser.id === subUser.id;
      });
    });
  }
}

module.exports = checkUsersValid