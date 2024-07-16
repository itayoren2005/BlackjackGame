import React, { useState } from 'react';

const App: React.FC = () => {
  const [sentence, setSentence] = useState<string>('');

  const sendSentence = async () => {
    const response = await fetch('http://localhost:3000/process-sentence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sentence }),
    });

    const data = await response.json();
    alert(`Processed Sentence: ${data.processedSentence}`);
  };

  return (
    <div>
      <input 
        type='text' 
        placeholder='Enter sentence' 
        value={sentence} 
        onChange={(e) => setSentence(e.target.value)} 
      />
      <button onClick={sendSentence}>Send</button>
    </div>
  );
}

export default App;
