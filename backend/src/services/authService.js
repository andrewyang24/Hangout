const bcrypt = require('bcrypt');
const db = require('./firebaseInit');

const saltRounds = 10;

class AuthService {

  static async register(username, password, firstname, lastname, phonenumber) {
    const usersRef = db.collection('users');
    const userDoc = await usersRef.doc(username).get();

    if (userDoc.exists) {
      throw new Error('Username is already taken');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Add the user to Firestore
    await usersRef.doc(username).set({
      password: hashedPassword,
      first: firstname, 
      last: lastname, 
      active: [], 
      outgoing: [], 
      incoming: [], 
      points: 0, 
      phone: phonenumber
    });

    return username;
  }

  static async login(username, password) {
    const userDoc = await db.collection('users').doc(username).get();

    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const user = userDoc.data();
    // Compare the password with the hashed password stored in Firestore
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error('Invalid password');
    }
    
    return username;
  }

  static async updatePushToken(username, pushToken) {
    const userDoc = db.collection('users').doc(username);

    const userSnapshot = await userDoc.get();
    if (!userSnapshot.exists) {
      throw new Error('User not found');
    }

    await userDoc.update({ pushToken });
  }
}

module.exports = AuthService;