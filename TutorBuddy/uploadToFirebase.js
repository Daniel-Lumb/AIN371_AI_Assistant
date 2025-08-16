const admin = require('firebase-admin');
const mammoth = require('mammoth');
const fs = require('fs'); // Built-in Node.js file system

// Initialize Firebase Admin SDK
const serviceAccount = require('./ain-test-file-firebase-adminsdk-fbsvc-3e87bd44f9.json'); // Updated with your key filename
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Path to your Word doc (updated to match your INLData folder)
const docPath = './INL Data/INL AI assistant lesson 1-5 info.docx';

// Function to parse .docx and structure content
async function parseAndUpload() {
  try {
    // Extract text from .docx
    const result = await mammoth.extractRawText({ path: docPath });
    const fullText = result.value;

    // Improved parsing: Split by "Lesson X" headers with better regex
    const lessons = fullText.split(/Lesson\s+\d+/).map((content, index) => {
      if (index === 0) return null; // Skip intro if any
      return {
        lessonNumber: index,
        content: content.trim(),
      };
    }).filter(Boolean); // Remove empty

    // Upload each lesson as a Firestore document
    for (const lesson of lessons) {
      await db.collection('lessons').doc(`lesson${lesson.lessonNumber}`).set(lesson);
      console.log(`Uploaded Lesson ${lesson.lessonNumber}`);
    }

    console.log('Upload complete!');
  } catch (error) {
    console.error('Error:', error);
  }
}

parseAndUpload();