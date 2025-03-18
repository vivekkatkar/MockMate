import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import botImage from "../assets/bot.jpeg";
import Timer from "./Timer.jsx";
import Stop from "./Stop.jsx";

const InterviewSession = () => {
    const navigate = useNavigate();
    
    // State Management
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState("");
    const [isInterviewComplete, setInterviewComplete] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [socket, setSocket] = useState(null);
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [inputMode, setInputMode] = useState("text");
    const [quoteText, setQuoteText] = useState("");
    const [type, setType] = useState("text");
    const [language, setLanguage] = useState("cpp");

    const motivationalQuotes = [
        "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The only way to do great work is to love what you do.",
        "Don't wait for opportunity. Create it.",
        "Doubt kills more dreams than failure ever will.",
    ];

    // Set a random motivational quote on component mount
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        setQuoteText(motivationalQuotes[randomIndex]);
    }, []);

    // Fetch questions & establish WebSocket connection
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/gemini/questions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: localStorage.getItem("email") }),
                });

                if (!response.ok) throw new Error("Failed to fetch questions");

                const ws = new WebSocket("ws://localhost:8000");
                setSocket(ws);

                ws.onopen = () => console.log("WebSocket connected.");
                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.question) {
                        setQuestion(data.question);
                        setIsTimerRunning(true);
                    } else if (data.message) {
                        console.log(data.message);
                        setInterviewComplete(true);
                        setIsTimerRunning(false);
                    }
                };
                ws.onclose = () => console.log("WebSocket closed.");

                return () => ws.close();
            } catch (error) {
                console.error("Error:", error);
                alert("Backend is not working");
                navigate("/");
            }
        };

        fetchData();
    }, [navigate]);

    // Speech Recognition
    useEffect(() => {
        if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            console.error("Speech recognition not supported in this browser");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            let interimTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptPart = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setTranscript((prev) => prev + transcriptPart);
                    setAnswer((prev) => prev + transcriptPart);
                } else {
                    interimTranscript += transcriptPart;
                }
            }
        };

        recognition.onstart = () => console.log("Speech recognition started");
        recognition.onerror = (event) => console.error("Speech recognition error:", event.error);
        recognition.onend = () => setIsListening(false);

        if (isListening) recognition.start();
        else recognition.stop();

        return () => recognition.stop();
    }, [isListening]);

    // Handle answer submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ answer }));
            setAnswer("");
        } else {
            console.error("WebSocket is not open.");
        }
    };

    // Toggle between text and speech input
    const toggleInputMode = () => {
        setInputMode((prevMode) => (prevMode === "text" ? "audio" : "text"));
        setAnswer("");
    };

    // Handle interview stop
    const handleStop = () => {
        if (socket) {
            socket.close();
            console.log("WebSocket closed.");
            navigate("/dashboard");
        } else {
            console.error("No WebSocket connection to close.");
        }
    };

    return (
        <div className="SessionComp h-[100vh] flex flex-col items-center justify-center p-4">
            <div className="bg-gray-100 h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold mb-6 text-white">MockMate</h1>

                <Timer initialSeconds={60} isRunning={isTimerRunning} />
                <Stop StopInterview={handleStop} />

                {!isInterviewComplete ? (
                    question ? (
                        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md relative">
                            <img src={botImage} alt="Bot" className="bot-icon" />
                            <p className="text-lg mb-4 text-dark-gray">
                                <strong>Bot:</strong> {question}
                            </p>

                            <div className="flex justify-center items-center gap-2">
                                <span role="img" aria-label="text">📝</span>
                                <input type="checkbox" onChange={toggleInputMode} className="toggle" defaultChecked />
                                <span role="img" aria-label="audio">🎤</span>
                            </div>

                            {/* Input Section */}
                            {inputMode === "text" ? (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <button type="button" onClick={() => setType(type === "text" ? "code" : "text")}>
                                        {type === "text" ? "Switch to Code" : "Switch to Text"}
                                    </button>

                                    {type === "text" ? (
                                        <textarea
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            placeholder="Type your answer"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    ) : (
                                        <div className="editor-container">
                                            <select className="bg-gray-800 text-white p-1 rounded" onChange={(e) => setLanguage(e.target.value)} value={language}>
                                                <option value="cpp">C++</option>
                                                <option value="javascript">JavaScript</option>
                                                <option value="python">Python</option>
                                                <option value="java">Java</option>
                                                <option value="go">Go</option>
                                            </select>
                                            <div>
                                            <Editor
                                                height="200px"
                                                language={language}
                                                value={answer}
                                                onChange={(value) => setAnswer(value || "")}
                                                theme="vs-dark"
                                            />
                                            </div>
                                        </div>
                                    )}

                                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
                                        Submit Answer
                                    </button>
                                </form>
                            ) : (
                                <button onClick={() => setIsListening(!isListening)} className="w-full bg-blue-500 text-white py-2 rounded-lg">
                                    {isListening ? "Stop Listening" : "Start Listening"}
                                </button>
                            )}
                        </div>
                    ) : <p className="text-lg font-semibold animate-pulse">{quoteText}</p>
                ) : <p className="text-green-500 text-xl font-semibold">Interview Complete!</p>}
            </div>
        </div>
    );
};

export default InterviewSession;
