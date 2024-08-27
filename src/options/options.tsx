import React from 'react';
import { createRoot } from 'react-dom/client';
import './options.css'

// My React component
const Test = () => <img src="icon.png" />

// A root container
const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

// A root and render my component
const root = createRoot(rootElement);
root.render(<Test />);
