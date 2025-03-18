const express = require("express");
const router = express.Router();

const {getResumeData, addReport} = require("../Database/index.js")
const {Interview} = require("./InterviewSimulation.js");

const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { route } = require("./ResumeParser.js");
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const cleanResponse = (response) => {
  const jsonStart = response.indexOf('{');
  const jsonEnd = response.lastIndexOf('}');
  return  response.substring(jsonStart, jsonEnd + 1);
};

function jsonToString(data) {
  let result = [];

  function recursiveTraverse(data) {
      if (typeof data === 'object' && !Array.isArray(data)) {
          for (let key in data) {
              if (data.hasOwnProperty(key)) {
                  result.push(`${key}:`);  
                  recursiveTraverse(data[key]);  
              }
          }
      } else if (Array.isArray(data)) {
          data.forEach(item => {
              recursiveTraverse(item); 
          });
      } else {
          result.push(`${data}`);  
      }
  }

  recursiveTraverse(data);
  return result.join(', ');
}

async function seperateData(userData){
  let cnt = 0;
  while(cnt < 5){
    try{
      const prompt = "Please parse the following resume into a JSON object with clearly defined sections. Each section should be a separate key in the JSON object. The keys should include: 'Technical Skills' and make sure to not include sections related to personal information and soft skills. Make sure the response is in strict JSON format so that it can be parsed without errors.";
      const result = await model.generateContent(userData + " " + prompt);
      const response = await result.response;
      const text = response.text();
      // text =
      console.log("Printing gemini response : ", text);
    
      const cleanedRes = cleanResponse(text);
      console.log("Printing Cleaned response : ", cleanedRes);
      const parsedData = JSON.parse(cleanedRes);
      const resumeMap = new Map();
    
      Object.keys(parsedData).forEach(section => {
        const str = jsonToString(parsedData[section]);
        resumeMap.set(section, str);
      });
    
      return resumeMap;
    }catch(e){
      console.log(e);
      console.log("Error");
    }
    cnt++;
  }
  return "Error";

} 

async function getQuestions(section, data, cnt){
  let req_cnt = 0;
  while(req_cnt < 5){
    try{
      console.log("Hello ", section);
      // const prompt = data + `This is candidates ${section} related data, please provide ${cnt} questions for his/her interview , questions should be relavant to his/her data provided. Response should contain question number as key and question as value don't provide any other information. Don't consider personal information such as address, phone no, etc and education like schooling, etc while generating questions. Make sure the response is in strict JSON format so that it can be parsed without errors.`

      const prompt = data + `This is candidates ${section} related data, please provide ${cnt} questions for his/her interview , every question should have maximum 40-50 words, questions should be relavant to his/her data provided. Response should contain question number as key and question as value don't provide any other information. You are an AI mock interview chatbot that generates coding problems tailored to a candidate's skills, projects, and work experience. Use the provided resume data, including competitive programming profiles like LeetCode, CodeChef, and Codeforces, to determine their coding proficiency. If a candidate has competitive programming experience, generate coding questions appropriate for their rating; for example, ask advanced data structures and algorithms problems for highly rated candidates, moderate-level problems for mid-tier candidates, and fundamental algorithmic problems for beginners. If they have software development projects, generate coding challenges or debugging tasks relevant to the technologies they used, such as optimizing API performance for a web app built with React and Node.js or improving model efficiency for an AI project. If they have work experience, generate coding problems related to their job role, such as database optimization challenges for backend engineers or JavaScript challenges for front-end developers. Do not ask personal or descriptive questions about their background, college life, or subjective experiences. Focus strictly on testing technical skills by directly posing coding problems rather than asking how they achieved their ratings or skills. If you see any core subjects like Operating System, databases and computer networking, you can ask theoretical questions related to them too, keep CN on the lowest priority but. Ask questions that are to be asked in real-life interviews.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
    
      const cleanedRes = cleanResponse(text);
      const parsedData = JSON.parse(cleanedRes);
      
      let queList = []
      Object.keys(parsedData).forEach(section => {
        queList.push(parsedData[section]);
      });
    
      return queList;
    }catch(e){

    }
    req_cnt++;
  }

  return "Error";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function mapToList(queMap){
  let sections = Array.from(queMap.keys());
  shuffleArray(sections);

  let val = 0;
  let secIds = [];

  let queArray = [];
  sections.forEach(sec => {
    queArray.push(...queMap.get(sec));
    const list = queMap.get(sec);
    secIds.push(val);
    val += list.length;
  });

  var obj = {
    quelst : queArray,
    secId : secIds
  }
  return obj;
}

router.post("/questions", async (req, res) => {
  
  console.log("API called");
  const username = req.body.email;
 
  console.log(username);

  const userdata = await getResumeData(username);
  
  console.log("Hello " , userdata);

  const map = await seperateData(userdata.parsedResume);
  if(map == "Error"){
    res.status(500).json({ message: "Gemini is not able to parse the resume" });
  }

  const queMap = new Map();

  for (let [key, value] of map.entries()){
    const cnt = 3;
    if(value.length == 0 || value == "" || value == null) continue;

    const queList = await getQuestions(key, value, cnt);
    
    if(queList == "Error"){
      res.status(500).json({ message: "Gemini is not able to parse the resume" });
    }

    queMap.set(key, queList);
  }

  const obj = mapToList(queMap);
  const queList = obj.quelst;
  secIds = obj.secId;
  console.log(queList);

  const reportId = await addReport(username);
  Interview(queList, secIds, reportId);
  
  res.send("Question Generation model : User");
});


// routes for testing purpose 
router.get("/test", async (req, res) => {
  console.log("testing.....");
  res.send("Testing Completed");
});

// Testing routes compeletd 

module.exports = router;


/*

1. Deploy
2. Resume upload
3. Frontend Design 
4. Timer 
5. Solve Issue of multiple API Calls 
6. Registration / Login



*/
