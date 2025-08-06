document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const chatWindow = document.getElementById("chat-window");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Display user message
    appendMessage("You", userMessage);
    input.value = "";

    // Simulated AI response (replace this with actual Gemini API call)
    const aiResponse = await getGeminiResponse(userMessage);
    appendMessage("TutorBuddy", aiResponse);
  });

  function appendMessage(sender, text) {
    const messageEl = document.createElement("div");
    messageEl.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatWindow.appendChild(messageEl);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  async function getGeminiResponse(userText) {
    // Placeholder — connect this to Firebase Gemini integration
    return `Let me help with that! "${userText}" sounds like a great question.`;
  }
});
