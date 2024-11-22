/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const CodeEditor = forwardRef(({ content, onChange }, ref) => {
  return (
    <div className="p-4 text-sm">
      <div>
        <Editor
          apiKey="j32j82szrveom95zxgyc9s1qie1ejm67r96gbvcj8itwmd6d"
          onInit={(evt, editor) => (ref.current = editor)}
          initialValue={content}
          init={{
            height: 400,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "codesample code",
              "emoticons",
            ],
            codesample_languages: [
              { text: "HTML/XML", value: "markup" },
              { text: "JavaScript", value: "javascript" },
              { text: "CSS", value: "css" },
              { text: "PHP", value: "php" },
            ],
            toolbar:
              "undo redo|emoticons|image| codesample code | fullscreen  | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          value={content} // Bind to content
          onEditorChange={(newContent) => onChange(newContent)} // Trigger onChange
        />
      </div>
    </div>
  );
});
export default CodeEditor;
