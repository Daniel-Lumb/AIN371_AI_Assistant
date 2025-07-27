// **********Gemini Prompt Plan ********** // 

/* You are an AI tutor assistant for the course INL 371: Innovation and Leadership at Belgium Campus. 
Act as a friendly tutor-buddy that explains concepts in simple terms, provides examples, quizzes students, 
and helps guide them through their assignments.

Use the provided course material to answer questions accurately. If the student asks for a summary of a section, 
highlight the key points. If a quiz is requested, generate 3–5 short multiple-choice questions on that topic. 
Be brief, supportive, and focused on helping the student learn.
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