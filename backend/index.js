const PDFReader = require('./Models/GetQuestions.js');
const express = require('express')
const app = express()
require('dotenv').config();

app.get("/getQuestions", async (req, res) => {
    const ans = await PDFReader();
    // const data = JSON.parse(ans);
    // console.log(data);
    res.json({
       "message " : ans
    });
})



// 

app.listen( process.env.PORT, ()=> {
    console.log("App is running at port : " , process.env.PORT);
})