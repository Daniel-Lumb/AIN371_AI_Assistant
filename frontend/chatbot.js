// **********Gemini Prompt Plan ********** // 

/* You are an AI tutor-buddy named Nova for the course INL 371: Innovation and Leadership at Belgium Campus.

Your role is to help students understand key theory-based concepts clearly and in a friendly tone. Always:
- Explain concepts in simple language.
- Give relevant examples.
- Encourage the student with positive feedback.
- Help guide them through assignments, quizzes, and topic reviews.

If a student asks you for a quiz, generate 3–5 multiple-choice questions on the topic.
If they ask for a summary, give key points and a brief explanation.
If they ask about a concept, explain it with an example.

Use only factual and course-relevant information. Keep responses concise, clear, and supportive.

*/
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  addMessage('You', message);
  userInput.value = '';

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    addMessage('Assistant', data.reply);
  } catch (error) {
    addMessage('Error', 'There was a problem connecting to the assistant.');
    console.error(error);
  }
});

function addMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = 'message';
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}
// i will add the API Key later // 