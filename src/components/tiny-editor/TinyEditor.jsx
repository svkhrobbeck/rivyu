import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";

export default function TinyEditor({
  value,
  onChange,
  isDefaultChanged = false,
  setIsDefaultChanged = undefined,
}) {
  const [initVal, setInitVal] = useState(value);

  useEffect(() => {
    if (isDefaultChanged) {
      setInitVal(value);
      setIsDefaultChanged && setIsDefaultChanged(false);
    }
  }, [isDefaultChanged]);

  return (
    <>
      <Editor
        initialValue={initVal}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "a11ychecker",
            "advlist",
            "advcode",
            "advtable",
            "autolink",
            "checklist",
            "export",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "powerpaste",
            "fullscreen",
            "formatpainter",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
            "textcolor",
            "uploadimage",
          ],
          toolbar:
            "undo redo | casechange blocks | bold italic backcolor forecolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
          content_style:
            "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; direction: ltr; }",
        }}
      />
    </>
  );
}
