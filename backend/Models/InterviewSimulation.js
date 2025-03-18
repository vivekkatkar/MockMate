const WebSocket = require("ws");
const wss = new WebSocket.Server({port : 8000});
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { route } = require("./ResumeParser.js");
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" }); 


const {addFeedback, finalizeFeedback} = require("../Database/index.js")

const cleanResponse = (response) => {
    const jsonStart = response.indexOf('{');
    const jsonEnd = response.lastIndexOf('}');
    return  response.substring(jsonStart, jsonEnd + 1);
};

async function nextQuestion(question , answer){
   let cnt = 0;
//    while(cnt < 5){
    console.log("Hello +++++ " , cnt);
    try{
        const prompt = `Question : ${question} 
        Answer provided by user : ${answer} 
        For a technical interview, if the answer given for the question seems appropriate then provide me with a question based on the same topic with increased difficulty and with maximum words 30-40, else return a NULL value. Make sure the response is in strict JSON format so that it can be parsed without errors.
        the format if the answer seems accurate:
        {
            "question" : "text"
        }
        else give in the format below:
        {
            "question" : ""
        }`
        
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        text = cleanResponse(text);

        console.log ("Res by Gemini :- " , text);

        const parsedData = JSON.parse(text);
        if (parsedData.hasOwnProperty('question')) {
            console.log("vivek")
            console.log(parsedData['question']);
            if(parsedData['question'] == ""){
                return null;
            }

            return parsedData['question'];
        }
        
        return null;
    }catch(err){
        console.log("Error while parsing : " , err);
        return null;
        cnt++;
    }
//    }
   return null;
}

function getSecId(queIdx, currSec, secIds, cnt){
    
    console.log(queIdx + " " + currSec + " " + secIds.length + " " + cnt);
   if(cnt >= 3){
        console.log("hey");
        if(secIds[currSec] < queIdx){
            cnt = 0 ;
            currSec++;
            // return {queIdx, currSec};
        }else{
            cnt = 0;
            currSec = currSec+1;
            queIdx = secIds[currSec];
            // return {queIdx, currSec};
        }   
   }

    var obj = {
        qi : queIdx,
        cs : currSec,
        c : cnt
    };
    return obj; 
}

async function Interview(queList, secIds, reportId){
    console.log("Interview Started");
    
    wss.on("connection", (ws) => {
        console.log("User connected through websocket");
        let queIdx = 0;
        let currSec =  0;
        let cnt = 0;

        if(queIdx < queList.length){
            ws.send(JSON.stringify({ question: queList[queIdx] }));
        }

        ws.on("message", async (message) => {
            console.log("user response : " , message.toString());
            addFeedback(reportId, queList[queIdx] + message.toString());

            const nextQue = await nextQuestion(queList[queIdx], message.toString());
            
            var obj = getSecId(queIdx, currSec, secIds, cnt);
            queIdx = obj.qi;
            currSec = obj.cs;
            cnt = obj.c;

            if(nextQue == null){
                queIdx++;
            }else{
                queList[queIdx] = nextQue;
            }

            if(queIdx < queList.length){
                cnt++;
                ws.send(JSON.stringify({ question: queList[queIdx] }));
            }else{
                ws.send("Interview completed");
                ws.close();
            }
        });

        ws.on("close", async () => {
            await finalizeFeedback(reportId);
            console.log("Websocket connection closed");
        });

    });
}

module.exports = {Interview};