import { useEffect, useRef } from 'react';

const AceEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.15.2/ace.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const ace = window.ace;
      const editor = ace.edit(editorRef.current);
      editor.setValue(value);
      editor.session.on('change', () => {
        const newValue = editor.getValue();
        if (newValue !== value) {
          onChange(newValue);
        }
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [editorRef, value, onChange]);

  return (
    <div ref={editorRef} style={{ height: '500px', width: '100%' }} />
  );
};

export default AceEditor;
