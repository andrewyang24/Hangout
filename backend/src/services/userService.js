const db = require('./firebaseInit');
const { FieldValue } = require('firebase-admin').firestore;

class UserService {

  static async getUserInfo(currUser) {
    try {
      const userRef = db.collection('users').doc(currUser);
      const doc = await userRef.get();
      if (!doc.exists) {
        throw new Error('User not found');
      }
      return doc.data();
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }

  static async createHangout(requester, targetUser) {
    try {
      await db.runTransaction(async (transaction) => {
        const requesterRef = db.collection('users').doc(requester);
        const targetUserRef = db.collection('users').doc(targetUser);

        const [requesterDoc, targetUserDoc] = await Promise.all([
          transaction.get(requesterRef), 
          transaction.get(targetUserRef)
        ]);

        if (!targetUserDoc.exists) {
          throw new Error('Target user not found');
        }

        const requesterData = requesterDoc.data();
        const targetUserData = targetUserDoc.data();

        if (requesterData.incoming && requesterData.incoming.includes(targetUser)) {
          throw new Error('Target user is already in incoming requests');
        }

        if (requesterData.outgoing && requesterData.outgoing.includes(targetUser)) {
          throw new Error('Already requested to hang out');
        }

        if (requesterData.active && requesterData.active.includes(targetUser)) {
          throw new Error('Already agreed to hang out');
        }

        transaction.update(requesterRef, { outgoing: FieldValue.arrayUnion(targetUser) });
        transaction.update(targetUserRef, { incoming: FieldValue.arrayUnion(requester) });
      });
    } catch (error) {
      console.error('Error creating hangout:', error);
      throw error;
    }
  }

  static async deleteOutgoing(requester, targetUser) {
    try {
      const requesterRef = db.collection('users').doc(requester);
      const targetUserRef = db.collection('users').doc(targetUser);

      await db.runTransaction(async (transaction) => {
        transaction.update(requesterRef, { outgoing: FieldValue.arrayRemove(targetUser) });
        transaction.update(targetUserRef, { incoming: FieldValue.arrayRemove(requester) });
      });
    } catch (error) {
      console.error('Error deleting outgoing request:', error);
      throw error;
    }
  }

  static async acceptIncoming(requester, targetUser) {
    try {
      const requesterRef = db.collection('users').doc(requester);
      const targetUserRef = db.collection('users').doc(targetUser);

      await db.runTransaction(async (transaction) => {
        transaction.update(requesterRef, {
          incoming: FieldValue.arrayRemove(targetUser),
          active: FieldValue.arrayUnion(targetUser)
        });
        transaction.update(targetUserRef, {
          outgoing: FieldValue.arrayRemove(requester),
          active: FieldValue.arrayUnion(requester)
        });
      });
    } catch (error) {
      console.error('Error accepting incoming request:', error);
      throw error;
    }
  }

  static async rejectIncoming(requester, targetUser) {
    try {
      const requesterRef = db.collection('users').doc(requester);
      const targetUserRef = db.collection('users').doc(targetUser);

      await db.runTransaction(async (transaction) => {
        transaction.update(requesterRef, {
          incoming: FieldValue.arrayRemove(targetUser)
        });
        transaction.update(targetUserRef, {
          outgoing: FieldValue.arrayRemove(requester)
        });
      });
    } catch (error) {
      console.error('Error rejecting incoming request:', error);
      throw error;
    }
  }

  static async hangoutNever(requester, targetUser) {
    try {
      const requesterRef = db.collection('users').doc(requester);
      const targetUserRef = db.collection('users').doc(targetUser);

      await db.runTransaction(async (transaction) => {
        transaction.update(requesterRef, {
          active: FieldValue.arrayRemove(targetUser)
        });
        transaction.update(targetUserRef, {
          active: FieldValue.arrayRemove(requester)
        });
      });
    } catch (error) {
      console.error('Error removing hangout:', error);
      throw error;
    }
  }

  static async hungout(requester, targetUser) {
    try {
      const requesterRef = db.collection('users').doc(requester);
      const targetUserRef = db.collection('users').doc(targetUser);

      await db.runTransaction(async (transaction) => {
        const [requesterDoc, targetUserDoc] = await Promise.all([
          transaction.get(requesterRef), 
          transaction.get(targetUserRef)
        ]);

        const requesterData = requesterDoc.data();
        const targetUserData = targetUserDoc.data();

        transaction.update(requesterRef, {
          points: requesterData.points + 1,
          active: FieldValue.arrayRemove(targetUser)
        });
        transaction.update(targetUserRef, {
          points: targetUserData.points + 1,
          active: FieldValue.arrayRemove(requester)
        });
      });
    } catch (error) {
      console.error('Error processing hangout:', error);
      throw error;
    }
  }
}

module.exports = UserService;
