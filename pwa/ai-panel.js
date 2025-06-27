// ai-panel.js — GHOSS Elite AI Panel with Gemini Hook

document.addEventListener("DOMContentLoaded", () => {
  const panel = document.createElement("div");
  panel.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #0d1117;
    border: 2px solid #0057ff;
    border-radius: 12px;
    padding: 16px;
    max-width: 320px;
    color: #fff;
    font-family: monospace;
    box-shadow: 0 0 15px rgba(0,0,0,0.3);
    z-index: 9999;
  `;

  panel.innerHTML = `
    <div style="margin-bottom: 10px; font-weight: bold;">💬 GHOSS AI</div>
    <textarea id="ghoss-input" placeholder="Ask something..." rows="3" style="width: 100%; padding: 8px; border-radius: 6px; border: none;"></textarea>
    <button id="ghoss-send" style="margin-top: 8px; width: 100%; padding: 8px; background: #0057ff; color: #fff; border: none; border-radius: 6px;">Send</button>
    <div id="ghoss-output" style="margin-top: 12px; font-size: 0.9em;"></div>
  `;

  document.body.appendChild(panel);

  document.getElementById("ghoss-send").onclick = async () => {
    const input = document.getElementById("ghoss-input").value.trim();
    const output = document.getElementById("ghoss-output");

    if (!input) return;

    output.innerHTML = "⏳ Thinking...";

    try {
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_GEMINI_API_KEY", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }]
        })
      });

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response received.";
      output.innerHTML = reply;
    } catch (e) {
      output.innerHTML = "❌ Error: " + e.message;
    }
  };
});
