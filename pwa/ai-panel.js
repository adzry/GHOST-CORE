import { db, collection, addDoc } from './firebase.js'; // Ensure firebase.js is correctly placed

const panel = document.createElement('div');
panel.style.position = 'fixed';
panel.style.bottom = '20px';
panel.style.right = '20px';
panel.style.width = '340px';
panel.style.padding = '15px';
panel.style.background = '#0d1117';
panel.style.color = '#fff';
panel.style.borderRadius = '12px';
panel.style.boxShadow = '0 0 12px rgba(0,0,0,0.4)';
panel.style.zIndex = 9999;
panel.style.fontFamily = 'sans-serif';

panel.innerHTML = `
  <h3 style="margin-top: 0; color: #58a6ff;">🧠 GHOSS AI Panel</h3>
  <input id="aiInput" placeholder="Ask GHOSS..." 
    style="width: 100%; padding: 8px; border-radius: 6px; border: none; margin-bottom: 8px; background: #1e1e1e; color: white;" />
  <button id="aiSend" style="width: 100%; padding: 8px; background: #238636; color: #fff; border: none; border-radius: 6px; cursor: pointer;">🔍 Send</button>
  <div id="aiOutput" style="margin-top: 10px; max-height: 160px; overflow-y: auto; font-size: 14px;"></div>
`;

document.body.appendChild(panel);

async function logToFirestore(input, reply) {
  try {
    await addDoc(collection(db, "ghoss_logs"), {
      question: input,
      response: reply,
      timestamp: new Date().toISOString()
    });
    console.log("🧠 GHOSS log saved to Firebase.");
  } catch (err) {
    console.error("❌ Logging failed:", err.message);
  }
}

document.getElementById('aiSend').addEventListener('click', async () => {
  const input = document.getElementById('aiInput').value.trim();
  const output = document.getElementById('aiOutput');
  if (!input) return;

  output.innerHTML = `<em>🌀 GHOSS thinking...</em>`;

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyA9UHmUYGKlIxWqYdnJ6GPCgUpgFUP7mz0",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }],
        }),
      }
    );

    const json = await res.json();
    const reply = json.candidates?.[0]?.content?.parts?.[0]?.text || "(no response)";
    output.innerHTML = `<strong>🤖 GHOSS:</strong><br>${reply}`;

    await logToFirestore(input, reply); // ✅ Memory logging enabled
  } catch (err) {
    output.innerHTML = `<span style="color: red;">❌ Error:</span> ${err.message}`;
  }
});
