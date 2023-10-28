const AuthService = require('../services/authService.js');

class UserService {

  static getUserInfo(currUser) {
    // Implement logic to get user details by username
    // Example: return userDetails = credentials[username];
    return AuthService.users[currUser];
  }

  static createHangout(requester, targetUser) {
    if (!(targetUser in AuthService.users)) {
      throw new Error("User not found")
    }
    const incomingRequests = AuthService.users[requester].incoming;
    if (incomingRequests.includes(targetUser)) {
      throw new Error("Target user is already in incoming requests")
    }
    AuthService.users[requester].outgoing.push(targetUser);
    AuthService.users[targetUser].incoming.push(requester);
    return AuthService.user[requester]
  }

}

module.exports = UserService;


// {ayang: {first: "andrew", last: "Yang", active: [], outgoing: [], incoming: [], points: 0}, user2.....}