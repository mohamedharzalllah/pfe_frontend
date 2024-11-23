import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react'; // Import the Editor component



interface CodeEditorProps {
  id: string; // Problem ID passed as a prop
}

const CodeEditor: React.FC<CodeEditorProps> = ({ id }) => {
  const [code, setCode] = useState(''); // Store the user's code
  const [language, setLanguage] = useState('python'); // Default to Python
  const [output, setOutput] = useState<boolean[]>([]); // Store the result/output
  



  // Fetch test cases based on the problem ID when the component mounts
 
  // Handle language change from the dropdown
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  // Handle code change in the Monaco editor
  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '');
  };

  // Function to send the code and test cases to the backend for execution
  const runCode = async () => {
    const supportedLanguages = ['python', 'java']; // Supported languages
    if (!supportedLanguages.includes(language)) {
        alert(`Currently, only ${supportedLanguages.join(' and ')} are supported for execution.`);
        return;
    }

    const requestBody = {
        id,   // Send the problem ID
        code, // Send the user's code
    };

    const endpoint = `http://localhost:3000/execution/${language}`; // Dynamically set endpoint based on language

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody), // Send the data as JSON
        });
        console.log(JSON.stringify(requestBody));

        const results = await response.json();
        console.log(results);

        results.forEach((result: any) => {
            console.log(result.success);
            setOutput((prevList) => [...prevList, result.success]);
        });

    } catch (error) {
        console.error('Error:', error);
    }
};


  return (
    <div className="container my-4">
      {/* Language Selection Dropdown */}
      <div className="mb-3">
        <label htmlFor="language" className="form-label">Select Language:</label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="form-select"
        >
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </div>

      {/* Monaco Editor */}
      <div className="mb-3">
        <Editor
          height="500px" // Editor height
          language={language} // Set the language dynamically
          value={code} // The code typed by the user
          theme="vs-dark" // Use the VS Code dark theme
          onChange={handleCodeChange} // Update code state on change
        />
      </div>

      {/* Button to Execute the Code */}
      <div className="mb-3">
        <button onClick={runCode} className="btn btn-primary">Run Code</button>
      </div>

      {/* Display the result or error */}
      <div className="output-section mt-4">
        <h3>Output:</h3>
        <ul className="list-group">
          {output.map((result, index) => (
            <li
              key={index}
              className={`list-group-item ${result ? 'list-group-item-success' : 'list-group-item-danger'}`}
            >
              {result ? 'Success' : 'Failure'}
            </li>
          ))}
        </ul>
      </div>
    </div>
);

};

export default CodeEditor;
