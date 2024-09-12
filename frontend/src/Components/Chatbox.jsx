import { useState } from "react";
import Chat from "./Chat";
import InputBox from "./InputBox";

export default function ChatBox(){
    const [questionList, setQuestions] = useState([
        "Tell me about yourself",
        "Which projects have you done during your internship?",
        "What skills did you learn?",
        "What are your future goals?"
      ]);
    
    const [currentQuestion, setCurrentQuestion] = useState(questionList[0]);
    const [responses, setResponses] = useState([]); // To store user responses
    
    const handleResponse = (userResponse) => {
        setResponses([...responses, { question: currentQuestion, response: userResponse }]);
        
        // Move to the next question
        const nextIndex = questionList.indexOf(currentQuestion) + 1;
        if (nextIndex < questionList.length) {
            setCurrentQuestion(questionList[nextIndex]);
        } else {
            setCurrentQuestion("Thank you for completing the chat!");
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
                <Chat que={currentQuestion} responses={responses} />
                <InputBox onSendResponse={handleResponse} />
            </div>
        </div>
    );
}
