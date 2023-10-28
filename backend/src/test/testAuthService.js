const AuthService = require('../services/authService.js'); // Replace with the correct path

// Test registration
async function testRegistration() {
  try {
    const newUser = await AuthService.register('testuser', 'testpassword');
    console.log('Registration successful:', newUser);
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
}

// Test login
async function testLogin() {
  try {
    const authenticatedUser = await AuthService.login('testuser', 'testpassword');
    console.log('Login successful:', authenticatedUser);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
}

// Run the tests
async function runTests() {
  await testRegistration();
  await testLogin();
}

runTests();

