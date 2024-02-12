import {React, useEffect} from 'react';
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import './TextEditor.css'; 

const TextEditor = ({ initialContent, onUpdateContent }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onUpdateContent(editor.getHTML()); // Update the content in the parent component
    },
  });
  useEffect(() => {
    if (editor) {
      editor.commands.insertContent('<h1>Example Text</h1>');
    }
  }, [editor]);
  return (
    <div className="text-editor-container">
      {editor && (
        <>


          <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
            <select>
            <option value="bruh">open</option>
            <option value="bruh1">open</option>
            <option value="bruh2">open</option>
            </select>
          <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
              H1
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              Strike
            </button>

            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              Bullet
            </button>

          </BubbleMenu>



          <div className="tiptap-editor">
            <EditorContent editor={editor} />
          </div>
        </>
      )}
    </div>
  );
};

export default TextEditor;