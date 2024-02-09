// EditorToggle.jsx
import React, { useState } from 'react';
import CKEditorWrapper from './CKEditorWrapper';
import MarkdownEditor from './MarkDownEditor';

const EditorToggle = () => {
  const [editorType, setEditorType] = useState('markdown');
  const [content, setContent] = useState('');

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="markdown"
          checked={editorType === 'markdown'}
          onChange={() => setEditorType('markdown')}
        />
        Markdown
      </label>
      <label>
        <input
          type="radio"
          value="ckeditor"
          checked={editorType === 'ckeditor'}
          onChange={() => setEditorType('ckeditor')}
        />
        CKEditor
      </label>

      {editorType === 'markdown' && (
        <MarkdownEditor value={content} onChange={handleEditorChange} />
      )}

      {editorType === 'ckeditor' && (
        <CKEditorWrapper initialValue={content} onChange={handleEditorChange} />
      )}
    </div>
  );
};

export default EditorToggle;
