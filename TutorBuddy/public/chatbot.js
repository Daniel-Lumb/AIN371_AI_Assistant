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
  msg.className = sender === 'You' ? 'user-msg' : sender === 'Assistant' ? 'bot-msg' : 'message';
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

