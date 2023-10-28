const bcrypt = require('bcrypt');

// Sample in-memory user storage
const credentials = {};
let currUser;

class AuthService {
  static async register(username, password) {
    // Check if the username is already taken
    if (username in credentials) {
      throw new Error('Username is already taken');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the user to the in-memory storage
    credentials[username] = hashedPassword;

    return username;
  }

  static async login(username, password) {
    if (!(username in credentials)) {
        throw new Error('User not found');
    }

    // Find the user with the given username
    const pw = credentials[username];

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, pw);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    currUser = username;
    return username;
  }
}


module.exports = AuthService;
