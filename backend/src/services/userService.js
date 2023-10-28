const AuthService = require('../services/authService.js');

class UserService {

  static getUserInfo(currUser) {
    // Implement logic to get user details by username
    // Example: return userDetails = credentials[username];
    return AuthService.users[currUser];
  }

}

module.exports = UserService;


// {ayang: {first: "andrew", last: "Yang", active: [], outgoing: [], incoming: [], points: 0}, user2.....}