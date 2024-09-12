export default function Chat({ que, responses }) {
    return (
        <div className="space-y-4">
            {responses.map((item, index) => (
                <div key={index} className="p-3 rounded bg-gray-100">
                    <p className="text-gray-600 font-semibold">Q: {item.question}</p>
                    <p className="text-gray-800">A: {item.response}</p>
                </div>
            ))}
            <p className="text-gray-600 font-semibold">Q: {que}</p>
        </div>
    );
}
