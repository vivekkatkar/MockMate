import React, { useState, useEffect } from 'react';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + transcriptPart);
          } else {
            interimTranscript += transcriptPart;
          }
        }
      };

      recognition.onstart = () => {
        console.log('Speech recognition started');
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };

      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }

      return () => {
        recognition.stop();
      };
    } else {
      console.error('Speech recognition not supported in this browser');
    }
  }, [isListening]);

  return (
    <div>
      <textarea value={transcript} readOnly rows={10} cols={50} />
      <button onClick={() => setIsListening((prev) => !prev)}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
    </div>
  );
};

export default SpeechToTextExample;
