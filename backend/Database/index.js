const { PrismaClient } = require("@prisma/client");


const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prisma = new PrismaClient();

async function InsertResume(username, data) {
  await prisma.user.update({
    where: {
      email: username,
    },
    data: {
      parsedResume: data,
    },
  });

  console.log("User resume data updated");
}

async function getResumeData(username) {
  const res = await prisma.user.findFirst({
    select: {
      parsedResume: true,
    },
    where: {
      email: username,
    },
  });

  return res;
}

async function SignUp(data) {
  console.log(data);
  try {
    const res = await prisma.user.create({
      data : {
        email : data.email,
        name : data.name,
        interviewCount : 0,
        password : data.password,
        mobile : data.mobile
      }
    });

    return "User created";
  } catch (err) {
    console.log(err);
    return "Error";
  }
}

async function Login(data) {
  try{
    const res = await prisma.user.findFirstOrThrow({
      where : {
        email : data.email,
        password : data.password
      }
    });

    return "User found";
  }catch(err){
    return "User Not Found";
  }
}

async function getUser(data) {
  try{
    const res = await prisma.user.findFirst({
      where : {
          email : data.email
      },
      select : {
        name : true,
        email : true,
        interviewCount : true,
        reportIds : true
      }
    });

    let final = []

    if(res == null){
      return "User Not Found";
    }else{
      const reportId = res.reportIds;
      
      const reports = await Promise.all(
        reportId.map(async (reId) => {
          const result = await prisma.report.findFirst({
            where: {
              id: reId
            },
            select: {
              totalQ: true,
              QAnswered: true,
              accuracy: true,
              feedback: true,
              finalReport: true
            }
          });
      
          return result;  
        })
      );
      
      final.push(res.email)
      final.push(res.name)
      final.push(res.interviewCount)
      final.push(reports)
    }

    return final;
  }catch(err){
    console.log(err);
    return null;
  }
}

async function addReport(username){ // add new empty row to report table, push id of that table into user table  and then return id of new row 
  const newRow = await prisma.report.create({
    data : {}
  });

  const reId = newRow.id;
  const updatedUser = await prisma.user.update({
    where :   {
      email : username
    }, 
    data : {
      reportIds : { push : [reId] }
    }
  });

  return reId;
}

async function addFeedback(reId, ans){
  console.log(reId, ans);
  
  const res = await prisma.report.update({
    where : {id : reId},
    data : {
      accuracy : { push : [0]},
      feedback : {push : [ans]}
    }
  });
}

async function finalizeFeedback(reId) {
  const res = await prisma.report.findUnique({
    where: { id: reId },
    select: {
      feedback: true,
    },
  });

    const concatenatedFeedback = res.feedback ? res.feedback.join(' ') : '';
    
    const prompt = `
  User Feedback: ${concatenatedFeedback}

  Please provide feedback on the above responses. response should be simple string without any extra characters (do not include any * or other symbols) and length of response should be 50 words only
  Additionally, suggest areas for improvement that could enhance the user experience and performance make sure that the .

  
`;


    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log (text);

    const res1 = await prisma.report.update({
      where : {
        id : reId
      },
      data : {
        finalReport : text
      }
    });
}

module.exports = {
  InsertResume,
  getResumeData,
  SignUp, 
  Login,
  getUser, 
  addReport,
  addFeedback,
  finalizeFeedback
};
