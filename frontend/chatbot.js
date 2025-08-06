async function askAssistant() {
  const userInput = document.getElementById('userInput').value;
  const responseBox = document.getElementById('responseBox');
  
  responseBox.innerHTML = "Thinking...";

  // Placeholder response
  // Replace this with actual Firebase/Gemini API call later
  setTimeout(() => {
    responseBox.innerHTML = `Tutor-Buddy: That's an excellent question about innovation! Here's a quick explanation...`;
  }, 1000);
}
