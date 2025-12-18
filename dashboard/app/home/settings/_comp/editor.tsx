"use client";

import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

const RichTextEditor = () => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  const toggleLink = () => {
    const url = prompt("Enter URL");
    if (url)
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
  };

  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden mb-6 flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 p-2 flex flex-wrap gap-1">
        <button
          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <span className="material-icons-outlined">format_bold</span>
        </button>
        <button
          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <span className="material-icons-outlined">format_italic</span>
        </button>
        <button
          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <span className="material-icons-outlined">format_underlined</span>
        </button>
        <button
          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <span className="material-icons-outlined">format_list_bulleted</span>
        </button>
        <button
          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <span className="material-icons-outlined">format_list_numbered</span>
        </button>
        <button
          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          onClick={toggleLink}
        >
          <span className="material-icons-outlined">link</span>
        </button>
      </div>

      {/* Editable area */}
      <div className="bg-white dark:bg-gray-900 p-4 min-h-[250px] max-h-[400px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
