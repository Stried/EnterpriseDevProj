// MarkdownEditor.js

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';


const MarkdownEditor = ({ onContentChange }) => {
  const [markdown, setMarkdown] = useState('');

  const handleInputChange = (e) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);
    onContentChange(newMarkdown);
    console.log(newMarkdown);
  };

  return (
    <div className="markdown-editor">
      <div className="input-pane">
        <textarea
          value={markdown}
          onChange={handleInputChange}
          placeholder="Type your Markdown here..."
        />
      </div>
      <div className="preview-pane">
        
	
      <ReactMarkdown className="prose">{markdown}</ReactMarkdown>
      
      </div>
    </div>
  );
};

export default MarkdownEditor;