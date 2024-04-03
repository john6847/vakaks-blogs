import { registerCodeHighlighting } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React from "react";

function CodeHighlightPlugin() {
  const [editor] = useLexicalComposerContext();
  React.useEffect(() => {
    return registerCodeHighlighting(editor);
  }, [editor]);
  return null;
}

export default React.memo(CodeHighlightPlugin);