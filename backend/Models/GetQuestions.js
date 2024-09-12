const dotenv  =  require("dotenv")
const { GoogleGenerativeAI } = require("@google/generative-ai");
var pdfUtil = require('pdf-to-text');

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// skills

async function skillBasedQuestion(data) {
  const model = genAI.getGenerativeModel({model : "gemini-pro"});
  const user = data;
  const prompt = "Using the skills ask interview questions";
  const result = await model.generateContent(user+prompt);
  const response = await result.response;
  const text = response.text(); 

  console.log(text);
}

// projects
async function projectBasedQuestion (data){
  const model = genAI.getGenerativeModel({model : "gemini-pro"});
  const user = data;
  const prompt = "Review projects and ask question based on that";
  const result = await model.generateContent(user+prompt);
  const response = await result.response;
  const text = response.text(); 

  console.log(text);
}


async function run(data) {
    const model = genAI.getGenerativeModel({model : "gemini-pro"});
    const user = data;
    const prompt = "Use above candidate details and extract keywords from it like resume parser and avoid dates if any and provide output in json format";
    const result = await model.generateContent(user+prompt);
    const response = await result.response;
    const text = response.text(); 
    let reqData = text.substr (8);
    reqData = reqData.slice(0, -3);
    const data1 = JSON.parse(reqData);
    
      console.log (data1);
    // console.log(text);

    // const myarray = text.split("**");
    // console.log(myarray.length);
    
    // myarray.map((item) => {
    //     console.log("Item :- ", item);
    // })

    // const questionBlocks = text.split(/\*\*Question \d+:\*\*/).filter(Boolean);
    // const qaArray = questionBlocks.map(block => {
    //     const [question, answer] = block.split('**Answer:**').map(s => s.trim());
    //     return {
    //         question: question,
    //         answer: answer
    //     };
    // });

    // console.log(myarray);
    // return myarray;
    return "Hello World";
}

function PDFReader() {
  console.log("hello");
    const pdf_path = "./Models/abc.pdf";

    // const option = { from: 0, to: 10 };
   
    // pdfUtil.pdfToText(pdf_path, option, function(err, data) {
    //   if (err) throw err;
    //   // console.log(data); 
    //   console.log("Calling run 1");
         
    //   run(data);
    // });
   
    pdfUtil.pdfToText(pdf_path, function(err, data) {
      if (err) throw err;
      // console.log(data);  
      console.log("Calling run 2");  
      run(data);
      
      // questionGeneration (data1);
    });

    
  }

  function questionGeneration (data){
    skillBasedQuestion(data);
    projectBasedQuestion (data);
  }


module.exports = PDFReader;
