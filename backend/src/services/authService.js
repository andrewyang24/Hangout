class AuthService {
  static credentials = {};
  static users = {};
  static currUser;

  static async register(username, password, firstname, lastname, phonenumber) {
    // Check if the username is already taken
    if (username in AuthService.credentials) {
      throw new Error('Username is already taken');
    }

    // Add the user to the in-memory storage
    AuthService.credentials[username] = password;
    AuthService.users[username] = { first: firstname, last: lastname, active: [], outgoing: [], incoming: [], points: 0, phone: phonenumber };

    return username;
  }

  static async login(username, password) {
    if (!(username in AuthService.credentials)) {
      throw new Error('User not found');
    }

    // Find the user with the given username
    const pw = AuthService.credentials[username];

    if (!(pw === password)) {
      throw new Error('Invalid password');
    }

    AuthService.currUser = username;
    return username;
  }
}

module.exports = AuthService;
