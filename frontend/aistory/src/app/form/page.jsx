"use client"; // Add this line at the top of the file

import { useState } from 'react';

export default function Form() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Text:', text);
    console.log('File:', file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">Text:</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="file">Upload File:</label>
        <input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
  
