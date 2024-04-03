"use client";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";
import React from 'react';

function TreeViewPlugin() {
  const [editor] = useLexicalComposerContext();
  
  const handleClicked = () => {
    console.log(editor.getRootElement());

  }

  return (
    <div className='my-8'>
      <TreeView
        treeTypeButtonClassName=''
        viewClassName="tree-view-output"
        timeTravelPanelClassName="debug-timetravel-panel"
        timeTravelButtonClassName="debug-timetravel-button"
        timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
        timeTravelPanelButtonClassName="debug-timetravel-panel-button"
        editor={editor}
      />
      <button onClick={handleClicked}>
        Show Element in Console
      </button>
      
    </div>
  );
}

export default React.memo(TreeViewPlugin);
