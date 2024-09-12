const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
var pdfUtil = require("pdf-to-text");

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Function to generate skill-based interview questions
async function skillBasedQuestion(data) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = "Using the skills provided, generate interview questions.";
    const result = await model.generateContent(`${data}\n${prompt}`);

    // Log the entire response to understand its structure
    console.log("Skill-based question response:", result);

    if (result && result.content) {
      const text = result.content;  // Assuming 'content' is the key containing the text response
      console.log("Skill-based Questions:");
      console.log(text);
    } else {
      console.error("No content found in the skill-based question response.");
    }
  } catch (error) {
    console.error("Error generating skill-based questions:", error);
  }
}

// Function to generate project-based interview questions
async function projectBasedQuestion(data) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = "Review the candidate's projects and generate interview questions based on that.";
    const result = await model.generateContent(`${data}\n${prompt}`);

    // Log the entire response to understand its structure
    console.log("Project-based question response:", result);

    if (result && result.content) {
      const text = result.content;
      console.log("Project-based Questions:");
      console.log(text);
    } else {
      console.error("No content found in the project-based question response.");
    }
  } catch (error) {
    console.error("Error generating project-based questions:", error);
  }
}

// Main function to run the AI model for parsing resume and extracting keywords
async function run(data) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = "Extract keywords from the provided resume text, avoiding dates, and return the output in JSON format.";
    const result = await model.generateContent(`${data}\n${prompt}`);

    // Log the entire response to understand its structure
    console.log("Resume parsing response:", result);

    if (result && result.content) {
      const text = result.content;
      console.log("Extracted Resume Keywords (JSON Format):");
      console.log(text);
    } else {
      console.error("No content found in the resume parsing response.");
    }
  } catch (error) {
    console.error("Error parsing resume and extracting keywords:", error);
  }
}

// Function to read PDF and pass the data for question generation
function PDFReader() {
  console.log("Reading PDF...");
  const pdf_path = "./Models/abc.pdf"; // Path to the PDF file

  pdfUtil.pdfToText(pdf_path, function (err, data) {
    if (err) {
      console.error("Error reading PDF:", err);
      return;
    }

    console.log("Extracted text from PDF:");
    console.log(data);

    // Run the AI model to extract keywords
    run(data);

    // Generate questions based on the extracted data
    questionGeneration(data);
  });
}

// Function to generate both skill-based and project-based questions
function questionGeneration(data) {
  skillBasedQuestion(data);
  projectBasedQuestion(data);
}

module.exports = PDFReader;
