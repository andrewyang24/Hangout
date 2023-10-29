const AuthService = require('../services/authService.js');
const UserService = require('../services/userService.js'); // Replace with the correct path

// Test registration
async function testRegistration() {
    try {
      const newUser = await AuthService.register('testuser', 'testpassword', "testfirst", "testlast");
      console.log('Registration successful:', newUser);
      console.log(AuthService.credentials)
  
      let correct = {first: "testfirst", last: "testlast", active: [], outgoing: [], incoming: [], points: 0};
      console.log(correct)
  
      // Assuming you have a `getUserInfo` function in UserService.js
      const userInfo = await UserService.getUserInfo(newUser);
      console.log(userInfo)
  
      if (deepEqual(userInfo, correct)) {
        console.log("correct user was displayed");
      } else {
        console.log("incorrect user");
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  }

function deepEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        if (!deepEqual(obj1[key], obj2[key])) {
            return false;
        }
        } else if (obj1[key] !== obj2[key]) {
        return false;
        }
    }

    return true;
}

// Run the tests
async function runTests() {
  await testRegistration();
}

runTests();
