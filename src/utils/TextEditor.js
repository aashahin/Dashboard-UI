import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

export default ({ content, setContent }) => {
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      toolbarAdaptive: false,
      toolbarButtonSize: "large",
      buttons:
        "bold,italic,underline,|,ul,ol,|,outdent,indent,|,image,table,link,|,align,undo,redo,hr,eraser,|,source,|,cut,copy,paste,|,print,about,|,brush,fontsize,paragraph,|,strikethrough,subscript,superscript",
      placeholder: "Start typings...",
    }),
    []
  );
  return (
    <JoditEditor
      ref={editor}
      value={localStorage.getItem("content") || content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)}
      onChange={(newContent) => {
        localStorage.setItem("content", newContent);
        setContent(newContent);
      }}
    />
  );
};
