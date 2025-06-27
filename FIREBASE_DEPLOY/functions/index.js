const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.handlePrompt = functions.https.onRequest(async (req, res) => {
  const { prompt, response, voice, origin } = req.body;
  const log = {
    timestamp: new Date().toISOString(),
    session_id: `GHOSS_${origin}_${Date.now()}`,
    prompt_input: prompt,
    ghoss_response: response,
    voice_used: voice,
    mood_tag: "neutral",
    error_flag: false,
    log_origin: origin,
    synced_to: ["Firestore"]
  };
  await db.collection("ghoss_logs").add(log);
  res.send({ status: "Logged", log });
});