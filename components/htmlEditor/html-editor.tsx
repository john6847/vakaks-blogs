"use client"
import React from 'react';
import JoditEditor from 'jodit-react';
import sanitizeHtml from 'sanitize-html';

type HtmlEditorProps = {
  placeholder?: string;
  [key: string]: any;
}
const HtmlEditor = ({ placeholder, ...props }: HtmlEditorProps) => {
	const editor = React.useRef(null);
	const [content, setContent] = React.useState<any>('');

  React.useEffect(() => {
    if (props.defaultValue) {
      setContent(props.defaultValue);
    }
  }, [props.defaultValue]);

  const config = React.useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || 'Start typings...',
    }
  }, [placeholder]);

	return (
      <JoditEditor
        className='bg-background'
        {...props}
        ref={editor}
        value={content}
        config={config}
        onBlur={newContent => setContent(newContent)} 
      />
	);
};

export default React.memo(HtmlEditor);