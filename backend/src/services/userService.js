const AuthService = require('../services/authService.js');

class UserService {

  static getUserInfo(currUser) {
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
    const outgoingRequests = AuthService.users[requester].outgoing;
    if (outgoingRequests.includes(targetUser)) {
      throw new Error("Already requested to hang out")
    }
    const activeRequests = AuthService.users[requester].active;
    if (activeRequests.includes(targetUser)) {
      throw new Error("Already agreed to hang out")
    }
    AuthService.users[requester].outgoing.push(targetUser);
    AuthService.users[targetUser].incoming.push(requester);
    return
  }

  static deleteOutgoing(requester, targetUser) {
    let newArray = AuthService.users[requester].outgoing.filter((element) => element !== targetUser);
    AuthService.users[requester].outgoing = newArray;
    newArray = AuthService.users[targetUser].incoming.filter((element) => element !== requester);
    AuthService.users[targetUser].incoming = newArray;
    return
  }

  static acceptIncoming(requester, targetUser) {
    let newArray = AuthService.users[requester].incoming.filter((element) => element !== targetUser);
    AuthService.users[requester].incoming = newArray;
    AuthService.users[requester].active.push(targetUser);
    newArray = AuthService.users[targetUser].outgoing.filter((element) => element !== requester);
    AuthService.users[targetUser].outgoing = newArray;
    AuthService.users[targetUser].active.push(requester);
    return
  }

  static rejectIncoming(requester, targetUser) {
    let newArray = AuthService.users[requester].incoming.filter((element) => element !== targetUser);
    AuthService.users[requester].incoming = newArray;
    newArray = AuthService.users[targetUser].outgoing.filter((element) => element !== requester);
    AuthService.users[targetUser].outgoing = newArray;
    return
  }

  static hangoutNever(requester, targetUser) {
    let newArray = AuthService.users[requester].active.filter((element) => element !== targetUser);
    AuthService.users[requester].active = newArray;
    newArray = AuthService.users[targetUser].active.filter((element) => element !== requester);
    AuthService.users[targetUser].active = newArray;
    return
  }

  static hungout(requester, targetUser) {
    AuthService.users[requester].points += 1
    AuthService.users[targetUser].points += 1
    let newArray = AuthService.users[requester].active.filter((element) => element !== targetUser);
    AuthService.users[requester].active = newArray;
    newArray = AuthService.users[targetUser].active.filter((element) => element !== requester);
    AuthService.users[targetUser].active = newArray;
    return
  }

}

module.exports = UserService;


// {ayang: {first: "andrew", last: "Yang", active: [], outgoing: [], incoming: [], points: 0, phone: 0}, user2.....}