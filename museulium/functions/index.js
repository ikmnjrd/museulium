// const functions = require('firebase-functions');
// const func = require('./piecepage');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.database();
const app_domain = "museulium.com";

const OGP_IMG_WIDTH = 600;
const OGP_IMG_HEIGHT = 300;
const OGP_IMG_ARTWORK_WIDTH = OGP_IMG_WIDTH * 0.5;

exports.funcOGP = functions.https.onRequest((req, res) => {
  const [, , pieceId] = req.path.split('/');

  return db.ref('/p/'+pieceId).on('value', (snap) => {

    if (!snap) {
      res.status(404).end('404 Not Found');
      return
    }

    const html = createHtml(pieceId, snap.val().piece);
    res.set('Cache-Control', 'public, max-age=600, s-maxage=600');
    res.status(200).end(html);
    return
  }
  // ,function(err) {
  //   console.warn(err)
  //   // 略 : エラー時はデフォルトのhtml（固定のOGP）を返す
  // }
  )
});

const createHtml = (pieceId, piece) => {
  const SITEURL = `https://${app_domain}`
  const PAGEURL = `${SITEURL}/p/${pieceId}`
  const TITLE = `What is this picture a copy of？`
  const DESCRIPTION = 'This site is a game where you can improve your drawing skills by copying famous pictures in time.'

  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>Museulium</title>
        <meta property="og:title" content="${TITLE}">
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/museulium-cb08f.appspot.com/o/p%2F${piece}.jpg?alt=media">
        <meta property="og:image:width" content="${OGP_IMG_WIDTH}">
        <meta property="og:image:height" content="${OGP_IMG_HEIGHT}">
        <meta property="og:description" content="${DESCRIPTION}">
        <meta property="og:url" content="${PAGEURL}">
        <meta property="og:type" content="article">
        <meta property="og:site_name" content="Museulium/ミュージアリウム">
        <meta name="twitter:site" content="${SITEURL}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${TITLE}">
        <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/museulium-cb08f.appspot.com/o/p%2F${piece}.jpg?alt=media">
        <meta name="twitter:description" content="${DESCRIPTION}">
      </head>
      <body>
        <script>window.location="${SITEURL}/_p/${pieceId}";</script>
      </body>
    </html>
  `
}