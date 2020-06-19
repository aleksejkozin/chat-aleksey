import * as functions from 'firebase-functions';

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const messaging = admin.messaging();

const currentTime = admin.firestore.FieldValue.serverTimestamp();

exports.sendMessage = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
    );
  }

  const uid = context.auth.uid;
  const {message} = data;

  if (typeof message !== 'string' || message.length > 1000) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'Invalid input.',
    );
  }

  const userInfo = await admin.auth().getUser(uid);
  const userName = userInfo.displayName || 'Unknown';

  await db.collection('messages').add({
    uid: uid,
    message: message,
    createdAt: currentTime,
    name: userName,
  });

  await messaging.send({
    topic: 'main',
    notification: {
      title: userName,
      body: message,
    },
    android: {
      notification: {
        sound: 'default',
      },
    },
    apns: {
      payload: {
        aps: {
          sound: 'default',
        },
      },
    },
  });

  return {
    result: 'Ok',
  };
});
