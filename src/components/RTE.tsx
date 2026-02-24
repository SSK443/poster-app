

import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

interface RTEProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  control: Control<T>;
}

export default function RTE<T extends FieldValues>({
  name,
  label,
  control,
}: RTEProps<T>) {
  return (
    <div className="w-full flex flex-col gap-3">
      {label && (
        <label className="text-sm font-medium text-gray-900 dark:text-gray-200">
          {label}
        </label>
      )}

      <div
        className="
          rounded-2xl
          border border-gray-200 dark:border-slate-800
          bg-gray-50 dark:bg-slate-950
          shadow-sm
          focus-within:ring-2
          focus-within:ring-blue-600 dark:focus-within:ring-blue-500
          transition-all duration-200
          overflow-hidden
        "
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Editor
            apiKey="minsn0aoub3lyjsv9lzga6bs0qko4cny8vuckpgxb2u30uup"
              value={(field.value ?? "") as string}
              // initialValue="text"
              onEditorChange={field.onChange}
              init={{
                height: 500,
                menubar: true,
                branding: false,

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
                  "quickbars",
                ],

                toolbar:
                  "undo redo | bold italic underline | " +
                  "alignleft aligncenter alignright | " +
                  "bullist numlist | link image | code fullscreen",

                toolbar_mode: "sliding",

                skin: "oxide",
                content_css: "default",


              }}
            />
          )}
        />
      </div>

      <p className="text-xs text-gray-500 dark:text-slate-400">
        Use the toolbar to format your content.
      </p>
    </div>
  );
}