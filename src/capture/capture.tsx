import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const CapturePage: React.FC = () => {
  const [capturedContent, setCapturedContent] = useState<string | null>(null);

  useEffect(() => {
    // Captured content from local storage
    chrome.storage.local.get('capturedContent', (data) => {
      setCapturedContent(data.capturedContent || 'No content captured');
    });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Captured Content</h1>
      <div
        id="content"
        style={{
          backgroundColor: '#f5f5f5',
          padding: '25px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginBottom: '20px',
        }}
        dangerouslySetInnerHTML={{ __html: capturedContent || '' }}
      />
      <h2>Captured HTML Code</h2>
      <pre
        id="code"
        style={{
          backgroundColor: '#272822',
          color: '#f8f8f2',
          padding: '15px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          overflowX: 'auto',
        }}
      >
        {capturedContent}
      </pre>
    </div>
  );
};

// 
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<CapturePage />);
}
