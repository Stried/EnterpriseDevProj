import React, { useState } from 'react';
import './MarkdownEditor.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownEditor = ({ value, onChange, onContentChange }) => {
  const [markdown, setMarkdown] = useState(value);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setMarkdown(inputValue);
    onChange && onChange(inputValue);
    onContentChange && onContentChange(inputValue);
  };

  return (
    <div className="markdown-editor">
      <div className="card input-card">
        <textarea
          id="markdownInput"
          value={markdown}
          onChange={handleInputChange}
          placeholder="Type your Markdown here..."
        />
      </div>
      <div className="card output-card">
        <div className="markdown-preview">
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose">
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;