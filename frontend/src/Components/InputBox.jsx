import { useState } from "react";

export default function InputBox({ onSendResponse }) {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSend = () => {
        if (inputValue.trim()) {
            onSendResponse(inputValue);
            setInputValue(""); // Clear the input after sending
        }
    };

    return (
        <div className="mt-4 flex">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your response..."
                className="border border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
            <button 
                onClick={handleSend} 
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
            >
                Send
            </button>
        </div>
    );
}
