import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

interface RTEProps {
  name:string
  label?: string;
  control: any;
  defaultValue?: string;
 
}

function RTE({name,label,control,defaultValue=""}:RTEProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            value={value}
            initialValue={defaultValue}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,

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
                "help",
                "wordcount",
                "emoticons",
                "codesample",
                "pagebreak",
                "quickbars",
              ],

              toolbar:
                "undo redo | blocks fontfamily fontsize | " +
                "bold italic underline strikethrough | forecolor backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | " +
                "link image media table | " +
                "emoticons codesample | " +
                "removeformat | fullscreen preview code help",

              toolbar_mode: "sliding",

              quickbars_selection_toolbar:
                "bold italic | quicklink h2 h3 blockquote",

              quickbars_insert_toolbar: "quickimage quicktable",

              contextmenu: "link image table",

              branding: false,

              images_upload_url: "/upload", // optional
              automatic_uploads: true,

              file_picker_types: "image media",
              image_title: true,

              content_style: `
      body {
        font-family: Inter, system-ui, sans-serif;
        font-size: 16px;
      }
    `,
            }}
          />
        )}
      />
    </div>
  );
}

export default RTE
